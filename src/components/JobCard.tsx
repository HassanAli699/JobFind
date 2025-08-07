import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ExternalLink, Users, Home, MapPin } from 'lucide-react';

// Job interface for frontend-only
interface Job {
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

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  const getTimeAgo = (date: Date | string) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Engineering": "bg-blue-100 text-blue-800",
      "Design": "bg-purple-100 text-purple-800",
      "Marketing": "bg-green-100 text-green-800",
      "Sales": "bg-orange-100 text-orange-800",
      "Product": "bg-pink-100 text-pink-800",
      "Customer Success": "bg-cyan-100 text-cyan-800",
      "Data": "bg-indigo-100 text-indigo-800",
      "Operations": "bg-yellow-100 text-yellow-800",
      "Finance": "bg-emerald-100 text-emerald-800",
      "HR": "bg-rose-100 text-rose-800",
    };
    return colors[category] || "bg-blue-100 text-blue-800";
  };

  // Clean HTML tags and escape characters from text
  const cleanHtmlTags = (text: string | undefined) => {
    if (!text) return "";
    return text
      .replace(/<[^>]*>/g, " ") // Remove HTML tags
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&#x27;/g, "'") // Replace &#x27; with '
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .replace(/&#34;/g, '"') // Replace &#34; with "
      .replace(/&#8211;/g, "–") // Replace &#8211; with en dash
      .replace(/&#8212;/g, "—") // Replace &#8212; with em dash
      .replace(/&#8216;/g, "'") // Replace &#8216; with left single quote
      .replace(/&#8217;/g, "'") // Replace &#8217; with right single quote
      .replace(/&#8220;/g, '"') // Replace &#8220; with left double quote
      .replace(/&#8221;/g, '"') // Replace &#8221; with right double quote
      .replace(/&#8230;/g, "...") // Replace &#8230; with ellipsis
      .replace(/&hellip;/g, "...") // Replace &hellip; with ellipsis
      .replace(/&mdash;/g, "—") // Replace &mdash; with em dash
      .replace(/&ndash;/g, "–") // Replace &ndash; with en dash
      .replace(/&rsquo;/g, "'") // Replace &rsquo; with right single quote
      .replace(/&lsquo;/g, "'") // Replace &lsquo; with left single quote
      .replace(/&rdquo;/g, '"') // Replace &rdquo; with right double quote
      .replace(/&ldquo;/g, '"') // Replace &ldquo; with left double quote
      .replace(/\\n/g, ' ') // Replace \n with space
      .replace(/\\r/g, ' ') // Replace \r with space
      .replace(/\\t/g, ' ') // Replace \t with space
      .replace(/\\/g, '') // Remove remaining backslashes
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .trim();
  };

  // Clean source name to remove trailing numbers and fix common issues
  const cleanSourceName = (source: string | undefined) => {
    if (!source) return "Unknown Source";
    
    const sourceMap: Record<string, string> = {
      "remoteok": "RemoteOK",
      "remotive": "Remotive", 
      "wwr": "We Work Remotely",
      "jobicy": "Jobicy",
      "remote.co": "Remote.co"
    };
    
    // First remove any trailing numbers or special characters, then normalize
    const cleaned = source.toLowerCase()
      .replace(/[0-9]+$/, '') // Remove trailing numbers
      .replace(/[^a-z]/g, '') // Remove non-alphabetic characters
      .trim();
    
    return sourceMap[cleaned] || source.replace(/[0-9]+$/, '').trim();
  };

  return (
    <Card 
      className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-[0.98] hover:border-blue-300 dark:hover:border-blue-500" 
      onClick={onClick}
      style={{ 
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        backgroundColor: 'white'
      }}
    >
      {job.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Featured
          </Badge>
        </div>
      )}
      
      <CardContent className="p-4 sm:p-6 bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Company Logo */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={`${job.company} logo`}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="text-blue-600 font-bold text-lg">${job.company.charAt(0).toUpperCase()}</span>`;
                  }
                }}
              />
            ) : (
              <span className="text-blue-600 font-bold text-lg">
                {job.company.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 break-words">
                  {cleanHtmlTags(job.title)}
                </h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-sm">
                  <span className="text-slate-600 font-medium">{job.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                  {job.remote && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="flex items-center gap-1 text-blue-600 font-medium">
                        <Home className="h-3 w-3" />
                        Remote
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {job.salary && (
                <div className="mt-2 sm:mt-0 sm:ml-4">
                  <span className="text-base sm:text-lg font-bold text-slate-900">{job.salary}</span>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="text-slate-600 text-sm mb-3">
              <p className="line-clamp-2 break-words mb-1">
                {cleanHtmlTags(job.description) || "No description available"}
              </p>
              {job.description && cleanHtmlTags(job.description).length > 150 && (
                <div className="mt-2">
                  <button 
                    className="text-blue-600 hover:text-blue-700 cursor-pointer text-xs font-medium bg-transparent border-none p-0 underline decoration-dotted underline-offset-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick?.();
                    }}
                  >
                    See more...
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                {job.tags.slice(0, 4).map((tag: string, index: number) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    {tag}
                  </Badge>
                ))}
                {job.tags.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-500">
                    +{job.tags.length - 4} more
                  </Badge>
                )}
              </div>
            )}

            {/* Job Footer */}
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {getTimeAgo(job.postedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  {cleanSourceName(job.source)}
                </span>
                {job.applicantCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {job.applicantCount} applicants
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getCategoryColor(job.category)}`}
                >
                  {job.category}
                </Badge>
                {job.experienceLevel && (
                  <Badge variant="outline" className="text-xs">
                    {job.experienceLevel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}