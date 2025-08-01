import { Briefcase, Github, Twitter, Linkedin } from "lucide-react";
import { FooterAd } from "@/components/ads/GoogleAds";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* Footer Ad */}
      <FooterAd />
      
      <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">JobFind</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Find your perfect remote job from thousands of opportunities across top companies worldwide.
            </p>
          </div>
          
          {/* Job Categories */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/category/software-development" className="text-slate-400 hover:text-white transition-colors">Software Development</a></li>
              <li><a href="/category/marketing" className="text-slate-400 hover:text-white transition-colors">Marketing</a></li>
              <li><a href="/category/design" className="text-slate-400 hover:text-white transition-colors">Design</a></li>
              <li><a href="/category/customer-support" className="text-slate-400 hover:text-white transition-colors">Customer Support</a></li>
              <li><a href="/category/sales" className="text-slate-400 hover:text-white transition-colors">Sales</a></li>
              <li><a href="/category/data-science" className="text-slate-400 hover:text-white transition-colors">Data Science</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/remote-work-guide" className="text-slate-400 hover:text-white transition-colors">Remote Work Guide</a></li>
              <li><a href="/salary-guide" className="text-slate-400 hover:text-white transition-colors">Salary Guide</a></li>
              <li><a href="/interview-tips" className="text-slate-400 hover:text-white transition-colors">Interview Tips</a></li>
              <li><a href="/resume-builder" className="text-slate-400 hover:text-white transition-colors">Resume Builder</a></li>
              <li><a href="/company-reviews" className="text-slate-400 hover:text-white transition-colors">Company Reviews</a></li>
              <li><a href="/blog" className="text-slate-400 hover:text-white transition-colors">Career Blog</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/post-job" className="text-slate-400 hover:text-white transition-colors">Post a Job</a></li>
              <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-slate-400 mb-4 sm:mb-0">
            © {currentYear} JobFind. All rights reserved. Find remote jobs, work from home opportunities, and telecommute positions.
          </div>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com/jobfind" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/company/jobfind" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://github.com/jobfind" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* SEO Keywords Section */}
      <div className="bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-slate-500 text-center">
            <p className="leading-relaxed">
              Remote jobs | Work from home jobs | Remote careers | Online jobs | Telecommute jobs | 
              Remote developer jobs | Remote marketing jobs | Remote design jobs | Remote sales jobs | 
              Remote customer support jobs | Remote data science jobs | Remote writing jobs | 
              Digital nomad jobs | Freelance jobs | Remote first companies | WFH opportunities | 
              Location independent jobs | Distributed team jobs | Virtual jobs | Home office jobs
            </p>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}