import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  jobData?: {
    title: string;
    company: string;
    location: string;
    salary?: string;
    description: string;
    postedAt: string;
  };
}

export default function SEOHead({
  title = "JobFind - #1 Remote Job Board | Find Remote Jobs Online 2025",
  description = "Find remote jobs from 5000+ companies. Browse developer, marketing, sales, design & customer support remote jobs. Apply today to top remote companies hiring now.",
  keywords = "remote jobs, work from home jobs, remote work, online jobs, remote careers, remote job board, telecommute jobs, remote developer jobs, remote marketing jobs, remote design jobs, freelance jobs, digital nomad jobs, remote first companies",
  canonicalUrl = "https://jobfind.replit.app/",
  ogImage = "https://jobfind.replit.app/og-image.jpg",
  jobData
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) ogImageTag.setAttribute('content', ogImage);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);
    
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', ogImage);
    
    // Add JobPosting structured data if job data is provided
    if (jobData) {
      const existingScript = document.querySelector('script[type="application/ld+json"][data-job]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-job', 'true');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": jobData.title,
        "description": jobData.description,
        "datePosted": jobData.postedAt,
        "hiringOrganization": {
          "@type": "Organization",
          "name": jobData.company
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": jobData.location
          }
        },
        "baseSalary": jobData.salary ? {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": jobData.salary
          }
        } : undefined,
        "employmentType": "FULL_TIME",
        "workEnvironment": "Remote"
      });
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, jobData]);
  
  return null;
}