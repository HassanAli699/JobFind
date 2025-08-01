import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useJobCategories, useJobStats } from '@/hooks/useJobs';

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedExperienceLevels: string[];
  selectedSalaryRanges: string[];
  onCategoriesChange: (categories: string[]) => void;
  onExperienceLevelsChange: (levels: string[]) => void;
  onSalaryRangesChange: (ranges: string[]) => void;
}

const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Executive'
];

const salaryRanges = [
  '$40k - $60k',
  '$60k - $80k',
  '$80k - $120k',
  '$120k+'
];

export default function FilterSidebar({
  selectedCategories,
  selectedExperienceLevels,
  selectedSalaryRanges,
  onCategoriesChange,
  onExperienceLevelsChange,
  onSalaryRangesChange
}: FilterSidebarProps) {
  const { data: categories, isLoading: categoriesLoading } = useJobCategories();
  const { data: stats, isLoading: statsLoading } = useJobStats();

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, categoryName]);
    } else {
      onCategoriesChange(selectedCategories.filter(c => c !== categoryName));
    }
  };

  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      onExperienceLevelsChange([...selectedExperienceLevels, level]);
    } else {
      onExperienceLevelsChange(selectedExperienceLevels.filter(l => l !== level));
    }
  };

  const handleSalaryRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      onSalaryRangesChange([...selectedSalaryRanges, range]);
    } else {
      onSalaryRangesChange(selectedSalaryRanges.filter(r => r !== range));
    }
  };

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Job Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {statsLoading ? (
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
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Jobs</span>
                <span className="font-medium">{stats?.totalJobs.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Remote</span>
                <span className="font-medium text-accent">{stats?.remoteJobs.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">This Week</span>
                <span className="font-medium">{stats?.newJobs || 0}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categoriesLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-6" />
              </div>
            ))
          ) : (
            categories?.filter(cat => cat.count > 0).map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.name, checked as boolean)
                    }
                  />
                  <span className="text-sm text-slate-700">{category.name}</span>
                </div>
                <span className="text-xs text-slate-500">{category.count}</span>
              </label>
            ))
          )}
          <Button variant="link" size="sm" className="p-0 h-auto text-primary">
            View all categories
          </Button>
        </CardContent>
      </Card>

      {/* Experience Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Experience Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={selectedExperienceLevels.includes(level)}
                onCheckedChange={(checked) => 
                  handleExperienceLevelChange(level, checked as boolean)
                }
              />
              <span className="text-sm text-slate-700">{level}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Salary Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Salary Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {salaryRanges.map((range) => (
            <label key={range} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={selectedSalaryRanges.includes(range)}
                onCheckedChange={(checked) => 
                  handleSalaryRangeChange(range, checked as boolean)
                }
              />
              <span className="text-sm text-slate-700">{range}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
