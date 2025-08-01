import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@shared/schema";

interface FilterSidebarProps {
  categories: Category[];
  jobStats?: {
    total: number;
    remote: number;
    newThisWeek: number;
  };
  sources?: Array<{name: string; count: number}>;
  onFilterChange: (filters: {
    categories: string[];
    experienceLevels: string[];
    salaryRanges: string[];
    sources: string[];
  }) => void;
}

export default function FilterSidebar({ categories, jobStats, sources, onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const experienceLevels = [
    "Entry Level",
    "Mid Level", 
    "Senior Level",
    "Executive"
  ];

  const salaryRanges = [
    "$40k - $60k",
    "$60k - $80k",
    "$80k - $120k",
    "$120k+"
  ];

  const handleSourceChange = (sourceName: string, checked: boolean) => {
    const newSources = checked
      ? [...selectedSources, sourceName]
      : selectedSources.filter(s => s !== sourceName);
    
    setSelectedSources(newSources);
    onFilterChange({
      categories: selectedCategories,
      experienceLevels: selectedExperienceLevels,
      salaryRanges: selectedSalaryRanges,
      sources: newSources,
    });
  };

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryName]
      : selectedCategories.filter(c => c !== categoryName);
    
    setSelectedCategories(newCategories);
    onFilterChange({
      categories: newCategories,
      experienceLevels: selectedExperienceLevels,
      salaryRanges: selectedSalaryRanges,
      sources: selectedSources,
    });
  };

  const handleExperienceChange = (level: string, checked: boolean) => {
    const newLevels = checked
      ? [...selectedExperienceLevels, level]
      : selectedExperienceLevels.filter(l => l !== level);
    
    setSelectedExperienceLevels(newLevels);
    onFilterChange({
      categories: selectedCategories,
      experienceLevels: newLevels,
      salaryRanges: selectedSalaryRanges,
      sources: selectedSources,
    });
  };

  const handleSalaryChange = (range: string, checked: boolean) => {
    const newRanges = checked
      ? [...selectedSalaryRanges, range]
      : selectedSalaryRanges.filter(r => r !== range);
    
    setSelectedSalaryRanges(newRanges);
    onFilterChange({
      categories: selectedCategories,
      experienceLevels: selectedExperienceLevels,
      salaryRanges: newRanges,
      sources: selectedSources,
    });
  };

  return (
    <aside className="w-full lg:w-64 space-y-4 lg:space-y-6">
      {/* Quick Stats */}
      <Card className="bg-white shadow-sm border border-slate-200 card-hover animate-slide-in">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base font-semibold text-slate-900">Job Statistics</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {jobStats ? (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Jobs</span>
                  <span className="font-medium">{jobStats.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Remote</span>
                  <span className="font-medium text-[#10B981]">{jobStats.remote.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">This Week</span>
                  <span className="font-medium">{jobStats.newThisWeek}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories Filter */}
      <Card className="bg-white shadow-sm border border-slate-200 card-hover animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="font-semibold text-slate-900">Categories</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {(showAllCategories ? categories : categories.filter(cat => cat.count > 0)).map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between cursor-pointer filter-item p-2 rounded"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.name, checked as boolean)
                    }
                    className="text-[#2563EB] focus:ring-[#2563EB]"
                    disabled={!showAllCategories && category.count === 0}
                  />
                  <span className={`text-sm ${category.count === 0 ? 'text-slate-400' : 'text-slate-700'}`}>
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{category.count}</span>
              </label>
            ))}
          </div>
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 h-auto text-[#2563EB] hover:text-blue-700 mt-2"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? 'Show active categories' : 'View all categories'}
          </Button>
        </CardContent>
      </Card>

      {/* Experience Level */}
      <Card className="bg-white shadow-sm border border-slate-200 card-hover animate-scale-in">
        <CardHeader className="pb-3">
          <CardTitle className="font-semibold text-slate-900">Experience Level</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level} className="flex items-center space-x-2 cursor-pointer filter-item p-2 rounded">
                <Checkbox
                  checked={selectedExperienceLevels.includes(level)}
                  onCheckedChange={(checked) =>
                    handleExperienceChange(level, checked as boolean)
                  }
                  className="text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-sm text-slate-700">{level}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Range */}
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="font-semibold text-slate-900">Salary Range</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {salaryRanges.map((range) => (
              <label key={range} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={selectedSalaryRanges.includes(range)}
                  onCheckedChange={(checked) =>
                    handleSalaryChange(range, checked as boolean)
                  }
                  className="text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-sm text-slate-700">{range}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Sources Filter */}
      {sources && sources.length > 0 && (
        <Card className="bg-white shadow-sm border border-slate-200">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-sm sm:text-base font-semibold text-slate-900">Job Sources</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {sources.map((source) => (
                <div key={source.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`source-${source.name}`}
                    checked={selectedSources.includes(source.name)}
                    onCheckedChange={(checked) => handleSourceChange(source.name, checked as boolean)}
                    className="text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <label
                    htmlFor={`source-${source.name}`}
                    className="text-xs sm:text-sm text-slate-700 cursor-pointer flex-1 flex justify-between"
                  >
                    <span>{source.name}</span>
                    <span className="text-slate-500">({source.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
