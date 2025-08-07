import { useState, useEffect } from 'react';
import { Search, Briefcase, BookOpen, Building2, FileText, MessageCircle, Users, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchHeader({ searchQuery, onSearchChange }: SearchHeaderProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Sync local query with prop changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    // Trigger search on every keystroke for immediate results
    onSearchChange(value);
  };

  const navigationLinks = [
    { href: '/', label: 'Jobs', icon: Briefcase },
    { href: '/resume-builder', label: 'Resume', icon: FileText },
    { href: '/interview-tips', label: 'Interview Tips', icon: MessageCircle },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/about', label: 'About', icon: Users },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">JobFind</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 ml-8">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const active = isActiveLink(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      active 
                        ? 'bg-blue-50 text-blue-600 font-medium' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <form onSubmit={handleSubmit} className="relative">
              <Input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={localQuery}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const active = isActiveLink(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start flex items-center space-x-3 px-3 py-3 rounded-lg ${
                      active 
                        ? 'bg-blue-50 text-blue-600 font-medium' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}

          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        </form>
      </div>
    </header>
  );
}
