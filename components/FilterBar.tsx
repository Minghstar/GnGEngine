import { useState, useEffect } from 'react';
import { Athlete } from '../utils/airtable';

interface FilterBarProps {
  athletes: Athlete[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  sport: string;
  college: string;
  year: string;
  nationality: string;
}

const FilterBar = ({ athletes, onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sport: '',
    college: '',
    year: '',
    nationality: '',
  });

  const [uniqueValues, setUniqueValues] = useState({
    sports: [] as string[],
    colleges: [] as string[],
    years: [] as string[],
    nationalities: [] as string[],
  });

  useEffect(() => {
    const sports = Array.from(new Set(athletes.map(a => a.sport))).sort();
    const colleges = Array.from(new Set(athletes.map(a => a.college))).sort();
    const years = Array.from(new Set(athletes.map(a => a.year))).sort();
    const nationalities = Array.from(new Set(athletes.map(a => a.nationality || 'Australian'))).sort();

    setUniqueValues({
      sports,
      colleges,
      years,
      nationalities,
    });
  }, [athletes]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      sport: '',
      college: '',
      year: '',
      nationality: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Filter Athletes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sport Filter */}
          <div>
            <label htmlFor="sport-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Sport
            </label>
            <select
              id="sport-filter"
              value={filters.sport}
              onChange={(e) => handleFilterChange('sport', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aussie-green focus:border-transparent"
            >
              <option value="">All Sports</option>
              {uniqueValues.sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* College Filter */}
          <div>
            <label htmlFor="college-filter" className="block text-sm font-medium text-gray-700 mb-1">
              College
            </label>
            <select
              id="college-filter"
              value={filters.college}
              onChange={(e) => handleFilterChange('college', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aussie-green focus:border-transparent"
            >
              <option value="">All Colleges</option>
              {uniqueValues.colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="year-filter"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aussie-green focus:border-transparent"
            >
              <option value="">All Years</option>
              {uniqueValues.years.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          </div>

          {/* Nationality Filter */}
          <div>
            <label htmlFor="nationality-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <select
              id="nationality-filter"
              value={filters.nationality}
              onChange={(e) => handleFilterChange('nationality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aussie-green focus:border-transparent"
            >
              <option value="">All Nationalities</option>
              {uniqueValues.nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar; 