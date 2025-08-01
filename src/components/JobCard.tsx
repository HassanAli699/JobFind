import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Clock, ExternalLink, Users, Home } from 'lucide-react';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onApply: (jobUrl: string) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const timeAgo = (date: string) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-green-100 text-green-800',
      'Sales': 'bg-yellow-100 text-yellow-800',
      'Product': 'bg-pink-100 text-pink-800',
      'Customer Success': 'bg-indigo-100 text-indigo-800',
      'Operations': 'bg-gray-100 text-gray-800',
      'Finance': 'bg-emerald-100 text-emerald-800',
      'HR': 'bg-rose-100 text-rose-800',
      'Legal': 'bg-cyan-100 text-cyan-800',
    };
    return colors[category] || 'bg-blue-100 text-blue-800';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 relative">
        {job.featured && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Featured
            </Badge>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
          {/* Company Logo Placeholder */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
            {job.company.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 hover:text-primary cursor-pointer">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-slate-600 font-medium">{job.company}</span>
                  <span className="text-slate-400">•</span>
                  {job.remote && (
                    <>
                      <span className="inline-flex items-center space-x-1 text-accent font-medium">
                        <Home className="h-3 w-3" />
                        <span className="text-sm">Remote</span>
                      </span>
                      <span className="text-slate-400">•</span>
                    </>
                  )}
                  <span className="text-slate-500 text-sm">{job.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                {job.salary && (
                  <span className="text-lg font-bold text-slate-900">{job.salary}</span>
                )}
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Job Description */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.slice(0, 4).map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className={# thoughts

I need to create a job aggregator platform that combines remote job listings from multiple free APIs into a searchable, categorized interface. The design reference shows a professional job board layout with:

1. Header with search functionality
2. Sidebar with filters (categories, experience, salary)
3. Main content area with job cards
4. Pagination
5. Footer with site information

Key requirements:
- Aggregate jobs from at least 5 free job APIs
- Search functionality across all jobs
- Category filtering and job categorization
- Remote job focus
- Responsive design
- Professional interface matching the design reference

I'll need to:
1. Define the data schema for jobs and categories
2. Create API endpoints to aggregate jobs from multiple sources
3. Implement the frontend with search, filtering, and job display
4. Use the exact color scheme and layout from the design reference

For the job APIs, I'll use free sources like RemoteOK, GitHub Jobs alternatives, and other publicly available remote job APIs.

# useful_guidelines_from_blueprints

No specific blueprints were provided that contain useful guidelines for this task.

# directory_structure

```json
[
    {"path": "shared/schema.ts", "status": "overwritten"},
    {"path": "server/storage.ts", "status": "overwritten"},
    {"path": "server/routes.ts", "status": "overwritten"},
    {"path": "server/services/jobAggregator.ts", "status": "new"},
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/pages/home.tsx", "status": "new"},
    {"path": "client/src/components/job-card.tsx", "status": "new"},
    {"path": "client/src/components/filter-sidebar.tsx", "status": "new"},
    {"path": "client/src/components/search-header.tsx", "status": "new"},
    {"path": "client/src/components/pagination.tsx", "status": "new"},
    {"path": "client/src/lib/api.ts", "status": "new"}
]
