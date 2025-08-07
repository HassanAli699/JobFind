import { Mail, MessageSquare, Phone, MapPin, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'wouter';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* SEO Meta Tags */}
      <title>Contact JobFind | Get in Touch with Our Team</title>
      
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
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about JobFind? Need help with your job search? 
              We're here to help you succeed in your remote career journey.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Information</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Reach out to us directly via email for any questions, support, or business inquiries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* General Contact */}
          <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">General Inquiries</h3>
              <p className="text-slate-600 text-sm mb-4">
                For general questions about JobFind
              </p>
              <a href="mailto:hassanali669a@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all">
                hassanali669a@gmail.com
              </a>
            </CardContent>
          </Card>

          {/* Support Contact */}
          <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Customer Support</h3>
              <p className="text-slate-600 text-sm mb-4">
                Need help with your job search?
              </p>
              <a href="mailto:hassanali669a@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all">
                hassanali669a@gmail.com
              </a>
            </CardContent>
          </Card>

          {/* Business Contact */}
          <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-4">
                <Phone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Business Partnerships</h3>
              <p className="text-slate-600 text-sm mb-4">
                Interested in partnering with us?
              </p>
              <a href="mailto:hassanali669a@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all">
                hassanali669a@gmail.com
              </a>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
              <p className="text-slate-600 text-sm mb-4">
                We typically respond within 24 hours
              </p>
              <a href="mailto:hassanali669a@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all">
                hassanali669a@gmail.com
              </a>
            </CardContent>
          </Card>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-3">How do I post a job on JobFind?</h3>
                <p className="text-slate-600 text-sm">
                  Currently, JobFind aggregates jobs from trusted partner platforms. 
                  For posting jobs directly, please contact us at hassanali669a@gmail.com.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Are all jobs on JobFind legitimate?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! We only aggregate jobs from verified, reputable sources including RemoteOK, 
                  Remotive, We Work Remotely, and Jobicy to ensure quality and legitimacy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Is JobFind free to use?</h3>
                <p className="text-slate-600 text-sm">
                  Absolutely! JobFind is completely free for job seekers. We believe everyone should 
                  have access to great remote opportunities regardless of their financial situation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-3">How often are new jobs added?</h3>
                <p className="text-slate-600 text-sm">
                  New jobs are added continuously throughout the day as our system aggregates 
                  fresh listings from our partner platforms. Check back regularly for the latest opportunities!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}