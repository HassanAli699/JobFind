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
import { RefreshCw, Code, Star, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import type { Job, JobSearchParams } from "@/types/job";

export default function RemoteDeveloperJobs() {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    query: "developer",
    categories: ["Development", "Engineering", "Programming", "Software Development"],
    experienceLevels: [],
    salaryRanges: [],
    sources: [],
    page: 1,
    limit: 20,
    sortBy: "recent",
  });

  // Fetch developer jobs
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
    setSearchParams((prev: JobSearchParams) => ({ ...prev, query: `developer ${query}`, page: 1 }));
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
        title="Remote Developer Jobs 2025 | Software Engineer Remote Work | JobFind"
        description="Find remote developer jobs from 1000+ companies. Browse software engineer, full-stack, frontend, backend, and mobile developer remote positions. Apply today to top tech companies hiring remote developers."
        keywords="remote developer jobs, remote software engineer jobs, remote programming jobs, remote coding jobs, work from home developer, remote full stack developer, remote frontend developer, remote backend developer, remote mobile developer, remote web developer, telecommute programming, distributed development jobs, remote software development, home based programming jobs, virtual developer positions"
        canonicalUrl="https://jobfind.replit.app/remote-developer-jobs"
      />
      
      <SearchHeader searchQuery={searchParams.query} onSearchChange={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8 mb-8 border border-blue-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Remote Developer Jobs
              </h1>
              <p className="text-slate-600 mt-1">
                {searchResult ? `${searchResult.total} remote developer positions` : 'Loading developer opportunities...'} from top tech companies
              </p>
            </div>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-slate-900">Top Skills</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                React, Node.js, Python, JavaScript, TypeScript
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-slate-900">Avg Salary</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                $80k - $150k+ for remote developers
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-slate-900">Growth</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                25% increase in remote dev jobs this year
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <aside className="lg:w-80 space-y-6">
            <FilterSidebar
              categories={["Development", "Engineering", "Programming", "Software Development"]}
              selectedCategories={searchParams.categories}
              selectedExperienceLevels={searchParams.experienceLevels}
              selectedSalaryRanges={searchParams.salaryRanges}
              selectedSources={searchParams.sources}
              sources={[]}
              jobStats={undefined}
              onFilterChange={handleFilterChange}
            />

            {/* Developer Career Tips */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Remote Developer Career Tips
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Build a strong GitHub portfolio</li>
                <li>• Master async communication</li>
                <li>• Contribute to open source projects</li>
                <li>• Learn DevOps and cloud platforms</li>
                <li>• Practice technical interviews</li>
              </ul>
              <Link href="/interview-tips">
                <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white">
                  View Developer Interview Tips
                </Button>
              </Link>
            </div>
          </aside>
          
          <main className="flex-1">
            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Latest Remote Developer Jobs
                </h2>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">
                  {searchResult ? (
                    `Showing ${searchResult.total} remote developer positions from top companies`
                  ) : (
                    "Loading fresh developer jobs from multiple APIs..."
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
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
                <p className="text-slate-600">Loading remote developer jobs...</p>
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