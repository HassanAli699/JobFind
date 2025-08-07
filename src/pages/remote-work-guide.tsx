import { BookOpen, Home, Users, Clock, Monitor, Heart, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function RemoteWorkGuide() {
  const [, setLocation] = useLocation();
  const guideSteps = [
    {
      icon: Home,
      title: "Setting Up Your Home Office",
      description: "Create a productive workspace that enhances focus and comfort",
      content: "A dedicated workspace is crucial for remote work success. Choose a quiet area with good lighting, invest in an ergonomic chair and desk, and ensure reliable internet connectivity."
    },
    {
      icon: Clock,
      title: "Time Management & Routines", 
      description: "Establish boundaries and maintain work-life balance",
      content: "Set clear working hours, create morning routines, use time-blocking techniques, and take regular breaks to maintain productivity and mental health."
    },
    {
      icon: Users,
      title: "Communication & Collaboration",
      description: "Master remote team communication tools and practices",
      content: "Use video calls for important discussions, be proactive in communication, document decisions, and participate actively in team meetings and discussions."
    },
    {
      icon: Monitor,
      title: "Technology & Tools",
      description: "Essential software and hardware for remote productivity",
      content: "Invest in quality hardware, master productivity tools like Slack, Zoom, and project management software, and ensure proper cybersecurity practices."
    }
  ];

  const tips = [
    "Start your day with a consistent morning routine",
    "Dress professionally even when working from home",
    "Take regular breaks and step away from your screen",
    "Communicate proactively with your team",
    "Set boundaries between work and personal time",
    "Invest in good lighting and ergonomic furniture",
    "Use noise-canceling headphones for focus",
    "Schedule virtual coffee breaks with colleagues"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Meta Tags */}
      <title>Complete Remote Work Guide | JobFind - Work From Home Successfully</title>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 mr-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Complete Remote Work Guide</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to know to excel in remote work. From setting up your home office 
              to mastering virtual collaboration, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Welcome to Remote Work</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Remote work has transformed from a rare perk to a mainstream work arrangement. Whether you're 
            new to working from home or looking to improve your remote work skills, this comprehensive 
            guide will help you thrive in a distributed work environment.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">40%</div>
              <div className="text-slate-600">of workforce works remotely</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25%</div>
              <div className="text-slate-600">increase in productivity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">90%</div>
              <div className="text-slate-600">want to continue remote work</div>
            </div>
          </div>
        </div>

        {/* Guide Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Your Remote Work Journey</h2>
          <div className="space-y-8">
            {guideSteps.map((step, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-blue-100 p-4 rounded-lg flex-shrink-0">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-lg text-slate-600 mb-4">{step.description}</p>
                      <p className="text-slate-700">{step.content}</p>
                    </div>
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Quick Success Tips</h2>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Heart className="h-6 w-6 text-red-500 mr-3" />
                  Remote Work Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Personal Benefits</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Better work-life balance</li>
                      <li>• No commute time or costs</li>
                      <li>• Flexible schedule options</li>
                      <li>• Improved focus and productivity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Professional Benefits</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Access to global opportunities</li>
                      <li>• Skill development in digital tools</li>
                      <li>• Enhanced self-discipline</li>
                      <li>• Better written communication</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Home Office Setup */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">🏠 Home Office Setup Essentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Essential Equipment</h4>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Ergonomic chair and adjustable desk</li>
                    <li>• External monitor (24" or larger)</li>
                    <li>• Quality webcam and microphone</li>
                    <li>• Reliable internet (25+ Mbps)</li>
                    <li>• Good lighting (natural or LED)</li>
                    <li>• Noise-canceling headphones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Environment Optimization</h4>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Dedicated workspace area</li>
                    <li>• Minimize distractions</li>
                    <li>• Temperature control</li>
                    <li>• Plants for better air quality</li>
                    <li>• Organization systems</li>
                    <li>• Backup power solutions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Best Practices */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">💬 Communication Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Virtual Meetings</h4>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Test tech before important calls</li>
                    <li>• Use video when possible</li>
                    <li>• Mute when not speaking</li>
                    <li>• Have good lighting on your face</li>
                    <li>• Prepare agenda in advance</li>
                    <li>• Follow up with meeting notes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Async Communication</h4>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Write clear, concise messages</li>
                    <li>• Use appropriate channels</li>
                    <li>• Respond within agreed timeframes</li>
                    <li>• Document important decisions</li>
                    <li>• Use project management tools</li>
                    <li>• Be mindful of time zones</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Productivity & Wellness */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">⚡ Productivity & Wellness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Staying Productive</h4>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Use time-blocking techniques</li>
                    <li>• Take regular breaks (Pomodoro)</li>
                    <li>• Eliminate social media distractions</li>
                    <li>• Set daily and weekly goals</li>
                    <li>• Use productivity apps and tools</li>
                    <li>• Create end-of-day routines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Mental Health</h4>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Maintain social connections</li>
                    <li>• Get sunlight and fresh air</li>
                    <li>• Exercise regularly</li>
                    <li>• Practice mindfulness/meditation</li>
                    <li>• Set clear work boundaries</li>
                    <li>• Seek support when needed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-12 text-center mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Excel in Remote Work?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Start your remote career journey today. Browse thousands of remote job opportunities 
            from companies that embrace distributed work culture.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setLocation("/")}
          >
            Browse Remote Jobs
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}