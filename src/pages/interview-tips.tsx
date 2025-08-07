import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Video, 
  Wifi, 
  Mic, 
  Monitor, 
  Clock, 
  FileText, 
  Users, 
  MessageSquare,
  Lightbulb,
  Star,
  ArrowRight,
  BookOpen,
  Target,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function InterviewTips() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Remote Interview Success Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master remote interviews with expert tips, technical setup guides, and proven strategies 
              to land your dream remote job.
            </p>
            <Link href="/">
              <Button variant="outline" className="mt-6">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Tips Overview */}
        <Card className="bg-white dark:bg-gray-800 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Star className="w-6 h-6 mr-3 text-yellow-500" />
              Quick Success Tips
            </CardTitle>
            <CardDescription>
              Essential checklist for remote interview success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Test Technology</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Verify camera, microphone, and internet 24 hours before</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Professional Setup</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Clean background, good lighting, eye-level camera</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Research Company</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Study their remote culture, values, and recent news</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Prepare Examples</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">STAR method stories showcasing remote work skills</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Technical Setup */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Monitor className="w-5 h-5 mr-3 text-blue-500" />
                Technical Setup
              </CardTitle>
              <CardDescription>
                Ensure flawless technical performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <Video className="w-4 h-4 mr-2 text-green-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Camera & Video</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-6">
                  <li>• Position camera at eye level</li>
                  <li>• Ensure good lighting (window facing you or ring light)</li>
                  <li>• Test video quality beforehand</li>
                  <li>• Clean your lens and check background</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Mic className="w-4 h-4 mr-2 text-purple-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Audio Quality</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-6">
                  <li>• Use headphones or external microphone</li>
                  <li>• Test audio levels and clarity</li>
                  <li>• Choose quiet room away from distractions</li>
                  <li>• Have backup audio device ready</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Wifi className="w-4 h-4 mr-2 text-orange-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Internet Connection</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-6">
                  <li>• Use wired connection when possible</li>
                  <li>• Test connection speed (minimum 5 Mbps up/down)</li>
                  <li>• Close unnecessary applications</li>
                  <li>• Have mobile hotspot as backup</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Interview Preparation */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <BookOpen className="w-5 h-5 mr-3 text-green-500" />
                Interview Preparation
              </CardTitle>
              <CardDescription>
                Research and practice strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <Target className="w-4 h-4 mr-2 text-red-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Company Research</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-6">
                  <li>• Study company's remote work policies</li>
                  <li>• Read recent news and press releases</li>
                  <li>• Understand their products/services deeply</li>
                  <li>• Research the interviewer on LinkedIn</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <FileText className="w-4 h-4 mr-2 text-blue-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">STAR Method Stories</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-6">
                  <li>• Situation: Set the context</li>
                  <li>• Task: Describe your responsibility</li>
                  <li>• Action: Explain what you did</li>
                  <li>• Result: Share the outcome</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <MessageSquare className="w-4 h-4 mr-2 text-indigo-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Common Questions</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-6">
                  <li>• "How do you handle remote work challenges?"</li>
                  <li>• "Describe your ideal work environment"</li>
                  <li>• "How do you maintain work-life balance?"</li>
                  <li>• "Tell me about a time you worked independently"</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Remote-Specific Tips */}
        <Card className="bg-white dark:bg-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="w-5 h-5 mr-3 text-purple-500" />
              Remote Work Interview Questions
            </CardTitle>
            <CardDescription>
              Be prepared for these remote-specific questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Questions You Should Ask</h4>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    What does a typical day look like for this role?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    How does the team collaborate and communicate?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    What tools and platforms do you use?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    How do you measure success in remote roles?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    What growth opportunities are available?
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Questions They Might Ask</h4>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                    How do you stay motivated working from home?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                    Describe your home office setup
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                    How do you handle time zone differences?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                    What's your experience with remote collaboration?
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                    How do you ensure clear communication?
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day of Interview */}
        <Card className="bg-white dark:bg-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Clock className="w-5 h-5 mr-3 text-orange-500" />
              Day of Interview
            </CardTitle>
            <CardDescription>
              Final checklist for interview day success
            </CardDescription>
            </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-3">Before</Badge>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Preparation</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Join 5-10 minutes early</li>
                  <li>• Test all technology again</li>
                  <li>• Have water and notes ready</li>
                  <li>• Close distracting applications</li>
                  <li>• Inform household of interview</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-3">During</Badge>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Interview</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Maintain good eye contact with camera</li>
                  <li>• Speak clearly and at moderate pace</li>
                  <li>• Use gestures naturally</li>
                  <li>• Take brief pauses to think</li>
                  <li>• Show enthusiasm and energy</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-3">After</Badge>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Follow-up</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Send thank you email within 24 hours</li>
                  <li>• Reference specific conversation points</li>
                  <li>• Reiterate interest and qualifications</li>
                  <li>• Provide any requested additional info</li>
                  <li>• Connect on LinkedIn if appropriate</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Lightbulb className="w-5 h-5 mr-3 text-yellow-500" />
              Pro Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-800">Show Your Remote Skills</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-700">
                      Demonstrate self-discipline, communication skills, and ability to work independently through specific examples.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-800">Highlight Digital Tools</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-700">
                      Mention your proficiency with collaboration tools like Slack, Zoom, Trello, or project management platforms.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-800">Address Concerns Proactively</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-700">
                      If you're new to remote work, emphasize transferable skills and eagerness to learn remote best practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-800">Practice Virtual Presence</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-700">
                      Record yourself answering questions to improve your on-camera presence and speaking clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Land Your Remote Job?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Use these tips to ace your next remote interview and start your journey to location independence.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowRight className="w-5 h-5 mr-2" />
              Find Remote Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}