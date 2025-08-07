import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProgressiveJobs } from "@/hooks/useProgressiveJobs";
import SearchHeader from "@/components/SearchHeader";
import FilterSidebar from "@/components/filter-sidebar";
import JobCard from "@/components/job-card";
import Pagination from "@/components/pagination";
import { JobDetailsPanel } from "@/components/JobDetailsPanel";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Briefcase, List, Grid, Loader2, BookOpen, Target } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { SidebarAd, InContentAd, MobileBannerAd } from "@/components/ads/GoogleAds";
import CompaniesSection from "@/components/CompaniesSection";
import type { Job, JobSearchParams, JobStats, Category } from "@/types/job";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  // Refresh state - must be declared before using in other hooks
  const [forceRefresh, setForceRefresh] = useState(false);

  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    query: "",
    categories: [],
    experienceLevels: [],
    salaryRanges: [],
    sources: [],
    page: 1,
    limit: 20,
    sortBy: "recent",
  });

  // Parse URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const minSalary = urlParams.get('minSalary');
    const maxSalary = urlParams.get('maxSalary');
    
    if (minSalary) {
      // Convert salary parameters to salary ranges that the filter system can understand
      const salaryRanges: string[] = [];
      const min = parseInt(minSalary);
      const max = maxSalary ? parseInt(maxSalary) : null;
      
      // Map to existing salary range categories
      if (min >= 50000 && (!max || max <= 100000)) {
        salaryRanges.push("$50k-$100k");
      }
      if (min >= 100000 && (!max || max <= 150000)) {
        salaryRanges.push("$100k-$150k");
      }
      if (min >= 150000) {
        salaryRanges.push("$150k+");
      }
      
      // If no standard range matches, add a custom filter
      if (salaryRanges.length === 0) {
        if (min < 50000) {
          salaryRanges.push("Under $50k");
        } else {
          salaryRanges.push("$150k+");
        }
      }
      
      setSearchParams((prev: JobSearchParams) => ({
        ...prev,
        salaryRanges
      }));
      
      // Show a toast to indicate salary filter is applied
      toast({
        title: "Salary filter applied",
        description: `Showing jobs with salary $${min.toLocaleString()}${max ? ` - $${max.toLocaleString()}` : '+'}`,
        className: "bg-white border border-blue-200",
      });
    }
  }, [toast]);

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

  // Get all jobs for companies section - using the same hook without search params
  const { jobs: allJobs } = useProgressiveJobs({
    query: "",
    categories: [],
    experienceLevels: [],
    salaryRanges: [],
    sources: [],
    page: 1,
    limit: 1000,
    sortBy: "recent",
  });

  const handleSearch = (query: string) => {
    setSearchParams((prev: JobSearchParams) => ({ ...prev, query, page: 1 }));
  };

  const handleFilterChange = (filters: {
    categories: string[];
    experienceLevels: string[];
    salaryRanges: string[];
    sources: string[];
  }) => {
    setSearchParams((prev: JobSearchParams) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleSortChange = (sortBy: JobSearchParams["sortBy"]) => {
    setSearchParams((prev: JobSearchParams) => ({ ...prev, sortBy, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev: JobSearchParams) => ({ ...prev, page }));
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
      <SearchHeader searchQuery={searchParams.query} onSearchChange={handleSearch} />
      
      {/* Mobile Banner Ad - Only show on mobile */}
      <MobileBannerAd />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <aside className="lg:w-80 space-y-6">
            <FilterSidebar
              categories={categories}
              selectedCategories={searchParams.categories}
              selectedExperienceLevels={searchParams.experienceLevels}
              selectedSalaryRanges={searchParams.salaryRanges}
              selectedSources={searchParams.sources}
              sources={sources}
              jobStats={jobStats}
              onFilterChange={handleFilterChange}
            />
            
            {/* Interview Tips Call-to-Action */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Ace Your Remote Interview
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Expert tips, technical setup guides, and proven strategies to land your dream remote job.
                  </p>
                  <Link href="/interview-tips">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Target className="w-3 h-3 mr-2" />
                      View Interview Guide
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Sidebar Ad - Only show on desktop */}
            <div className="hidden lg:block">
              <SidebarAd />
            </div>
          </aside>
          
          <main className="flex-1">
            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div>
                {/* Back button when filtering by company */}
                {searchParams.query && searchParams.query.startsWith('company:') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchParams(prev => ({
                        ...prev,
                        query: "",
                        page: 1
                      }));
                    }}
                    className="mb-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
                  >
                    ← Back to all jobs
                  </Button>
                )}
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {searchParams.query && searchParams.query.startsWith('company:') 
                    ? `${searchParams.query.substring(8).trim()} Jobs`
                    : searchParams.query 
                      ? `${searchParams.query} Remote Jobs` 
                      : "Remote Jobs"}
                </h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">
                  {searchResult ? (
                    `Showing ${searchResult.total} remote jobs from multiple APIs ${searchParams.query ? `for "${searchParams.query.startsWith('company:') ? searchParams.query.substring(8).trim() : searchParams.query}"` : ''}`
                  ) : (
                    "Loading fresh jobs from multiple APIs..."
                  )}
                </p>
                {/* Active Filters Display */}
                {((searchParams.salaryRanges?.length || 0) > 0 || (searchParams.categories?.length || 0) > 0 || (searchParams.experienceLevels?.length || 0) > 0) && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {(searchParams.salaryRanges?.length || 0) > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-600 font-medium">
                          Salary: {searchParams.salaryRanges?.join(", ")}
                        </span>
                      </div>
                    )}
                    {(searchParams.categories?.length || 0) > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 font-medium">
                          Categories: {searchParams.categories?.join(", ")}
                        </span>
                      </div>
                    )}
                    {(searchParams.experienceLevels?.length || 0) > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-purple-600 font-medium">
                          Experience: {searchParams.experienceLevels?.join(", ")}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchParams((prev: JobSearchParams) => ({ 
                          ...prev, 
                          salaryRanges: [],
                          categories: [],
                          experienceLevels: [],
                          sources: []
                        }));
                        // Update URL to remove all filter parameters
                        window.history.replaceState({}, '', window.location.pathname);
                        toast({
                          title: "All filters cleared",
                          description: "Showing all jobs",
                          className: "bg-white border border-gray-200",
                        });
                      }}
                      className="h-6 px-2 text-xs"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
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
                  {displayJobs.map((job: any, index: number) => (
                    <div key={job.id}>
                      <JobCard
                        job={job}
                        onClick={() => handleJobClick(job)}
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

            {/* Companies Section - Only show when jobs are loaded and not searching */}
            {!isLoading && !isProgressiveLoading && displayJobs.length > 0 && !searchParams.query && allJobs.length > 0 && (
              <CompaniesSection 
                jobs={allJobs} 
                onCompanyClick={(companyName: string) => {
                  setSearchParams(prev => ({
                    ...prev,
                    query: `company:${companyName}`,
                    page: 1
                  }));
                  // Don't auto-scroll to top when filtering by company
                }}
              />
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