import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Careers from "@/pages/careers";
import PostJob from "@/pages/post-job";
import Blog from "@/pages/blog";
import Category from "@/pages/category";
import RemoteWorkGuide from "@/pages/remote-work-guide";
import SalaryGuide from "@/pages/salary-guide";
import InterviewTips from "@/pages/interview-tips";
import ResumeBuilder from "@/pages/resume-builder";
import CompanyReviews from "@/pages/company-reviews";
import RemoteDeveloperJobs from "@/pages/remote-developer-jobs";
import RemoteMarketingJobs from "@/pages/remote-marketing-jobs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/careers" component={Careers} />
      <Route path="/post-job" component={PostJob} />
      <Route path="/blog" component={Blog} />
      <Route path="/category/:category" component={Category} />
      <Route path="/remote-work-guide" component={RemoteWorkGuide} />
      <Route path="/salary-guide" component={SalaryGuide} />
      <Route path="/interview-tips" component={InterviewTips} />
      <Route path="/resume-builder" component={ResumeBuilder} />
      <Route path="/companies" component={CompanyReviews} />
      <Route path="/company-reviews" component={CompanyReviews} />
      <Route path="/remote-developer-jobs" component={RemoteDeveloperJobs} />
      <Route path="/remote-marketing-jobs" component={RemoteMarketingJobs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
