export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  salary?: string;
  location: string;
  remote: boolean;
  category: string;
  experienceLevel?: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  postedAt: string;
  applicantCount: number;
  featured: boolean;
}

export interface JobCategory {
  id: string;
  name: string;
  count: number;
}

export interface JobSearchParams {
  query?: string;
  categories?: string[];
  experienceLevels?: string[];
  salaryRanges?: string[];
  page: number;
  limit: number;
  sortBy: 'recent' | 'relevant' | 'salary' | 'company';
}

export interface JobStats {
  totalJobs: number;
  remoteJobs: number;
  newJobs: number;
  categories: JobCategory[];
  sources: string[];
  sourceStats: Record<string, number>;
}
