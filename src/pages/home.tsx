import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProgressiveJobs } from "@/hooks/useProgressiveJobs";
import SearchHeader from "@/components/search-header";
import FilterSidebar from "@/components/filter-sidebar";
import JobCard from "@/components/job-card";
import Pagination from "@/components/pagination";
import { JobDetailsPanel } from "@/components/JobDetailsPanel";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Briefcase, List, Grid, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarAd, InContentAd, MobileBannerAd } from "@/components/ads/GoogleAds";
import type { Job, Category, SearchJobsParams, JobSearchResult, JobStats } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  // Refresh state - must be declared before using in other hooks
  const [forceRefresh, setForceRefresh] = useState(false);

  const [searchParams, setSearchParams] = useState<SearchJobsParams>({
    query: "",
    categories: [],
    experienceLevels: [],
    salaryRanges: [],
    sources: [],
    page: 1,
    limit: 20,
    sortBy: "recent",
  });

  // Fetch job statistics with caching
  const { data: jobStats } = useQuery<JobStats>({
    queryKey: ["jobStats", forceRefresh],
    queryFn: async () => {
      const { getJobStats } = await import("@/lib/api");
      return getJobStats();
    },
    staleTime: forceRefresh ? 0 : Infinity, // Cache indefinitely unless refresh
  });

  // Fetch categories with caching
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories", forceRefresh],
    queryFn: async () => {
      const { getCategories } = await import("@/lib/api");
      return getCategories();
    },
    staleTime: forceRefresh ? 0 : Infinity, // Cache indefinitely unless refresh
  });

  // Fetch job sources with caching
  const { data: sources = [] } = useQuery<Array<{name: string; count: number}>>({
    queryKey: ["sources", forceRefresh],
    queryFn: async () => {
      const { getSources } = await import("@/lib/api");
      return getSources();
    },
    staleTime: forceRefresh ? 0 : Infinity, // Cache indefinitely unless refresh
  });

  // Search jobs with progressive loading and caching
  const { 
    data: searchResult, 
    isLoading, 
    error,
    jobs: displayJobs,
    isProgressiveLoading,
    progressiveCount,
    totalJobs,
    refetch
  } = useProgressiveJobs(searchParams, forceRefresh);

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({ ...prev, query, page: 1 }));
  };

  const handleFilterChange = (filters: {
    categories: string[];
    experienceLevels: string[];
    salaryRanges: string[];
    sources: string[];
  }) => {
    setSearchParams(prev => ({ ...prev, ...filters, page: 1 }));
  };

  const handleSortChange = (sortBy: SearchJobsParams["sortBy"]) => {
    setSearchParams(prev => ({ ...prev, sortBy, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleCloseJobDetails = () => {
    setIsJobDetailsOpen(false);
    setSelectedJob(null);
  };

  const handleRefresh = async () => {
    try {
      // Clear the job cache and trigger refresh
      const { refreshJobs } = await import("@/lib/api");
      await refreshJobs();
      
      // Set force refresh state to trigger re-fetching
      setForceRefresh(true);
      
      // Invalidate all queries
      await queryClient.invalidateQueries({ queryKey: ["jobStats"] });
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      await queryClient.invalidateQueries({ queryKey: ["sources"] });
      await queryClient.invalidateQueries({ queryKey: ["jobSearch"] });
      
      // Reset force refresh after a short delay
      setTimeout(() => setForceRefresh(false), 1000);
      
      toast({
        title: "Refreshing jobs",
        description: "Fetching fresh job listings from all APIs...",
      });
    } catch (error) {
      console.error("Error refreshing jobs:", error);
      toast({
        title: "Error refreshing jobs",
        description: "There was an issue fetching the latest jobs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const totalPages = Math.ceil((searchResult?.total || 0) / searchParams.limit);

  // Generate dynamic SEO based on search
  const seoTitle = searchParams.query 
    ? `${searchParams.query} Remote Jobs | JobFind - Find Remote Work`
    : "JobFind - #1 Remote Job Board | Find Remote Jobs Online 2025";
  
  const seoDescription = searchParams.query
    ? `Find ${searchParams.query} remote jobs from top companies. Browse ${searchResult?.total || 'thousands of'} remote positions and apply today.`
    : "Find remote jobs from 5000+ companies. Browse developer, marketing, sales, design & customer support remote jobs. Apply today to top remote companies hiring now.";

  const seoKeywords = searchParams.query
    ? `${searchParams.query} remote jobs, ${searchParams.query} work from home, ${searchParams.query} remote work, remote ${searchParams.query} positions`
    : "remote jobs, work from home jobs, remote work, online jobs, remote careers, remote job board, telecommute jobs, remote developer jobs, remote marketing jobs, remote design jobs, freelance jobs, digital nomad jobs, remote first companies";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <SearchHeader onSearch={handleSearch} />
      
      {/* Mobile Banner Ad - Only show on mobile */}
      <MobileBannerAd />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <aside className="lg:w-80 space-y-6">
            <FilterSidebar
              categories={categories}
              jobStats={jobStats}
              sources={sources}
              onFilterChange={handleFilterChange}
            />
            
            {/* Sidebar Ad - Only show on desktop */}
            <div className="hidden lg:block">
              <SidebarAd />
            </div>
          </aside>
          
          <main className="flex-1">
            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {searchParams.query ? `${searchParams.query} Remote Jobs` : "Remote Jobs"}
                </h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">
                  {searchResult ? (
                    `Showing ${searchResult.total} remote jobs from multiple APIs ${searchParams.query ? `for "${searchParams.query}"` : ''}`
                  ) : (
                    "Loading fresh jobs from multiple APIs..."
                  )}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading || isProgressiveLoading}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`h-4 w-4 ${(isLoading || isProgressiveLoading) ? 'animate-spin' : ''}`} />
                  <span>Refresh Jobs</span>
                </Button>


                
                <Select value={searchParams.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="salary">Salary: High to Low</SelectItem>
                    <SelectItem value="company">Company: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-slate-300 rounded-lg w-full sm:w-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setViewMode("list")}
                    className={`flex-1 sm:flex-none rounded-l-lg rounded-r-none px-3 py-2 view-mode-btn ${
                      viewMode === "list" 
                        ? "bg-[#2563EB] text-white" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 sm:flex-none rounded-r-lg rounded-l-none px-3 py-2 view-mode-btn ${
                      viewMode === "grid" 
                        ? "bg-[#2563EB] text-white" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">
                  Error loading jobs. Please try refreshing to fetch fresh jobs from the APIs.
                </p>
              </div>
            )}

            {/* Progressive Loading State */}
            {isProgressiveLoading && displayJobs.length === 0 && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
                <span className="ml-3 text-slate-600">Loading jobs from APIs...</span>
              </div>
            )}

            {/* Progressive Jobs Display */}
            {isProgressiveLoading && displayJobs.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700">
                    Loading more jobs... {progressiveCount} found so far
                  </span>
                </div>
              </div>
            )}

            {/* Jobs List */}
            {displayJobs.length > 0 && (
              <>
                <div className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                    : "space-y-4 mb-6"
                }>
                  {displayJobs.map((job, index) => (
                    <div key={job.id}>
                      <JobCard
                        job={job}
                        onClick={() => handleJobClick(job)}
                        viewMode={viewMode}
                      />
                      
                      {/* In-content ad after every 8th job */}
                      {(index + 1) % 8 === 0 && index < displayJobs.length - 1 && (
                        <InContentAd />
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination - only show when loading is complete */}
                {!isProgressiveLoading && !isLoading && searchResult && Math.ceil((totalJobs || searchResult.total) / searchParams.limit) > 1 && (
                  <Pagination
                    currentPage={searchParams.page}
                    totalPages={Math.ceil((totalJobs || searchResult.total) / searchParams.limit)}
                    totalItems={totalJobs || searchResult.total}
                    itemsPerPage={searchParams.limit}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}

            {/* No Jobs Found */}
            {!isLoading && !isProgressiveLoading && displayJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-sm font-medium text-slate-900">No jobs found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try adjusting your search terms or filters to find more jobs.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Job Details Panel */}
      <JobDetailsPanel
        job={selectedJob}
        isOpen={isJobDetailsOpen}
        onClose={handleCloseJobDetails}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}