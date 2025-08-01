import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, Clock, ExternalLink, Users } from "lucide-react";
import type { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
  onClick?: () => void;
  viewMode?: "list" | "grid";
}

export default function JobCard({ job, onClick, viewMode = "list" }: JobCardProps) {
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



  // Clean HTML tags and decode entities for job description display
  const cleanDescription = (description: string) => {
    if (!description) return "No description available";
    
    // Remove HTML tags
    let cleaned = description.replace(/<[^>]*>/g, " ");
    
    // Decode HTML entities
    cleaned = cleaned
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&#8211;/g, "–")
      .replace(/&#8212;/g, "—")
      .replace(/&#8216;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8230;/g, "...")
      .replace(/&hellip;/g, "...")
      .replace(/&mdash;/g, "—")
      .replace(/&ndash;/g, "–")
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"');
    
    // Clean up extra whitespace
    return cleaned.replace(/\s+/g, " ").trim();
  };

  // Clean source name to remove trailing numbers and fix common issues
  const cleanSourceName = (source: any) => {
    if (!source || typeof source !== 'string') return "Unknown Source";
    
    // Remove any trailing characters that might be appended
    let cleanedSource = source.trim();
    
    // Remove trailing single characters like "O", numbers, or special chars
    cleanedSource = cleanedSource.replace(/\s*[A-Z0-9]$/, '');
    
    // Map to clean names
    const sourceMap: Record<string, string> = {
      "RemoteOK": "RemoteOK",
      "Remotive": "Remotive", 
      "We Work Remotely": "We Work Remotely",
      "Jobicy": "Jobicy",
      "Remote.co": "Remote.co"
    };
    
    // Return mapped value or cleaned version
    return sourceMap[cleanedSource] || cleanedSource;
  };

  // Clean HTML tags from text
  const cleanHtmlTags = (text: any) => {
    if (!text || typeof text !== 'string') return String(text || "");
    return text
      .replace(/<[^>]*>/g, " ") // Remove HTML tags
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <Card 
      className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-sm job-card relative cursor-pointer animate-fade-in hover:shadow-md transition-all duration-200 active:scale-[0.98]" 
      onClick={onClick}
      style={{ 
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        backgroundColor: 'white'
      }}
    >
      {job.featured && (
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Featured
          </Badge>
        </div>
      )}
      
      <CardContent className="p-4 sm:p-6 bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
          {/* Company Logo - Only show if exists */}
          {job.companyLogo && (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <img 
                src={job.companyLogo} 
                alt={`${job.company} logo`}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.parentElement!.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className="flex-1">
            {/* Job Header */}
            <div className="flex flex-col mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 hover:text-[#2563EB] cursor-pointer line-clamp-2">
                  {cleanHtmlTags(job.title)}
                </h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-sm">
                  <span className="text-slate-600 font-medium">{job.company}</span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="inline-flex items-center space-x-1 text-[#10B981] font-medium">
                    <Home className="h-3 w-3" />
                    <span>Remote</span>
                  </span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="text-slate-500">{job.location}</span>
                </div>
                {job.salary && (
                  <div className="mt-1">
                    <span className="text-base sm:text-lg font-bold text-slate-900">{job.salary}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {cleanDescription(job.description)}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.slice(0, 4).map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className={getCategoryColor(job.category)}
                >
                  {cleanHtmlTags(tag)}
                </Badge>
              ))}
              {job.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.tags.length - 4} more
                </Badge>
              )}
            </div>

            {/* Job Footer */}
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{getTimeAgo(job.postedAt)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>{cleanSourceName(job.source)}</span>
                </span>
                {job.applicantCount && job.applicantCount > 0 && (
                  <span className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{job.applicantCount} applicants</span>
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
