import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Users, ChevronRight } from 'lucide-react';

interface Company {
  name: string;
  jobCount: number;
  categories: string[];
  locations: string[];
  logo?: string;
}

interface CompaniesSectionProps {
  jobs: any[];
  onCompanyClick: (companyName: string) => void;
}

export default function CompaniesSection({ jobs, onCompanyClick }: CompaniesSectionProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (jobs.length > 0) {
      const companyMap = new Map<string, {
        jobCount: number;
        categories: Set<string>;
        locations: Set<string>;
      }>();

      // Count jobs per company and collect metadata
      jobs.forEach((job: any) => {
        const companyName = job.company || 'Unknown Company';
        if (companyName === 'Unknown Company') return;
        
        const existing = companyMap.get(companyName) || {
          jobCount: 0,
          categories: new Set<string>(),
          locations: new Set<string>()
        };

        existing.jobCount += 1;
        if (job.category) existing.categories.add(job.category);
        if (job.location) existing.locations.add(job.location);
        
        companyMap.set(companyName, existing);
      });

      // Convert to company objects and filter companies with 2+ jobs
      const companiesList: Company[] = Array.from(companyMap.entries())
        .filter(([, data]) => data.jobCount >= 2)
        .map(([name, data]) => ({
          name,
          jobCount: data.jobCount,
          categories: Array.from(data.categories),
          locations: Array.from(data.locations)
        }))
        .sort((a, b) => b.jobCount - a.jobCount)
        .slice(0, 20); // Show top 20 companies

      setCompanies(companiesList);
    }
  }, [jobs]);

  if (companies.length === 0) return null;

  const displayedCompanies = showAll ? companies : companies.slice(0, 8);

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Companies Hiring Now</h2>
          <p className="text-slate-600 mt-1">
            Discover companies with active remote job openings
          </p>
        </div>
        {companies.length > 8 && (
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="hidden md:inline-flex"
          >
            {showAll ? 'Show Less' : `View All ${companies.length}`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedCompanies.map((company) => (
          <Card 
            key={company.name}
            className="bg-white hover:shadow-md transition-shadow cursor-pointer group border border-slate-200"
            onClick={() => onCompanyClick(company.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
              
              <div className="mb-3">
                <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">
                  {company.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                  <Users className="w-3 h-3" />
                  <span className="font-medium text-blue-600">
                    {company.jobCount} active jobs
                  </span>
                </div>
                {company.locations.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">
                      {company.locations.slice(0, 2).join(', ')}
                      {company.locations.length > 2 && ` +${company.locations.length - 2} more`}
                    </span>
                  </div>
                )}
              </div>

              {company.categories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {company.categories.slice(0, 2).map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary" 
                      className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700"
                    >
                      {category}
                    </Badge>
                  ))}
                  {company.categories.length > 2 && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700"
                    >
                      +{company.categories.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Show All button */}
      {companies.length > 8 && (
        <div className="mt-6 text-center md:hidden">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? 'Show Less' : `View All ${companies.length} Companies`}
          </Button>
        </div>
      )}

      {showAll && companies.length > 8 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            <strong>{companies.length} companies</strong> are actively hiring with <strong>{jobs.length} total jobs</strong> available. 
            Click any company to see their specific job openings.
          </p>
        </div>
      )}
    </div>
  );
}