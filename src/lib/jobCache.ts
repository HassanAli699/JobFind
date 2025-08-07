import type { Job } from '@shared/schema';

/**
 * Simple in-memory job cache to avoid repeated API calls
 */
class JobCache {
  private jobs: Job[] = [];
  private isLoaded = false;
  private isLoading = false;
  private loadPromise: Promise<Job[]> | null = null;

  /**
   * Get cached jobs or load them if not already loaded
   */
  async getJobs(forceRefresh = false): Promise<Job[]> {
    if (forceRefresh) {
      this.clearCache();
    }

    if (this.isLoaded && !forceRefresh) {
      return this.jobs;
    }

    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    this.isLoading = true;
    this.loadPromise = this.loadJobsFromAPIs();
    
    try {
      this.jobs = await this.loadPromise;
      this.isLoaded = true;
      return this.jobs;
    } finally {
      this.isLoading = false;
      this.loadPromise = null;
    }
  }

  /**
   * Load jobs from APIs with progressive callback support
   */
  async loadJobsFromAPIs(onProgressiveUpdate?: (jobs: Job[]) => void): Promise<Job[]> {
    const { jobAggregator } = await import('./api');
    return jobAggregator.fetchAllJobs(onProgressiveUpdate);
  }

  /**
   * Clear the cache
   */
  clearCache() {
    this.jobs = [];
    this.isLoaded = false;
    this.isLoading = false;
    this.loadPromise = null;
  }

  /**
   * Check if jobs are currently being loaded
   */
  get loading() {
    return this.isLoading;
  }

  /**
   * Check if jobs are loaded
   */
  get loaded() {
    return this.isLoaded;
  }
}

export const jobCache = new JobCache();