import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchJobs } from '@/lib/api';
import type { Job, JobSearchResult } from '@shared/schema';

interface UseProgressiveJobsParams {
  query?: string;
  categories?: string[];
  experienceLevels?: string[];
  salaryRanges?: string[];
  sources?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
}

export function useProgressiveJobs(params: UseProgressiveJobsParams, forceRefresh = false) {
  const [progressiveJobs, setProgressiveJobs] = useState<Job[]>([]);
  const [isProgressiveLoading, setIsProgressiveLoading] = useState(false);
  const [progressiveCount, setProgressiveCount] = useState(0);

  const queryResult = useQuery<JobSearchResult>({
    queryKey: ["jobSearch", params, forceRefresh],
    queryFn: async () => {
      // Import job cache to check if we need progressive loading
      const { jobCache } = await import('@/lib/jobCache');
      
      // Only show progressive loading if we're actually fetching from APIs
      const needsAPICall = forceRefresh || !jobCache.loaded;
      
      if (needsAPICall) {
        setIsProgressiveLoading(true);
        setProgressiveJobs([]);
        setProgressiveCount(0);
      }

      const result = await searchJobs(params, (jobs) => {
        // Progressive update callback - only when actually loading from APIs
        if (needsAPICall) {
          setProgressiveJobs(jobs);
          setProgressiveCount(jobs.length);
        }
      }, forceRefresh);

      setIsProgressiveLoading(false);
      return result;
    },
    staleTime: forceRefresh ? 0 : Infinity, // Cache indefinitely unless force refresh
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  // Use progressive jobs while loading, final jobs when complete
  const displayJobs = isProgressiveLoading && progressiveJobs.length > 0 
    ? progressiveJobs 
    : queryResult.data?.jobs || [];

  return {
    ...queryResult,
    jobs: displayJobs,
    progressiveJobs,
    isProgressiveLoading,
    progressiveCount,
    totalJobs: queryResult.data?.total || 0,
  };
}