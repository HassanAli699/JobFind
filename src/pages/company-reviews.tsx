import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Search, Briefcase, ArrowLeft } from 'lucide-react';
import { useProgressiveJobs } from '@/hooks/useProgressiveJobs';
import { Link } from 'wouter';
import SearchHeader from '@/components/SearchHeader';
import Footer from '@/components/footer';
import SEOHead from '@/components/SEOHead';
import type { Job } from '@/types/job';

interface CompanyData {
  name: string;
  logo?: string;
  jobCount: number;
  jobs: Job[];
  categories: string[];
  avgSalary?: string;
  recentJobs: Job[];
}

export default function CompanyReviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyData[]>([]);
  const [searchParams, setSearchParams] = useState({ query: '', categories: [], experienceLevels: [], salaryRanges: [], sources: [], page: 1, limit: 50, sortBy: 'recent' as const });

  const { 
    data: jobs = [], 
    isLoading,
    error 
  } = useProgressiveJobs(searchParams, false);

  // Process jobs to extract company data
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const companyMap = new Map<string, CompanyData>();
    
    jobs.forEach((job: Job) => {
      const companyName = job.company || 'Unknown Company';
      
      if (!companyMap.has(companyName)) {
        companyMap.set(companyName, {
          name: companyName,
          logo: job.companyLogo,
          jobCount: 0,
          jobs: [],
          categories: [],
          recentJobs: []
        });
      }
      
      const company = companyMap.get(companyName)!;
      company.jobCount++;
      company.jobs.push(job);
      
      // Add category if not already present
      if (job.category && !company.categories.includes(job.category)) {
        company.categories.push(job.category);
      }
      
      // Keep track of recent jobs (max 3)
      if (company.recentJobs.length < 3) {
        company.recentJobs.push(job);
      }
    });

    // Convert map to array and sort by job count
    const companiesArray = Array.from(companyMap.values())
      .sort((a, b) => b.jobCount - a.jobCount);
    
    setFilteredCompanies(companiesArray);
  }, [jobs]);

  // Filter companies based on search
  const displayedCompanies = filteredCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCompanySearch = (company: string) => {
    // Navigate to home page with company filter
    window.location.href = `/?company=${encodeURIComponent(company)}`;
  };

  return (
    <>
      <SEOHead 
        title="Companies Hiring Remote Workers | JobFind"
        description="Explore top companies hiring remote workers. Find job opportunities at leading tech companies, startups, and established businesses offering remote positions."
        keywords="remote companies, companies hiring remote, remote work companies, tech companies remote jobs"
      />
      
      <SearchHeader 
        searchQuery={searchParams.query} 
        onSearchChange={(query) => setSearchParams(prev => ({ ...prev, query }))} 
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/">
                  <Button variant="ghost" size="sm" className="mb-4 text-slate-600 hover:text-blue-600">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to JobFind
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Companies Hiring Now</h1>
                <p className="mt-2 text-lg text-gray-600">
                  Discover {filteredCompanies.length}+ companies actively hiring remote workers
                </p>
              </div>
            </div>
            
            {/* Search */}
            <div className="mt-6 max-w-md">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading companies...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading companies. Please try again.</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCompanies.map((company, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {company.logo ? (
                          <img 
                            src={company.logo} 
                            alt={`${company.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.jobCount} open positions</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Categories */}
                    {company.categories.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Hiring for:</p>
                        <div className="flex flex-wrap gap-1">
                          {company.categories.slice(0, 3).map((category, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {company.categories.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{company.categories.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Recent Jobs */}
                    {company.recentJobs.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Recent openings:</p>
                        <div className="space-y-1">
                          {company.recentJobs.slice(0, 2).map((job, idx) => (
                            <p key={idx} className="text-sm text-gray-600 truncate">
                              • {job.title}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      onClick={() => handleCompanySearch(company.name)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      View {company.jobCount} Jobs
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !error && displayedCompanies.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse all companies</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}