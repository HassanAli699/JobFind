import { Briefcase, Globe, Heart, Star, MapPin, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Join our frontend team to build the next generation of JobFind's user experience using React, TypeScript, and modern web technologies.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Remote work experience", "Strong UI/UX sensibilities"]
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Remote (Americas)",
      type: "Full-time", 
      salary: "$90k - $130k",
      description: "Drive product positioning, messaging, and go-to-market strategy for JobFind's platform and new features.",
      requirements: ["3+ years product marketing", "B2B SaaS experience", "Data-driven mindset", "Excellent communication skills"]
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "Remote (Europe)",
      type: "Full-time",
      salary: "$60k - $85k", 
      description: "Help job seekers succeed in their remote career journey by providing exceptional support and guidance.",
      requirements: ["2+ years customer success", "Empathetic communication", "Problem-solving skills", "Remote work passion"]
    },
    {
      title: "Data Engineer",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Build and maintain our job aggregation pipeline, ensuring high-quality data from multiple sources.",
      requirements: ["Python/Node.js expertise", "ETL pipeline experience", "Database optimization", "API integration skills"]
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "100% Remote",
      description: "Work from anywhere in the world with flexible hours across all time zones."
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness stipend."
    },
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Market-leading salaries, equity, and performance bonuses."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Choose your hours and maintain work-life balance that works for you."
    },
    {
      icon: Star,
      title: "Growth Focus",
      description: "Learning budget, conference attendance, and career development opportunities."
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Work with passionate, talented people who care about remote work's future."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Meta Tags */}
      <title>Careers at JobFind | Join Our Remote-First Team</title>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Help us build the future of remote work. We're looking for passionate individuals 
              to join our distributed team and shape how people find remote opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-blue-500/30 rounded-full px-4 py-2">
                🌍 Fully Remote
              </div>
              <div className="bg-blue-500/30 rounded-full px-4 py-2">
                ⚡ Fast Growing
              </div>
              <div className="bg-blue-500/30 rounded-full px-4 py-2">
                🚀 Innovative
              </div>
              <div className="bg-blue-500/30 rounded-full px-4 py-2">
                🤝 Collaborative
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Join JobFind?</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're not just building a job board – we're creating the infrastructure for the future of work. 
            Join us in making remote opportunities accessible to everyone, everywhere.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                </div>
                <p className="text-slate-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Remote First</h3>
              <p className="text-slate-600">
                We believe the best talent is distributed globally, and remote work is the future.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">People First</h3>
              <p className="text-slate-600">
                Every decision we make prioritizes the wellbeing and growth of our team and users.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-slate-600">
                We strive for excellence in everything we do, from code quality to user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Open Positions</h2>
            <p className="text-xl text-slate-600">
              Join our team and help millions of people find their perfect remote job
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-900 mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {position.department}
                        </Badge>
                        <Badge variant="outline" className="border-slate-300">
                          <MapPin className="h-3 w-3 mr-1" />
                          {position.location}
                        </Badge>
                        <Badge variant="outline" className="border-slate-300">
                          <Clock className="h-3 w-3 mr-1" />
                          {position.type}
                        </Badge>
                        <Badge variant="outline" className="border-green-300 text-green-700">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {position.salary}
                        </Badge>
                      </div>
                    </div>
                    <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{position.description}</p>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Requirements:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Hiring Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Application</h3>
              <p className="text-sm text-slate-600">Submit your application with resume and cover letter</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Screening</h3>
              <p className="text-sm text-slate-600">Initial screening call with our talent team</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Interviews</h3>
              <p className="text-sm text-slate-600">Technical and cultural fit interviews with the team</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Offer</h3>
              <p className="text-sm text-slate-600">Reference checks and job offer</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Don't See Your Perfect Role?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and tell us how 
            you'd like to contribute to JobFind's mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Send General Application
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Contact Recruiting Team
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Equal opportunity employer • Remote-first • Global team
          </p>
        </div>
      </div>
    </div>
  );
}