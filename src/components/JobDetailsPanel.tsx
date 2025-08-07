import { X, ExternalLink, MapPin, Clock, DollarSign, Building2, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { JobDetailAd } from "@/components/ads/GoogleAds";
import type { Job } from "@/types/job";

interface JobDetailsPanelProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

// Function to clean text from HTML tags, entities, and escape characters
function cleanText(text: string): string {
  if (!text) return "";
  
  // Remove HTML tags
  let cleaned = text.replace(/<[^>]*>/g, " ");
  
  // Decode common HTML entities and escape characters
  cleaned = cleaned
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#34;/g, '"')
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
    .replace(/&ldquo;/g, '"')
    .replace(/\\n/g, '\n') // Convert escaped newlines to actual newlines
    .replace(/\\r/g, '\n') // Convert escaped carriage returns to newlines
    .replace(/\\t/g, ' ') // Replace \t with space
    .replace(/\\/g, ''); // Remove remaining backslashes
  
  // Clean up extra whitespace but preserve line breaks
  cleaned = cleaned.replace(/[ \t]+/g, " ").replace(/\n[ \t]*/g, "\n").trim();
  
  return cleaned;
}

// Function to clean and format job descriptions for full display
function cleanJobDescription(description: string): string {
  if (!description || description.trim() === '') return "";
  
  // First clean the text of HTML and escape characters
  let cleaned = cleanText(description);
  
  // If still empty after cleaning, return fallback
  if (!cleaned || cleaned.trim() === '') return "";
  
  // Convert line breaks to double line breaks for better paragraph spacing
  cleaned = cleaned
    .replace(/\.\s+/g, '. ') // Ensure single space after periods
    .replace(/\n\s*\n/g, '\n\n') // Normalize paragraph breaks
    .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2') // Add paragraph breaks after sentences when new sentence starts with capital
    .replace(/Requirements?:?\s*/gi, '\n\nRequirements:\n')
    .replace(/Responsibilities?:?\s*/gi, '\n\nResponsibilities:\n')
    .replace(/Benefits?:?\s*/gi, '\n\nBenefits:\n')
    .replace(/Qualifications?:?\s*/gi, '\n\nQualifications:\n')
    .replace(/About\s+(?:us|the\s+company|our\s+company):?\s*/gi, '\n\nAbout the Company:\n')
    .replace(/What\s+we\s+offer:?\s*/gi, '\n\nWhat We Offer:\n');
  
  // Clean up excessive whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
  
  return cleaned;
}

// Function to clean source names
function cleanSourceName(source: string): string {
  if (!source) return "Unknown Source";
  
  // First remove any trailing numbers or characters
  let cleaned = source.replace(/[0-9]+$/, "").replace(/[Oo]$/, "").trim();
  
  // Then apply specific mappings for known sources
  const sourceMap: Record<string, string> = {
    "remotive": "Remotive",
    "remoteok": "RemoteOK", 
    "wwr": "We Work Remotely",
    "jobicy": "Jobicy",
    "remote.co": "Remote.co",
    "remotely": "We Work Remotely"
  };
  
  const lowerCleaned = cleaned.toLowerCase().replace(/[^a-z]/g, '');
  return sourceMap[lowerCleaned] || cleaned;
}

// Function to format relative time
function formatRelativeTime(dateString: string): string {
  if (!dateString) return "Recently posted";
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) return "Less than 1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  } catch (error) {
    return "Recently posted";
  }
}

function JobDetailsContent({ job }: { job: Job }) {
  if (!job) return null;

  const cleanDescription = cleanJobDescription(job.description);
  const cleanSource = cleanSourceName(job.source);
  const relativeTime = formatRelativeTime(job.postedAt);
  
  // Debug log to see if description is being processed (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('==== FULL JOB DESCRIPTION DEBUG ====');
    console.log('Original description length:', job.description?.length);
    console.log('Full original description:', job.description);
    console.log('==== END DEBUG ====');
  }

  return (
    <div className="space-y-6 animate-fade-in bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-16 h-16 rounded-lg object-contain bg-white border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {cleanText(job.title)}
            </h2>
            <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300">
              <Building2 className="w-5 h-5" />
              {cleanText(job.company)}
            </div>
          </div>
        </div>

        {/* Job Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
            {job.remote && <Badge variant="secondary">Remote</Badge>}
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{relativeTime}</span>
          </div>

          {job.salary && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{job.experienceLevel || "All Levels"}</span>
          </div>
        </div>

        {/* Category and Tags */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {job.category}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              via {cleanSource}
            </span>
          </div>
          
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 8).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Job Description
        </h3>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            {/* Show the complete job description without any truncation */}
            <div className="space-y-4 text-base leading-7">
              {/* Use the original description with basic text cleaning only */}
              <div className="whitespace-pre-wrap break-words">
                {job.description ? 
                  job.description
                    .replace(/<[^>]*>/g, " ") // Remove HTML tags
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&#x27;/g, "'")
                    .replace(/&#34;/g, '"')
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
                    .replace(/&ldquo;/g, '"')
                    .replace(/\\n/g, '\n')
                    .replace(/\\r/g, '\n')
                    .replace(/\\t/g, ' ')
                    .replace(/\\/g, '')
                    .replace(/[ \t]+/g, " ")
                    .replace(/\n[ \t]*/g, "\n")
                    .trim()
                  : "No detailed description available for this position."
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Detail Ad - Below description */}
        <JobDetailAd />
        
        {/* Apply Button - Below ad */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mt-8 border border-blue-200 dark:border-blue-700">
          <Button 
            onClick={() => window.open(job.sourceUrl, '_blank')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
            size="lg"
          >
            <ExternalLink className="w-5 h-5 mr-3" />
            Apply for this job
          </Button>
          <p className="text-center text-sm text-slate-600 mt-3">
            Click to apply on the company's website
          </p>
        </div>
      </div>
    </div>
  );
}

export function JobDetailsPanel({ job, isOpen, onClose }: JobDetailsPanelProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="bottom" 
          className="h-[95vh] max-h-[95vh] p-0 rounded-t-2xl border-t-2 border-gray-200 shadow-2xl bg-white dark:bg-gray-800"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <SheetHeader className="p-4 pb-3">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-left text-lg font-semibold">Job Details</SheetTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
          </div>
          <ScrollArea className="h-[calc(95vh-80px)] overflow-y-auto bg-white dark:bg-gray-800">
            <div className="px-4 pb-8 bg-white dark:bg-gray-800">
              {job && <JobDetailsContent job={job} />}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] p-0 overflow-hidden bg-white dark:bg-gray-800">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">Job Details</DialogTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
        </div>
        <ScrollArea className="h-[calc(90vh-100px)] overflow-y-auto bg-white dark:bg-gray-800">
          <div className="px-6 pb-8 bg-white dark:bg-gray-800">
            {job && <JobDetailsContent job={job} />}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}