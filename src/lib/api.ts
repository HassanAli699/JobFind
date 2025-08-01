// Frontend-only job aggregation - direct API calls
import type { Job, JobSearchResult, JobStats, Category, Source } from "@shared/schema";
import { fetchWithProxy, fetchRSSWithProxy } from "./cors-proxies";

/**
 * Frontend Job Aggregator - Direct API Integration
 * 
 * Calls external job APIs directly from the browser without backend
 * Features:
 * - Real-time job fetching from 5 APIs
 * - Client-side deduplication and filtering
 * - No data persistence - always fresh results
 * - No pagination delays - loads all jobs at once
 */

interface JobSource {
  name: string;
  fetchJobs(): Promise<Job[]>;
}

// Utility to safely parse dates
function safeParseDate(dateInput: any): Date {
  const currentDate = new Date();
  
  if (!dateInput) return currentDate;
  
  try {
    let testDate: Date;
    
    if (typeof dateInput === 'number') {
      if (dateInput >= 1600000000 && dateInput <= 9999999999) {
        testDate = new Date(dateInput * 1000);
      } else if (dateInput >= 1600000000000 && dateInput <= 9999999999999) {
        testDate = new Date(dateInput);
      } else {
        return currentDate;
      }
    } else if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
      const num = parseInt(dateInput);
      if (num >= 1600000000 && num <= 9999999999) {
        testDate = new Date(num * 1000);
      } else if (num >= 1600000000000 && num <= 9999999999999) {
        testDate = new Date(num);
      } else {
        return currentDate;
      }
    } else {
      testDate = new Date(dateInput);
    }
    
    if (isNaN(testDate.getTime())) {
      return currentDate;
    }
    
    const year = testDate.getFullYear();
    if (year < 2020 || year > 2030) {
      return currentDate;
    }
    
    return testDate;
  } catch (error) {
    return currentDate;
  }
}

// Job categorization logic
function categorizeJob(title: string, description: string = ""): string {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.match(/\b(react|vue|angular|javascript|typescript|frontend|ui|ux|design|figma|sketch)\b/)) {
    return "Frontend Development";
  }
  if (text.match(/\b(node|express|django|flask|backend|api|server|database|sql)\b/)) {
    return "Backend Development";
  }
  if (text.match(/\b(fullstack|full.stack|full.stack)\b/)) {
    return "Full Stack Development";
  }
  if (text.match(/\b(mobile|ios|android|react.native|flutter|swift|kotlin)\b/)) {
    return "Mobile Development";
  }
  if (text.match(/\b(devops|aws|docker|kubernetes|ci\/cd|deployment|infrastructure)\b/)) {
    return "DevOps";
  }
  if (text.match(/\b(data|analytics|scientist|machine.learning|ai|python|r\b)\b/)) {
    return "Data Science";
  }
  if (text.match(/\b(marketing|seo|content|social.media|campaign|growth)\b/)) {
    return "Marketing";
  }
  if (text.match(/\b(sales|account|business|customer|support|success)\b/)) {
    return "Sales & Support";
  }
  if (text.match(/\b(design|graphic|creative|brand|visual|illustration)\b/)) {
    return "Design";
  }
  if (text.match(/\b(hr|human.resources|recruiting|talent|people)\b/)) {
    return "Human Resources";
  }
  if (text.match(/\b(finance|accounting|financial|analyst|controller)\b/)) {
    return "Finance";
  }
  if (text.match(/\b(product|manager|management|strategy|planning)\b/)) {
    return "Product Management";
  }
  if (text.match(/\b(qa|quality|testing|test|automation)\b/)) {
    return "Quality Assurance";
  }
  
  return "Other";
}

// Experience level detection
function determineExperienceLevel(title: string, description: string = ""): string {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.match(/\b(junior|entry|associate|trainee|graduate|intern|starter|beginner|1-2 years)\b/)) {
    return "Junior";
  }
  if (text.match(/\b(senior|lead|principal|architect|expert|head|director|vp|chief|10\+ years|8\+ years|5\+ years)\b/)) {
    return "Senior";
  }
  
  return "Mid";
}

// RemoteOK Source
class RemoteOKSource implements JobSource {
  name = "RemoteOK";

  async fetchJobs(): Promise<Job[]> {
    try {
      console.log("Fetching jobs from RemoteOK...");
      
      // Use fetchWithProxy for RemoteOK API
      const response = await fetchWithProxy("https://remoteok.io/api");
      
      if (!response.ok) {
        throw new Error(`RemoteOK API failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Skip metadata if present
      const jobs = data.length > 0 && data[0]?.legal ? data.slice(1) : data;
      
      return jobs.map((item: any) => ({
        id: `remoteok_${item.id || Date.now()}_${Math.random()}`,
        title: item.position || "No Title",
        company: item.company || "Unknown Company",
        description: item.description || "No description available",
        salary: item.salary_max ? `$${item.salary_min || 0}-$${item.salary_max}` : null,
        location: item.location || "Remote",
        isRemote: true,
        experienceLevel: determineExperienceLevel(item.position || "", item.description || ""),
        category: categorizeJob(item.position || "", item.description || ""),
        tags: Array.isArray(item.tags) ? item.tags : [],
        source: this.name,
        sourceUrl: item.url || item.apply_url || "#",
        companyLogo: item.company_logo || null,
        postedAt: safeParseDate(item.date).toISOString(),
        applicantCount: 0,
        featured: false
      }));
    } catch (error) {
      console.error("RemoteOK fetch error:", error);
      console.log("Attempting direct fetch for RemoteOK...");
      
      // Try without CORS proxy as a fallback
      try {
        const directResponse = await fetch("https://remoteok.io/api");
        if (directResponse.ok) {
          const directData = await directResponse.json();
          
          // Skip metadata if present
          const jobs = directData.length > 0 && directData[0]?.legal ? directData.slice(1) : directData;
          console.log(`✅ Successfully fetched ${jobs.length} jobs from RemoteOK directly`);
          
          return jobs.map((item: any) => ({
            id: `remoteok_${item.id || Date.now()}_${Math.random()}`,
            title: item.position || "No Title",
            company: item.company || "Unknown Company",
            description: item.description || "No description available",
            salary: item.salary_max ? `$${item.salary_min || 0}-$${item.salary_max}` : null,
            location: item.location || "Remote",
            isRemote: true,
            experienceLevel: determineExperienceLevel(item.position || "", item.description || ""),
            category: categorizeJob(item.position || "", item.description || ""),
            tags: Array.isArray(item.tags) ? item.tags : [],
            source: this.name,
            sourceUrl: item.url || item.apply_url || "#",
            companyLogo: item.company_logo || null,
            postedAt: safeParseDate(item.date).toISOString(),
            applicantCount: 0,
            featured: false
          }));
        }
      } catch (directError) {
        console.error("Direct RemoteOK fetch also failed:", directError);
      }
      
      return [];
    }
  }
}

// Remotive Source
class RemotiveSource implements JobSource {
  name = "Remotive";

  async fetchJobs(): Promise<Job[]> {
    try {
      console.log("Fetching jobs from Remotive...");
      
      // Use CORS proxy for frontend-only deployment
      const response = await fetchWithProxy("https://remotive.com/api/remote-jobs?limit=1000");
      
      if (!response.ok) {
        throw new Error(`Remotive API failed: ${response.status}`);
      }
      
      const data = await response.json();
      const jobs = data.jobs || [];
      
      return jobs.map((item: any) => ({
        id: `remotive_${item.id || Date.now()}_${Math.random()}`,
        title: item.title || "No Title",
        company: item.company_name || "Unknown Company",
        description: item.description || "No description available",
        salary: item.salary || null,
        location: item.candidate_required_location || "Remote",
        isRemote: true,
        experienceLevel: determineExperienceLevel(item.title || "", item.description || ""),
        category: categorizeJob(item.title || "", item.description || ""),
        tags: Array.isArray(item.tags) ? item.tags.map((tag: any) => tag.name) : [],
        source: this.name,
        sourceUrl: item.url || "#",
        companyLogo: item.company_logo_url || null,
        postedAt: safeParseDate(item.publication_date).toISOString(),
        applicantCount: 0,
        featured: false
      }));
    } catch (error) {
      console.error("Remotive fetch error:", error);
      console.log("Attempting direct fetch for Remotive...");
      
      // Try without CORS proxy as a fallback
      try {
        const directResponse = await fetch("https://remotive.com/api/remote-jobs?limit=1000");
        if (directResponse.ok) {
          const directData = await directResponse.json();
          const jobs = directData.jobs || [];
          console.log(`✅ Successfully fetched ${jobs.length} jobs from Remotive directly`);
          
          return jobs.map((item: any) => ({
            id: `remotive_${item.id || Date.now()}_${Math.random()}`,
            title: item.title || "No Title",
            company: item.company_name || "Unknown Company",
            description: item.description || "No description available",
            salary: item.salary || null,
            location: item.candidate_required_location || "Remote",
            isRemote: true,
            experienceLevel: determineExperienceLevel(item.title || "", item.description || ""),
            category: categorizeJob(item.title || "", item.description || ""),
            tags: Array.isArray(item.tags) ? item.tags.map((tag: any) => tag.name) : [],
            source: this.name,
            sourceUrl: item.url || "#",
            companyLogo: item.company_logo_url || null,
            postedAt: safeParseDate(item.publication_date).toISOString(),
            applicantCount: 0,
            featured: false
          }));
        }
      } catch (directError) {
        console.error("Direct Remotive fetch also failed:", directError);
      }
      
      return [];
    }
  }
}

// We Work Remotely Source (Using alternative JSON endpoint)
class WeWorkRemotelySource implements JobSource {
  name = "We Work Remotely";

  async fetchJobs(): Promise<Job[]> {
    try {
      console.log("Fetching jobs from We Work Remotely...");
      
      // Use CORS proxy for RSS feed
      const rssContent = await fetchRSSWithProxy("https://weworkremotely.com/remote-jobs.rss");
      
      // Parse RSS XML content
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssContent, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      
      const jobs = Array.from(items).map((item, index) => {
        const title = item.querySelector("title")?.textContent || "No Title";
        const description = item.querySelector("description")?.textContent || "No description available";
        const link = item.querySelector("link")?.textContent || "#";
        const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();
        
        // Extract company from title (usually format: "Job Title at Company Name")
        const titleParts = title.split(" at ");
        const jobTitle = titleParts[0] || title;
        const company = titleParts[1] || "We Work Remotely";
        
        return {
          id: `weworkremotely_${Date.now()}_${index}`,
          title: jobTitle,
          company: company,
          description: description.replace(/<[^>]*>/g, ''), // Strip HTML tags
          salary: null,
          location: "Remote",
          isRemote: true,
          experienceLevel: determineExperienceLevel(jobTitle, description),
          category: categorizeJob(jobTitle, description),
          tags: [],
          source: this.name,
          sourceUrl: link,
          companyLogo: null,
          postedAt: safeParseDate(pubDate).toISOString(),
          applicantCount: 0,
          featured: false
        };
      });
      
      console.log(`✅ Successfully fetched ${jobs.length} jobs from We Work Remotely`);
      return jobs;
    } catch (error) {
      console.error("We Work Remotely fetch error:", error);
      return [];
    }
  }
}

// Jobicy Source (Using different endpoint that works with CORS)
class JobicySource implements JobSource {
  name = "Jobicy";

  async fetchJobs(): Promise<Job[]> {
    try {
      console.log("Fetching jobs from Jobicy...");
      
      // Use CORS proxy for frontend-only deployment
      const response = await fetchWithProxy("https://jobicy.com/api/v2/remote-jobs");
      
      if (!response.ok) {
        throw new Error(`Jobicy API failed: ${response.status}`);
      }
      
      const data = await response.json();
      const jobs = data.jobs || [];
      
      console.log(`✅ Successfully fetched ${jobs.length} jobs from Jobicy`);
      
      return jobs.map((item: any) => ({
        id: `jobicy_${item.id || Date.now()}_${Math.random()}`,
        title: item.jobTitle || "No Title",
        company: item.companyName || "Unknown Company",
        description: item.jobExcerpt || item.jobDescription || "No description available",
        salary: null,
        location: item.jobGeo || "Remote",
        isRemote: true,
        experienceLevel: determineExperienceLevel(item.jobTitle || "", item.jobExcerpt || ""),
        category: categorizeJob(item.jobTitle || "", item.jobExcerpt || ""),
        tags: [],
        source: this.name,
        sourceUrl: item.url || "#",
        companyLogo: null,
        postedAt: safeParseDate(item.pubDate).toISOString(),
        applicantCount: 0,
        featured: false
      }));
    } catch (error) {
      console.error("Jobicy fetch error:", error);
      return [];
    }
  }
}

// Main Job Aggregator
export class FrontendJobAggregator {
  private sources: JobSource[] = [
    new RemoteOKSource(),
    new RemotiveSource(),
    new WeWorkRemotelySource(),
    new JobicySource()
  ];

  /**
   * Generates sample jobs for demonstration when APIs are not accessible
   */
  private generateSampleJobs(): Job[] {
    const sampleJobs: Job[] = [
      {
        id: "sample_1",
        title: "Senior Frontend Developer",
        company: "TechCorp",
        description: "We are looking for a Senior Frontend Developer to join our team. You'll work with React, TypeScript, and modern web technologies to build amazing user experiences.",
        salary: "$120,000-$150,000",
        location: "Remote, US",
        isRemote: true,
        experienceLevel: "Senior",
        category: "Frontend Development",
        tags: ["React", "TypeScript", "JavaScript", "CSS"],
        source: "Sample Data",
        sourceUrl: "#",
        companyLogo: null,
        postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        applicantCount: 45,
        featured: true
      },
      {
        id: "sample_2",
        title: "Full Stack Engineer",
        company: "StartupXYZ",
        description: "Join our fast-growing startup as a Full Stack Engineer. Work with Node.js, React, and cloud technologies.",
        salary: "$100,000-$130,000",
        location: "Remote, Worldwide",
        isRemote: true,
        experienceLevel: "Mid",
        category: "Full Stack Development",
        tags: ["Node.js", "React", "AWS", "MongoDB"],
        source: "Sample Data",
        sourceUrl: "#",
        companyLogo: null,
        postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        applicantCount: 23,
        featured: false
      },
      {
        id: "sample_3",
        title: "DevOps Engineer",
        company: "CloudTech",
        description: "We need a DevOps Engineer to help scale our infrastructure. Experience with Kubernetes, Docker, and CI/CD required.",
        salary: "$110,000-$140,000",
        location: "Remote, EU",
        isRemote: true,
        experienceLevel: "Senior",
        category: "DevOps",
        tags: ["Kubernetes", "Docker", "AWS", "Terraform"],
        source: "Sample Data",
        sourceUrl: "#",
        companyLogo: null,
        postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        applicantCount: 67,
        featured: false
      },
      {
        id: "sample_4",
        title: "UX/UI Designer",
        company: "DesignStudio",
        description: "Creative UX/UI Designer needed to design beautiful and functional user interfaces for web and mobile applications.",
        salary: "$90,000-$120,000",
        location: "Remote, US/Canada",
        isRemote: true,
        experienceLevel: "Mid",
        category: "Design",
        tags: ["Figma", "Sketch", "User Research", "Prototyping"],
        source: "Sample Data",
        sourceUrl: "#",
        companyLogo: null,
        postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        applicantCount: 34,
        featured: true
      },
      {
        id: "sample_5",
        title: "Marketing Manager",
        company: "GrowthCo",
        description: "Remote Marketing Manager to lead our digital marketing efforts. Experience with SEO, content marketing, and analytics required.",
        salary: "$80,000-$100,000",
        location: "Remote, Global",
        isRemote: true,
        experienceLevel: "Mid",
        category: "Marketing",
        tags: ["SEO", "Content Marketing", "Analytics", "Social Media"],
        source: "Sample Data",
        sourceUrl: "#",
        companyLogo: null,
        postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        applicantCount: 19,
        featured: false
      }
    ];
    
    return sampleJobs;
  }

  /**
   * Fetches jobs from all sources and deduplicates them
   * @param onJobsUpdate Optional callback to receive progressive job updates
   */
  async fetchAllJobs(onJobsUpdate?: (jobs: Job[]) => void): Promise<Job[]> {
    console.log("🚀 Fetching jobs from all APIs...");
    
    let allJobs: Job[] = [];
    
    // Fetch from all sources progressively
    const jobPromises = this.sources.map(async (source) => {
      try {
        const jobs = await source.fetchJobs();
        
        // Add new jobs to the collection
        allJobs = [...allJobs, ...jobs];
        
        // Deduplicate and update progressively
        const deduplicatedJobs = this.deduplicateJobs(allJobs);
        
        // Notify caller with updated jobs if callback provided
        if (onJobsUpdate) {
          onJobsUpdate(deduplicatedJobs);
        }
        
        return jobs;
      } catch (error) {
        console.error(`Failed to fetch from ${source.name}:`, error);
        return [];
      }
    });
    
    // Wait for all APIs to complete
    const jobArrays = await Promise.all(jobPromises);
    const finalAllJobs = jobArrays.flat();
    
    console.log(`📥 Fetched ${finalAllJobs.length} total jobs from all sources`);
    
    // If no jobs were fetched from APIs (due to CORS or other issues), use sample data
    let finalJobs = finalAllJobs;
    if (finalAllJobs.length === 0) {
      console.log("⚠️ No jobs fetched from APIs, using sample data for demonstration");
      finalJobs = this.generateSampleJobs();
    }
    
    // Final deduplicate
    const deduplicatedJobs = this.deduplicateJobs(finalJobs);
    
    console.log(`✅ Successfully loaded ${deduplicatedJobs.length} unique jobs`);
    
    return deduplicatedJobs;
  }

  /**
   * Removes duplicate jobs based on URL, title, and company
   */
  private deduplicateJobs(jobs: Job[]): Job[] {
    const seen = new Set<string>();
    
    return jobs.filter(job => {
      const key = `${job.sourceUrl}|${job.title.toLowerCase()}|${job.company.toLowerCase()}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Filters jobs based on search parameters
   */
  filterJobs(jobs: Job[], params: {
    query?: string;
    categories?: string[];
    experienceLevels?: string[];
    salaryRanges?: string[];
    sources?: string[];
  }): Job[] {
    let filteredJobs = [...jobs];

    // Text search
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredJobs = filteredJobs.filter(job => {
        const searchText = `${job.title} ${job.company} ${job.description} ${job.tags.join(' ')} ${job.location}`.toLowerCase();
        return query.split(' ').every(term => searchText.includes(term));
      });
    }

    // Category filter
    if (params.categories?.length) {
      filteredJobs = filteredJobs.filter(job => params.categories!.includes(job.category));
    }

    // Experience level filter
    if (params.experienceLevels?.length) {
      filteredJobs = filteredJobs.filter(job => params.experienceLevels!.includes(job.experienceLevel || ""));
    }

    // Source filter
    if (params.sources?.length) {
      filteredJobs = filteredJobs.filter(job => params.sources!.includes(job.source));
    }

    // Salary filter (basic implementation)
    if (params.salaryRanges?.length) {
      filteredJobs = filteredJobs.filter(job => {
        if (!job.salary) return false;
        // This is a simplified salary filter - could be enhanced
        return params.salaryRanges!.some(range => {
          const salary = job.salary || "";
          if (range === "$50k-$100k" && (salary.includes("50") || salary.includes("75") || salary.includes("80"))) return true;
          if (range === "$100k-$150k" && (salary.includes("100") || salary.includes("120") || salary.includes("130"))) return true;
          return false;
        });
      });
    }

    return filteredJobs;
  }

  /**
   * Sorts jobs by specified criteria
   */
  sortJobs(jobs: Job[], sortBy: string): Job[] {
    const sorted = [...jobs];
    
    switch (sortBy) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
      case 'company':
        return sorted.sort((a, b) => a.company.localeCompare(b.company));
      case 'salary':
        return sorted.sort((a, b) => {
          // Basic salary sorting - could be enhanced
          if (!a.salary && !b.salary) return 0;
          if (!a.salary) return 1;
          if (!b.salary) return -1;
          return b.salary.localeCompare(a.salary);
        });
      default:
        return sorted;
    }
  }

  /**
   * Paginates jobs array
   */
  paginateJobs(jobs: Job[], page: number, limit: number): Job[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return jobs.slice(start, end);
  }

  /**
   * Generates job statistics
   */
  getJobStats(jobs: Job[]): JobStats {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const newThisWeek = jobs.filter(job => {
      const postedDate = new Date(job.postedAt);
      return postedDate >= oneWeekAgo;
    }).length;

    return {
      total: jobs.length,
      remote: jobs.length, // All jobs are remote
      newThisWeek
    };
  }

  /**
   * Generates categories with job counts
   */
  getCategories(jobs: Job[]): Category[] {
    const categoryMap = new Map<string, number>();
    
    jobs.forEach(job => {
      const count = categoryMap.get(job.category) || 0;
      categoryMap.set(job.category, count + 1);
    });

    return Array.from(categoryMap.entries())
      .map(([name, count], index) => ({
        id: `category_${index}`,
        name,
        count
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Generates source information with job counts
   */
  getSources(jobs: Job[]): Source[] {
    const sourceMap = new Map<string, number>();
    
    jobs.forEach(job => {
      const count = sourceMap.get(job.source) || 0;
      sourceMap.set(job.source, count + 1);
    });

    return Array.from(sourceMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }
}

// Export the global aggregator instance
export const jobAggregator = new FrontendJobAggregator();

// Export search function for React Query with caching and progressive loading support
export async function searchJobs(
  params: {
    query?: string;
    categories?: string[];
    experienceLevels?: string[];
    salaryRanges?: string[];
    sources?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
  },
  onProgressiveUpdate?: (jobs: Job[]) => void,
  forceRefresh = false
): Promise<JobSearchResult> {
  const { jobCache } = await import('./jobCache');
  
  // Get cached jobs or load fresh ones only if cache is empty or force refresh
  const allJobs = await (async () => {
    if (forceRefresh || !jobCache.loaded) {
      // Load jobs with progressive updates only when actually fetching from APIs
      return jobCache.loadJobsFromAPIs((progressiveJobs) => {
        if (onProgressiveUpdate) {
          // Apply filters to progressive jobs
          const filteredProgressive = jobAggregator.filterJobs(progressiveJobs, params);
          
          // Apply sorting
          const sortedProgressive = jobAggregator.sortJobs(filteredProgressive, params.sortBy || 'recent');
          
          // Apply pagination
          const page = params.page || 1;
          const limit = params.limit || 20;
          const paginatedProgressive = jobAggregator.paginateJobs(sortedProgressive, page, limit);
          
          onProgressiveUpdate(paginatedProgressive);
        }
      });
    } else {
      // Use cached jobs - no API calls
      return jobCache.getJobs();
    }
  })();
  
  // Apply filters to final results
  const filteredJobs = jobAggregator.filterJobs(allJobs, params);
  
  // Apply sorting
  const sortedJobs = jobAggregator.sortJobs(filteredJobs, params.sortBy || 'recent');
  
  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 20;
  const paginatedJobs = jobAggregator.paginateJobs(sortedJobs, page, limit);
  
  return {
    jobs: paginatedJobs,
    total: filteredJobs.length
  };
}

// Export stats function with caching
export async function getJobStats(): Promise<JobStats> {
  const { jobCache } = await import('./jobCache');
  const allJobs = await jobCache.getJobs();
  return jobAggregator.getJobStats(allJobs);
}

// Export categories function with caching
export async function getCategories(): Promise<Category[]> {
  const { jobCache } = await import('./jobCache');
  const allJobs = await jobCache.getJobs();
  return jobAggregator.getCategories(allJobs);
}

// Export sources function with caching
export async function getSources(): Promise<Source[]> {
  const { jobCache } = await import('./jobCache');
  const allJobs = await jobCache.getJobs();
  return jobAggregator.getSources(allJobs);
}

// Export refresh function to clear cache and reload
export async function refreshJobs(): Promise<void> {
  const { jobCache } = await import('./jobCache');
  jobCache.clearCache();
}