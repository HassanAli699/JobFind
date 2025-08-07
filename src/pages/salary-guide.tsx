import { DollarSign, TrendingUp, MapPin, Briefcase, Star, Calculator, ArrowLeft, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLocation } from "wouter";

export default function SalaryGuide() {
  const [, setLocation] = useLocation();
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSalaryBrowser, setShowSalaryBrowser] = useState(false);
  const [calculatorForm, setCalculatorForm] = useState({
    role: '',
    experience: '',
    location: ''
  });
  const [salaryFilter, setSalaryFilter] = useState({
    minSalary: '',
    maxSalary: '',
    currency: 'USD'
  });
  const [calculatedSalary, setCalculatedSalary] = useState<{min: number, max: number} | null>(null);

  const calculateSalary = () => {
    const { role, experience, location } = calculatorForm;
    
    if (!role || !experience || !location) {
      alert('Please fill in all fields');
      return;
    }

    let baseSalary = 70000; // Default base
    
    // Role adjustments
    if (role.includes('engineer') || role.includes('developer')) {
      baseSalary = 85000;
    } else if (role.includes('product')) {
      baseSalary = 95000;
    } else if (role.includes('data')) {
      baseSalary = 90000;
    } else if (role.includes('design')) {
      baseSalary = 75000;
    } else if (role.includes('marketing')) {
      baseSalary = 65000;
    }
    
    // Experience adjustments
    if (experience === 'senior') {
      baseSalary *= 1.6;
    } else if (experience === 'mid') {
      baseSalary *= 1.2;
    }
    
    // Location adjustments
    if (location === 'canada') {
      baseSalary *= 0.8;
    } else if (location === 'europe') {
      baseSalary *= 0.85;
    } else if (location === 'asia' || location === 'latin-america') {
      baseSalary *= 0.6;
    }
    
    const minSalary = Math.round(baseSalary * 0.8);
    const maxSalary = Math.round(baseSalary * 1.3);
    
    setCalculatedSalary({ min: minSalary, max: maxSalary });
  };

  const handleSalarySearch = () => {
    const { minSalary, maxSalary } = salaryFilter;
    
    if (!minSalary) {
      alert('Please enter a minimum salary');
      return;
    }

    // Navigate to home with salary filter
    let searchParams = `?minSalary=${minSalary}`;
    if (maxSalary) {
      searchParams += `&maxSalary=${maxSalary}`;
    }
    
    setLocation(`/${searchParams}`);
    setShowSalaryBrowser(false);
  };
  const salaryRanges = [
    {
      role: "Software Engineer",
      junior: "$60k - $90k",
      mid: "$90k - $140k",
      senior: "$140k - $200k+",
      trending: "up"
    },
    {
      role: "Product Manager",
      junior: "$70k - $100k",
      mid: "$100k - $150k",
      senior: "$150k - $220k+",
      trending: "up"
    },
    {
      role: "UX/UI Designer",
      junior: "$50k - $75k",
      mid: "$75k - $120k",
      senior: "$120k - $180k+",
      trending: "stable"
    },
    {
      role: "Data Scientist",
      junior: "$70k - $100k",
      mid: "$100k - $150k",
      senior: "$150k - $250k+",
      trending: "up"
    },
    {
      role: "Marketing Manager",
      junior: "$50k - $70k",
      mid: "$70k - $110k",
      senior: "$110k - $160k+",
      trending: "stable"
    },
    {
      role: "Customer Success",
      junior: "$40k - $60k",
      mid: "$60k - $90k",
      senior: "$90k - $130k+",
      trending: "up"
    }
  ];

  const locationFactors = [
    { location: "United States", factor: "1.0x", range: "$70k - $200k+" },
    { location: "Canada", factor: "0.8x", range: "$56k - $160k+" },
    { location: "United Kingdom", factor: "0.9x", range: "$63k - $180k+" },
    { location: "Germany", factor: "0.85x", range: "$60k - $170k+" },
    { location: "Australia", factor: "0.9x", range: "$63k - $180k+" },
    { location: "Eastern Europe", factor: "0.6x", range: "$42k - $120k+" },
    { location: "Latin America", factor: "0.5x", range: "$35k - $100k+" },
    { location: "Asia Pacific", factor: "0.7x", range: "$49k - $140k+" }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Base Salary",
      description: "Your fixed annual compensation",
      typical: "60-80% of total comp"
    },
    {
      icon: Star,
      title: "Equity/Stock Options",
      description: "Ownership stake in the company",
      typical: "10-25% of total comp"
    },
    {
      icon: TrendingUp,
      title: "Annual Bonus",
      description: "Performance-based additional pay",
      typical: "5-15% of base salary"
    },
    {
      icon: Briefcase,
      title: "Benefits Package",
      description: "Health, dental, retirement, PTO",
      typical: "$15k - $30k value"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Meta Tags */}
      <title>Remote Work Salary Guide 2025 | JobFind - Compensation Data</title>
      
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
            <DollarSign className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Remote Work Salary Guide</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive compensation data for remote positions. Know your worth and 
              negotiate with confidence using real market data.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$95k</div>
              <div className="text-slate-600">Average Remote Salary</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">15%</div>
              <div className="text-slate-600">YoY Salary Growth</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">180+</div>
              <div className="text-slate-600">Countries Hiring</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">78%</div>
              <div className="text-slate-600">Offer Equity</div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Ranges by Role */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Salary Ranges by Role</h2>
          <div className="space-y-4">
            {salaryRanges.map((role, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{role.role}</h3>
                        <Badge variant={role.trending === 'up' ? 'default' : 'secondary'} 
                               className={role.trending === 'up' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {role.trending === 'up' ? '↗ Growing' : '→ Stable'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Junior: </span>
                          <span className="font-medium text-slate-700">{role.junior}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Mid-level: </span>
                          <span className="font-medium text-slate-700">{role.mid}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Senior: </span>
                          <span className="font-medium text-slate-700">{role.senior}</span>
                        </div>
                      </div>
                    </div>
                    <TrendingUp className={`h-5 w-5 ml-4 ${role.trending === 'up' ? 'text-green-500' : 'text-gray-400'}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location Adjustments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Salary by Location</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-slate-600 mb-8 text-center">
              Remote salaries often vary by location due to cost of living differences. 
              Here are typical adjustment factors based on employee location.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locationFactors.map((location, index) => (
                <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold text-slate-900 mb-1">{location.location}</h3>
                  <div className="text-lg font-bold text-blue-600 mb-1">{location.factor}</div>
                  <div className="text-sm text-slate-600">{location.range}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Compensation Breakdown */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Total Compensation Breakdown</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-3">{benefit.description}</p>
                  <div className="text-sm font-medium text-blue-600">{benefit.typical}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Negotiation Tips */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                Salary Negotiation Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Before Negotiating</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Research market rates for your role and location</li>
                  <li>• Document your achievements and value-add</li>
                  <li>• Consider total compensation, not just base salary</li>
                  <li>• Understand the company's compensation philosophy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">During Negotiation</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Lead with value, not personal financial needs</li>
                  <li>• Be prepared to justify your ask with data</li>
                  <li>• Consider non-salary benefits (PTO, equity, etc.)</li>
                  <li>• Maintain professionalism throughout</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl">💡 Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Market Trends</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Remote salaries are converging with on-site rates</li>
                  <li>• Tech skills command premium regardless of location</li>
                  <li>• More companies offering location-independent pay</li>
                  <li>• Equity compensation becoming more common</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Growth Opportunities</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Senior roles see 20-40% salary premiums</li>
                  <li>• Leadership positions often include significant equity</li>
                  <li>• Specialized skills (AI/ML, Security) in high demand</li>
                  <li>• Cross-functional experience highly valued</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Calculator CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Calculate Your Market Value</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Use our salary calculator to get personalized compensation estimates based on your 
            role, experience, and location preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowCalculator(true)}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Salary Calculator
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => setShowSalaryBrowser(true)}
            >
              Browse Jobs by Salary
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Data updated monthly • Based on 50k+ remote job postings
          </p>
        </div>
      </div>

      {/* Salary Calculator Dialog */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-blue-600" />
              Salary Calculator
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <Select value={calculatorForm.role} onValueChange={(value) => setCalculatorForm({...calculatorForm, role: value})}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="designer">UX/UI Designer</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                  <SelectItem value="developer">Full Stack Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Experience Level</label>
              <Select value={calculatorForm.experience} onValueChange={(value) => setCalculatorForm({...calculatorForm, experience: value})}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Location</label>
              <Select value={calculatorForm.location} onValueChange={(value) => setCalculatorForm({...calculatorForm, location: value})}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="united-states">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="asia">Asia Pacific</SelectItem>
                  <SelectItem value="latin-america">Latin America</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calculatedSalary && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Estimated Salary Range</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  ${calculatedSalary.min.toLocaleString()} - ${calculatedSalary.max.toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">
                  This estimate is based on market data. Actual offers may vary based on company, 
                  specific skills, and other factors.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={calculateSalary}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Calculate Salary
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCalculator(false);
                  setCalculatedSalary(null);
                  setCalculatorForm({ role: '', experience: '', location: '' });
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Browse Jobs by Salary Dialog */}
      <Dialog open={showSalaryBrowser} onOpenChange={setShowSalaryBrowser}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              Browse Jobs by Salary
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Minimum Salary (Annual)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  placeholder="e.g., 80000"
                  value={salaryFilter.minSalary}
                  onChange={(e) => setSalaryFilter({...salaryFilter, minSalary: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Maximum Salary (Annual) - Optional</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  placeholder="e.g., 150000"
                  value={salaryFilter.maxSalary}
                  onChange={(e) => setSalaryFilter({...salaryFilter, maxSalary: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Currency</label>
              <Select value={salaryFilter.currency} onValueChange={(value) => setSalaryFilter({...salaryFilter, currency: value})}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Search Preview</h4>
              <p className="text-sm text-slate-600">
                {salaryFilter.minSalary ? (
                  <>
                    Jobs with salary {salaryFilter.currency} ${parseInt(salaryFilter.minSalary).toLocaleString()}
                    {salaryFilter.maxSalary && ` - ${salaryFilter.currency} $${parseInt(salaryFilter.maxSalary).toLocaleString()}`}
                    {!salaryFilter.maxSalary && '+'}
                  </>
                ) : (
                  'Enter a minimum salary to search for jobs'
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleSalarySearch}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!salaryFilter.minSalary}
              >
                Search Jobs
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowSalaryBrowser(false);
                  setSalaryFilter({ minSalary: '', maxSalary: '', currency: 'USD' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}