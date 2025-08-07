import { Briefcase, Globe, Users, Target, Heart, Award, Home } from "lucide-react";
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* SEO Meta Tags */}
      <title>About JobFind | Leading Remote Job Board Platform</title>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to JobFind
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">About JobFind</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connecting talented professionals with remote opportunities worldwide. 
              We're building the future of work, one remote job at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                JobFind exists to democratize access to remote work opportunities. We believe that talent 
                knows no borders, and the best opportunities should be available to everyone, everywhere.
              </p>
              <p className="text-lg text-slate-600">
                Our platform aggregates the highest quality remote job listings from top companies worldwide, 
                making it easier than ever to find your next remote position.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500K+</div>
                  <div className="text-slate-600">Jobs Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5,000+</div>
                  <div className="text-slate-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">180+</div>
                  <div className="text-slate-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-slate-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/90 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Global Accessibility</h3>
              <p className="text-slate-600">
                We believe great opportunities should be accessible to everyone, regardless of location or background.
              </p>
            </div>
            <div className="text-center bg-white/90 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Community First</h3>
              <p className="text-slate-600">
                Building a supportive community where remote workers can connect, learn, and grow together.
              </p>
            </div>
            <div className="text-center bg-white/90 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Quality Excellence</h3>
              <p className="text-slate-600">
                Curating only the highest quality remote job opportunities from verified, reputable companies.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/90 rounded-2xl p-12 shadow-xl mb-16 backdrop-blur-sm border border-white/20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
            </div>
            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="mb-6">
                JobFind was born from a simple observation: the best remote jobs were scattered across 
                dozens of different platforms, making it nearly impossible for job seekers to find quality 
                opportunities efficiently.
              </p>
              <p className="mb-6">
                Founded in 2024, we set out to solve this problem by creating a centralized platform that 
                aggregates remote job listings from the most trusted sources in the industry. Our team of 
                former remote workers understands the challenges of finding legitimate, high-quality remote 
                positions.
              </p>
              <p>
                Today, JobFind serves hundreds of thousands of job seekers worldwide, helping them discover 
                opportunities with companies that truly embrace remote work culture. We're proud to be part 
                of the remote work revolution and continue to innovate in this space.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Built by Remote Workers, for Remote Workers</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Our fully distributed team spans across 15 countries and 8 time zones. We practice what we preach 
            and understand the unique needs of remote professionals because we are remote professionals.
          </p>
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl p-8 backdrop-blur-sm border border-blue-200/50">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Join Our Mission</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Interested in helping us build the future of remote work? We're always looking for 
              passionate individuals to join our remote-first team.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View Open Positions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}