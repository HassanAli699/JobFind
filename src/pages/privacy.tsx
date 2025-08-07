import { Shield, Eye, Lock, Users, FileText, AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'wouter';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* SEO Meta Tags */}
      <title>Privacy Policy | JobFind - Your Data Protection Rights</title>
      
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
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: August 7, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Overview */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <Eye className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            JobFind ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our 
            website and use our job search services. Please read this privacy policy carefully.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Information You Provide</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Contact information when you reach out to us (name, email address)</li>
                <li>Job search preferences and filters you set</li>
                <li>Feedback and communications you send to us</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Information Automatically Collected</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Usage data (pages visited, time spent, search queries)</li>
                <li>Device information (browser type, operating system, IP address)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Referral sources and website analytics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">How We Use Your Information</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Provide and improve our job search services</li>
              <li>Personalize your job search experience</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you updates about new features or important changes</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <Lock className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Information Sharing</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-slate-600">
              We do not sell, trade, or otherwise transfer your personal information to third parties, 
              except in the following circumstances:
            </p>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Providers</h3>
              <p className="text-slate-600">
                We may share information with trusted third-party service providers who assist us in 
                operating our website, conducting our business, or serving our users.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Legal Requirements</h3>
              <p className="text-slate-600">
                We may disclose information when required by law or to protect our rights, property, 
                or safety, or that of our users or others.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Business Transfers</h3>
              <p className="text-slate-600">
                In the event of a merger, acquisition, or sale of assets, user information may be 
                transferred as part of the business transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
          </div>
          
          <p className="text-slate-600 mb-6">
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Technical Measures</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• SSL/TLS encryption</li>
                <li>• Secure data storage</li>
                <li>• Regular security audits</li>
                <li>• Access controls</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Organizational Measures</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Staff training</li>
                <li>• Privacy by design</li>
                <li>• Incident response procedures</li>
                <li>• Data minimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Your Rights</h2>
          </div>
          
          <p className="text-slate-600 mb-6">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Access & Portability</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Request access to your personal information</li>
                <li>• Receive a copy of your data in a portable format</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Correction & Deletion</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Correct inaccurate personal information</li>
                <li>• Request deletion of your personal information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Processing Control</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Object to processing of your information</li>
                <li>• Restrict how we process your data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Consent</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Withdraw consent at any time</li>
                <li>• Opt-out of marketing communications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Cookies and Tracking</h2>
          
          <p className="text-slate-600 mb-6">
            We use cookies and similar tracking technologies to enhance your experience on our website. 
            Cookies are small data files stored on your device.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Essential Cookies</h3>
              <p className="text-sm text-slate-600">
                Required for the website to function properly. These cannot be disabled.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Analytics Cookies</h3>
              <p className="text-sm text-slate-600">
                Help us understand how visitors interact with our website to improve user experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Preference Cookies</h3>
              <p className="text-sm text-slate-600">
                Remember your settings and preferences for a better personalized experience.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About Privacy?</h2>
          <p className="text-slate-600 mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              <strong>Email:</strong> <a href="mailto:hassanali669a@gmail.com" className="text-blue-600 hover:text-blue-700">hassanali669a@gmail.com</a>
            </p>
            <p className="text-sm text-slate-600">
              <strong>Address:</strong> JobFind Privacy Team, Remote-First Company
            </p>
          </div>
        </div>

        {/* Updates */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-semibold text-yellow-800 mb-2">Policy Updates</h3>
          <p className="text-sm text-yellow-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "last updated" date. 
            Your continued use of our services after any changes constitutes acceptance of the new policy.
          </p>
        </div>
      </div>
    </div>
  );
}