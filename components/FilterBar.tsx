import { useState, useEffect } from 'react';
import { Athlete } from '../utils/airtable';
import { getAllDivisions } from '../utils/divisionMapping';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import SportIcons from './SportIcons';

interface FilterBarProps {
  athletes: Athlete[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  sport: string;
  college: string;
  year: string;
  nationality: string;
  division: string;
  search: string;
}

const FilterBar = ({ athletes, onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sport: '',
    college: '',
    year: '',
    nationality: '',
    division: '',
    search: '',
  });

  const [uniqueValues, setUniqueValues] = useState({
    sports: [] as string[],
    colleges: [] as string[],
    years: [] as string[],
    nationalities: [] as string[],
    divisions: [] as string[],
  });

  useEffect(() => {
    const sports = Array.from(new Set(athletes.map(a => a.sport))).sort();
    const colleges = Array.from(new Set(athletes.map(a => a.college))).sort();
    const years = Array.from(new Set(athletes.map(a => a.year))).sort();
    const nationalities = Array.from(new Set(athletes.map(a => a.nationality || 'Australian'))).sort();
    const divisions = Array.from(new Set(athletes.map(a => a.division?.division || 'Unknown'))).sort();
    setUniqueValues({ sports, colleges, years, nationalities, divisions });
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
      division: '',
      search: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border-l-4 border-accent">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 flex-1">
          {/* Sport Filter */}
          <div>
            <label htmlFor="sport-filter" className="block text-xs font-medium text-text-main mb-1 font-heading">
              Sport
            </label>
            <Select
              id="sport-filter"
              value={filters.sport}
              onChange={e => handleFilterChange('sport', e.target.value)}
            >
              <option value="">All Sports</option>
              {uniqueValues.sports.map(sport => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </Select>
          </div>
          {/* Nationality Filter */}
          <div>
            <label htmlFor="nationality-filter" className="block text-xs font-medium text-text-main mb-1 font-heading">
              Nationality
            </label>
            <Select
              id="nationality-filter"
              value={filters.nationality}
              onChange={e => handleFilterChange('nationality', e.target.value)}
            >
              <option value="">All Nationalities</option>
              {uniqueValues.nationalities.map(nationality => (
                <option key={nationality} value={nationality}>{nationality}</option>
              ))}
            </Select>
          </div>
          {/* Year Filter */}
          <div>
            <label htmlFor="year-filter" className="block text-xs font-medium text-text-main mb-1 font-heading">
              Graduation Year
            </label>
            <Select
              id="year-filter"
              value={filters.year}
              onChange={e => handleFilterChange('year', e.target.value)}
            >
              <option value="">All Years</option>
              {uniqueValues.years.map(year => (
                <option key={year} value={year}>Year {year}</option>
              ))}
            </Select>
          </div>
          {/* College Filter */}
          <div>
            <label htmlFor="college-filter" className="block text-xs font-medium text-text-main mb-1 font-heading">
              College
            </label>
            <Select
              id="college-filter"
              value={filters.college}
              onChange={e => handleFilterChange('college', e.target.value)}
            >
              <option value="">All Colleges</option>
              {uniqueValues.colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </Select>
          </div>
          {/* Division Filter */}
          <div>
            <label htmlFor="division-filter" className="block text-xs font-medium text-text-main mb-1 font-heading">
              Division
            </label>
            <Select
              id="division-filter"
              value={filters.division}
              onChange={e => handleFilterChange('division', e.target.value)}
            >
              <option value="">All Divisions</option>
              {uniqueValues.divisions.map(division => (
                <option key={division} value={division}>{division}</option>
              ))}
            </Select>
          </div>
          {/* Search Bar */}
          <div>
            <label htmlFor="search-bar" className="block text-xs font-medium text-text-main mb-1 font-heading">
              Search
            </label>
            <Input
              id="search-bar"
              type="text"
              placeholder="Name or College"
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2 lg:mt-0">
          <Button variant="secondary" onClick={clearFilters} type="button">Clear Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 