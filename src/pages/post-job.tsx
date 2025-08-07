import { Briefcase, Building, Mail, Phone, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostJob() {
  const pricingTiers = [
    {
      name: "Basic",
      price: "$99",
      duration: "30 days",
      features: ["Single job posting", "Standard visibility", "Email support", "Basic analytics"],
      popular: false
    },
    {
      name: "Premium", 
      price: "$199",
      duration: "60 days",
      features: ["Featured job posting", "Enhanced visibility", "Priority support", "Advanced analytics", "Company branding"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "Ongoing",
      features: ["Multiple job postings", "Maximum visibility", "Dedicated support", "Custom analytics", "API access"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Meta Tags */}
      <title>Post a Job | JobFind - Reach Top Remote Talent</title>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Post Your Remote Job</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Reach thousands of qualified remote professionals actively searching for their next opportunity. 
              Get your job in front of the right candidates.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Post a Job Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
            <div className="text-slate-600">Active Job Seekers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-slate-600">Monthly Applications</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-slate-600">Quality Match Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">72hrs</div>
            <div className="text-slate-600">Average Time to Hire</div>
          </div>
        </div>

        {/* Why Choose JobFind */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Post on JobFind?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Candidates</h3>
                <p className="text-slate-600">
                  Access pre-screened remote professionals with proven track records in distributed work environments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Targeted Reach</h3>
                <p className="text-slate-600">
                  Your jobs reach candidates specifically looking for remote opportunities, ensuring better fit and engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fast Results</h3>
                <p className="text-slate-600">
                  Get qualified applications within hours of posting. Our active community checks for new opportunities daily.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Choose the plan that works best for your hiring needs. No hidden fees, no long-term contracts.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`bg-white shadow-sm relative ${tier.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-2xl text-slate-900 mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-slate-600">/{tier.duration}</span>}
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                    size="lg"
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Create Your Listing</h3>
              <p className="text-sm text-slate-600">Fill out our simple job posting form with all the details about your remote position.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Review & Publish</h3>
              <p className="text-sm text-slate-600">Our team reviews your posting for quality and publishes it within 24 hours.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Receive Applications</h3>
              <p className="text-sm text-slate-600">Start receiving applications from qualified remote professionals.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Hire Great Talent</h3>
              <p className="text-sm text-slate-600">Interview and hire the perfect remote team member for your company.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Find Your Next Team Member?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Join thousands of companies who have successfully hired remote talent through JobFind. 
            Get started today and connect with top professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Post Your First Job
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Schedule a Demo
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <Mail className="h-6 w-6 mx-auto mb-2 text-slate-600" />
              <p className="text-sm text-slate-600">
                <strong>Email:</strong><br />
                employers@jobfind.com
              </p>
            </div>
            <div className="text-center">
              <Phone className="h-6 w-6 mx-auto mb-2 text-slate-600" />
              <p className="text-sm text-slate-600">
                <strong>Sales:</strong><br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}