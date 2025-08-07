import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Job, JobSearchParams, JobStats, JobCategory } from '../types/job';
import { apiRequest } from '@/lib/queryClient';

export function useJobs(params: JobSearchParams) {
  return useQuery({
    queryKey: ['/api/jobs', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      if (params.query) searchParams.set('query', params.query);
      if (params.categories?.length) searchParams.set('categories', params.categories.join(','));
      if (params.experienceLevels?.length) searchParams.set('experienceLevels', params.experienceLevels.join(','));
      if (params.salaryRanges?.length) searchParams.set('salaryRanges', params.salaryRanges.join(','));
      searchParams.set('page', params.page.toString());
      searchParams.set('limit', params.limit.toString());
      searchParams.set('sortBy', params.sortBy);

      const response = await fetch(`/api/jobs?${searchParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return response.json() as Promise<{ jobs: Job[], total: number }>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['/api/jobs', id],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch job');
      return response.json() as Promise<Job>;
    },
    enabled: !!id,
  });
}

export function useJobCategories() {
  return useQuery({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json() as Promise<JobCategory[]>;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useJobStats() {
  return useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json() as Promise<JobStats>;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRefreshJobs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/jobs/refresh');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate all job-related queries
      queryClient.invalidateQueries({ queryKey: ['/api/jobs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
}
