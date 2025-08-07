import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Filter, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { JobDetailsPanel } from "@/components/JobDetailsPanel";
import JobCard from "@/components/job-card";
import type { Job, SearchJobsParams, JobSearchResult } from "@shared/schema";

export default function Category() {
  const { category } = useParams();
  const [, setLocation] = useLocation();
  const [categoryName, setCategoryName] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedJobs, setAccumulatedJobs] = useState<Job[]>([]);
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

  useEffect(() => {
    if (category) {
      // Convert URL slug to readable category name with special mappings
      const categoryMappings: Record<string, string> = {
        'devops': 'DevOps',
        'frontend-development': 'Frontend Development',
        'backend-development': 'Backend Development',
        'full-stack-development': 'Full Stack Development',
        'mobile-development': 'Mobile Development',
        'data-science': 'Data Science',
        'sales-support': 'Sales & Support',
        'human-resources': 'Human Resources',
        'product-management': 'Product Management',
        'quality-assurance': 'Quality Assurance',
        'software-development': 'Frontend Development', // Most jobs are frontend
        'customer-support': 'Sales & Support',
        'engineering': 'Frontend Development', // Map to actual category
        'design': 'Design',
        'marketing': 'Marketing'
      };
      
      const readable = categoryMappings[category] || category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setCategoryName(readable);
      
      // Reset accumulated jobs when category changes
      setAccumulatedJobs([]);
      setCurrentPage(1);
      
      // Update search params to filter by this category
      setSearchParams(prev => ({
        ...prev,
        categories: [readable],
        page: 1
      }));
    }
  }, [category]);

  // Update search params when currentPage changes (for load more)
  useEffect(() => {
    if (categoryName && currentPage > 1) {
      setSearchParams(prev => ({
        ...prev,
        page: currentPage
      }));
    }
  }, [currentPage, categoryName]);

  // Fetch filtered jobs for this category
  const { data: searchResult, isLoading } = useQuery<JobSearchResult>({
    queryKey: ["searchJobs", searchParams],
    queryFn: async () => {
      const { searchJobs } = await import("@/lib/api");
      return searchJobs(searchParams);
    },
    staleTime: Infinity, // Cache indefinitely unless refresh
  });

  const currentPageJobs = searchResult?.jobs || [];
  const totalJobs = searchResult?.total || 0;

  // Accumulate jobs from all loaded pages
  useEffect(() => {
    if (currentPageJobs.length > 0) {
      if (currentPage === 1) {
        // First page - replace all jobs
        setAccumulatedJobs(currentPageJobs);
      } else {
        // Additional pages - append new jobs
        setAccumulatedJobs(prev => {
          const existingIds = new Set(prev.map(job => job.id));
          const newJobs = currentPageJobs.filter(job => !existingIds.has(job.id));
          return [...prev, ...newJobs];
        });
      }
    }
  }, [currentPageJobs, currentPage]);

  const categoryJobs = accumulatedJobs;

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleRelatedCategoryClick = (categorySlug: string) => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset state and update current category
    setAccumulatedJobs([]);
    setCurrentPage(1);
    
    // Update the URL and trigger category change
    setTimeout(() => {
      setLocation(`/category/${categorySlug}`);
    }, 100);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  // Mock additional category data (would come from API in real app)
  const mockCategoryJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechFlow Inc",
      location: "Remote (Global)",
      salary: "$120k - $180k",
      type: "Full-time",
      postedAt: "2 days ago",
      description: "Join our team building next-generation web applications using React, TypeScript, and modern development practices."
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Digital Solutions Co",
      location: "Remote (US/EU)",
      salary: "$90k - $140k",
      type: "Full-time",
      postedAt: "1 week ago",
      description: "We're looking for a passionate frontend engineer to help build beautiful, responsive user interfaces."
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote (Americas)",
      salary: "$100k - $160k",
      type: "Full-time",
      postedAt: "3 days ago",
      description: "Join our growing startup as a full stack developer working with React, Node.js, and cloud technologies."
    }
  ];

  const displayTotalJobs = totalJobs > 0 ? totalJobs : categoryJobs.length;
  
  const categoryStats = {
    totalJobs: displayTotalJobs,
    newThisWeek: Math.floor(displayTotalJobs * 0.07), // Estimate 7% are new this week
    avgSalary: "$125k",
    topCompanies: ["Google", "Microsoft", "Stripe", "Shopify"]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Meta Tags */}
      <title>{categoryName} Remote Jobs | JobFind</title>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 mr-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Jobs
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{categoryName} Remote Jobs</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover {categoryStats.totalJobs.toLocaleString()}+ remote {categoryName.toLowerCase()} 
              opportunities from top companies worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Category Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {categoryStats.totalJobs.toLocaleString()}
              </div>
              <div className="text-slate-600">Total Jobs</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categoryStats.newThisWeek}
              </div>
              <div className="text-slate-600">New This Week</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {categoryStats.avgSalary}
              </div>
              <div className="text-slate-600">Average Salary</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {categoryStats.topCompanies.length}+
              </div>
              <div className="text-slate-600">Top Companies</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Description */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About {categoryName} Remote Jobs</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            {categoryName} is one of the most in-demand remote job categories, offering excellent opportunities 
            for professionals looking to work from anywhere. These roles typically involve building and maintaining 
            digital products, requiring strong technical skills and the ability to collaborate effectively in 
            distributed teams.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Common Skills Required:</h3>
              <div className="flex flex-wrap gap-2">
                {(category === 'software-development' || category === 'engineering' || category === 'frontend-development' || category === 'backend-development') && (
                  <>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </>
                )}
                {category === 'marketing' && (
                  <>
                    <Badge variant="secondary">Digital Marketing</Badge>
                    <Badge variant="secondary">SEO</Badge>
                    <Badge variant="secondary">Content Creation</Badge>
                    <Badge variant="secondary">Analytics</Badge>
                    <Badge variant="secondary">Social Media</Badge>
                  </>
                )}
                {category === 'design' && (
                  <>
                    <Badge variant="secondary">UI/UX Design</Badge>
                    <Badge variant="secondary">Figma</Badge>
                    <Badge variant="secondary">Adobe Creative Suite</Badge>
                    <Badge variant="secondary">Prototyping</Badge>
                    <Badge variant="secondary">User Research</Badge>
                  </>
                )}
                {category === 'devops' && (
                  <>
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">Kubernetes</Badge>
                    <Badge variant="secondary">CI/CD</Badge>
                    <Badge variant="secondary">Infrastructure</Badge>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Top Hiring Companies:</h3>
              <div className="space-y-2">
                {categoryStats.topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center text-slate-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Latest {categoryName} Jobs</h2>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600 mt-4">Loading {categoryName.toLowerCase()} jobs...</p>
            </div>
          ) : categoryJobs.length > 0 ? (
            categoryJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => handleJobClick(job)}
                viewMode="list"
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No {categoryName.toLowerCase()} jobs found.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setLocation("/")}
              >
                Browse All Jobs
              </Button>
            </div>
          )}
        </div>

        {/* Load More */}
        {categoryJobs.length > 0 && totalJobs > categoryJobs.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More Jobs"}
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Showing {categoryJobs.length} of {totalJobs.toLocaleString()} {categoryName.toLowerCase()} jobs
            </p>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleRelatedCategoryClick("frontend-development")}
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Frontend Development</h3>
                <p className="text-slate-600 text-sm mb-4">500+ jobs available</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRelatedCategoryClick("frontend-development");
                  }}
                >
                  View Jobs
                </Button>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleRelatedCategoryClick("backend-development")}
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Backend Development</h3>
                <p className="text-slate-600 text-sm mb-4">200+ jobs available</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRelatedCategoryClick("backend-development");
                  }}
                >
                  View Jobs
                </Button>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleRelatedCategoryClick("data-science")}
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Data Science</h3>
                <p className="text-slate-600 text-sm mb-4">100+ jobs available</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRelatedCategoryClick("data-science");
                  }}
                >
                  View Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Job Details Panel */}
      <JobDetailsPanel
        job={selectedJob}
        isOpen={isJobDetailsOpen}
        onClose={() => {
          setIsJobDetailsOpen(false);
          setSelectedJob(null);
        }}
      />
    </div>
  );
}