import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'wouter';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* SEO Meta Tags */}
      <title>Terms of Service | JobFind - Legal Terms and Conditions</title>
      
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
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using JobFind's services.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: August 7, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Acceptance */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Acceptance of Terms</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            By accessing and using JobFind ("the Service"), you accept and agree to be bound by the 
            terms and provision of this agreement. If you do not agree to abide by the above, please 
            do not use this service.
          </p>
        </div>

        {/* Service Description */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Service Description</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">
              JobFind is a job aggregation platform that collects remote job listings from various 
              trusted sources including RemoteOK, Remotive, We Work Remotely, and Jobicy. We provide:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Access to aggregated remote job listings</li>
              <li>Job search and filtering capabilities</li>
              <li>Job details and application links</li>
              <li>Career resources and guides</li>
            </ul>
            <p className="text-slate-600">
              JobFind is a free service for job seekers. We do not charge fees for accessing job listings 
              or using our search functionality.
            </p>
          </div>
        </div>

        {/* User Responsibilities */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">User Responsibilities</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Acceptable Use</h3>
              <p className="text-slate-600 mb-3">You agree to use JobFind only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Use the service for any unlawful purpose or to solicit unlawful activity</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Use automated scripts, bots, or scrapers to extract data</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Violate any applicable local, state, national, or international law</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Account Security</h3>
              <p className="text-slate-600">
                While JobFind does not currently require user accounts, you are responsible for 
                maintaining the security of any information you provide and for all activities 
                that occur under your use of the service.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Intellectual Property</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Our Content</h3>
              <p className="text-slate-600">
                The Service and its original content, features, and functionality are and will remain 
                the exclusive property of JobFind and its licensors. The service is protected by 
                copyright, trademark, and other laws.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Third-Party Content</h3>
              <p className="text-slate-600">
                Job listings displayed on JobFind are sourced from third-party platforms. We do not 
                claim ownership of this content and respect the intellectual property rights of the 
                original sources.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Disclaimers</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Job Listings</h3>
              <p className="text-slate-600">
                JobFind aggregates job listings from third-party sources. We do not guarantee the 
                accuracy, completeness, or legitimacy of any job listing. Users should verify 
                information directly with employers before applying.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Availability</h3>
              <p className="text-slate-600">
                We strive to maintain high availability but do not guarantee uninterrupted access 
                to the service. We may temporarily suspend access for maintenance, updates, or 
                technical issues.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">External Links</h3>
              <p className="text-slate-600">
                Our service contains links to third-party websites and services. We are not 
                responsible for the content, privacy policies, or practices of these external sites.
              </p>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <XCircle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-800 font-medium mb-2">Important Legal Notice</p>
            <p className="text-red-700 text-sm">
              Please read this section carefully as it limits our liability to you.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">
              IN NO EVENT SHALL JOBFIND, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE 
              TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL 
              DAMAGES ARISING FROM:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Your use of the service or inability to use the service</li>
              <li>Any job applications or employment opportunities</li>
              <li>Any unauthorized access to or use of our servers and/or personal information</li>
              <li>Any interruption or cessation of transmission to or from our service</li>
              <li>Any bugs, viruses, or similar that may be transmitted to or through our service</li>
            </ul>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Termination</h2>
          
          <div className="space-y-4">
            <p className="text-slate-600">
              We may terminate or suspend access to our service immediately, without prior notice 
              or liability, for any reason whatsoever, including without limitation if you breach 
              the Terms.
            </p>
            <p className="text-slate-600">
              Upon termination, your right to use the service will cease immediately. All provisions 
              of the Terms which by their nature should survive termination shall survive termination.
            </p>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Governing Law</h2>
          
          <p className="text-slate-600">
            These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
            JobFind operates, without regard to its conflict of law provisions. Our failure to 
            enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Changes to Terms</h2>
          
          <p className="text-slate-600">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days notice prior to any new 
            terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About These Terms?</h2>
          <p className="text-slate-600 mb-6">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              <strong>Email:</strong> <a href="mailto:hassanali669a@gmail.com" className="text-blue-600 hover:text-blue-700">hassanali669a@gmail.com</a>
            </p>
            <p className="text-sm text-slate-600">
              <strong>Address:</strong> JobFind Legal Team, Remote-First Company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}