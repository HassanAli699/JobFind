import { useState, useEffect } from "react";
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
import { RefreshCw, TrendingUp, Star, DollarSign, Target } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import type { Job, JobSearchParams } from "@/types/job";

export default function RemoteMarketingJobs() {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    query: "marketing",
    categories: ["Marketing", "Digital Marketing", "Growth", "Content Marketing"],
    experienceLevels: [],
    salaryRanges: [],
    sources: [],
    page: 1,
    limit: 20,
    sortBy: "recent",
  });

  // Fetch marketing jobs
  const { 
    data: searchResult, 
    isLoading, 
    error,
    jobs: displayJobs,
    isProgressiveLoading,
    totalJobs,
    refetch
  } = useProgressiveJobs(searchParams);

  const handleSearch = (query: string) => {
    setSearchParams((prev: JobSearchParams) => ({ ...prev, query: `marketing ${query}`, page: 1 }));
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

  const totalPages = Math.ceil((searchResult?.total || 0) / searchParams.limit);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead 
        title="Remote Marketing Jobs 2025 | Digital Marketing Remote Work | JobFind"
        description="Find remote marketing jobs from 1000+ companies. Browse digital marketing, content marketing, growth marketing, and social media remote positions. Apply today to top companies hiring remote marketers."
        keywords="remote marketing jobs, remote digital marketing jobs, remote content marketing jobs, remote social media jobs, work from home marketing, remote growth marketing, remote marketing manager, remote SEO jobs, remote PPC jobs, remote email marketing, telecommute marketing, distributed marketing jobs, remote marketing specialist, home based marketing jobs, virtual marketing positions"
        canonicalUrl="https://jobfind.replit.app/remote-marketing-jobs"
      />
      
      <SearchHeader searchQuery={searchParams.query} onSearchChange={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 sm:p-8 mb-8 border border-purple-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Remote Marketing Jobs
              </h1>
              <p className="text-slate-600 mt-1">
                {searchResult ? `${searchResult.total} remote marketing positions` : 'Loading marketing opportunities...'} from top brands
              </p>
            </div>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-slate-900">Top Skills</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                SEO, Google Ads, Content Strategy, Analytics
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-slate-900">Avg Salary</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                $60k - $120k+ for remote marketers
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-slate-900">Roles</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Digital, Content, Growth, Social Media
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <aside className="lg:w-80 space-y-6">
            <FilterSidebar
              categories={["Marketing", "Digital Marketing", "Growth", "Content Marketing"]}
              selectedCategories={searchParams.categories}
              selectedExperienceLevels={searchParams.experienceLevels}
              selectedSalaryRanges={searchParams.salaryRanges}
              selectedSources={searchParams.sources}
              sources={[]}
              jobStats={undefined}
              onFilterChange={handleFilterChange}
            />

            {/* Marketing Career Tips */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Remote Marketing Career Tips
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Build a portfolio of campaigns</li>
                <li>• Master Google Analytics & Ads</li>
                <li>• Create data-driven case studies</li>
                <li>• Stay updated on digital trends</li>
                <li>• Develop cross-channel expertise</li>
              </ul>
              <Link href="/blog">
                <Button size="sm" className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white">
                  View Marketing Resources
                </Button>
              </Link>
            </div>
          </aside>
          
          <main className="flex-1">
            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Latest Remote Marketing Jobs
                </h2>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">
                  {searchResult ? (
                    `Showing ${searchResult.total} remote marketing positions from top companies`
                  ) : (
                    "Loading fresh marketing jobs from multiple APIs..."
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Select value={searchParams.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="salary">Highest Salary</SelectItem>
                    <SelectItem value="company">Company A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>

            {/* Job Listings */}
            {isLoading && !displayJobs?.length ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-purple-600 mb-4" />
                <p className="text-slate-600">Loading remote marketing jobs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading jobs. Please try again.</p>
                <Button onClick={() => refetch()} className="mt-4">
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {displayJobs?.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={handleJobClick}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={searchParams.page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
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

      <Footer />
    </div>
  );
}