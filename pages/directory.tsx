import { useState, useEffect, useCallback } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import FilterBar, { FilterState } from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import AthleteCard from '../components/AthleteCard';
import { fetchAthletes, Athlete } from '../utils/airtable';

interface DirectoryProps {
  athletes: Athlete[];
}

export default function Directory({ athletes: initialAthletes }: DirectoryProps) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(initialAthletes);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = athletes;
    
    // Apply search filter
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      filtered = filtered.filter(
        athlete =>
          athlete.name.toLowerCase().includes(search) ||
          athlete.college.toLowerCase().includes(search) ||
          athlete.hometown.toLowerCase().includes(search)
      );
    }
    
    // Apply other filters
    if (filters.sport) {
      filtered = filtered.filter(athlete => athlete.sport === filters.sport);
    }
    if (filters.college) {
      filtered = filtered.filter(athlete => athlete.college === filters.college);
    }
    if (filters.year) {
      filtered = filtered.filter(athlete => athlete.year === filters.year);
    }
    if (filters.nationality) {
      filtered = filtered.filter(athlete => (athlete.nationality || 'Australian') === filters.nationality);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        athlete =>
          athlete.name.toLowerCase().includes(search) ||
          (athlete.college && athlete.college.toLowerCase().includes(search))
      );
    }
    setFilteredAthletes(filtered);
  };

  const refreshData = async () => {
    setLoading(true);
    setRefreshError(null);
    try {
      const freshAthletes = await fetchAthletes();
      
      if (freshAthletes.length === 0) {
        setRefreshError('No athletes found. Please check your connection and try again.');
        return;
      }
      
      setAthletes(freshAthletes);
      
      // Preserve current filter state by re-applying filters to fresh data
      let filtered = freshAthletes;
      
      // Apply search filter
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        filtered = filtered.filter(
          athlete =>
            athlete.name.toLowerCase().includes(search) ||
            athlete.college.toLowerCase().includes(search) ||
            athlete.hometown.toLowerCase().includes(search)
        );
      }
      
      setFilteredAthletes(filtered);
    } catch (error) {
      console.error('Error refreshing athletes:', error);
      setRefreshError('Failed to refresh data. Please try again.');
      // If refresh fails, keep the current data
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout 
      title="Athlete Directory - GNG Engine"
      description="Browse our comprehensive directory of Australian college athletes. Filter by sport, college, year, and nationality."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 font-heading">
            Athlete Directory
          </h1>
          <div className="border-t-4 border-accent w-20 mx-auto mt-4 mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-body">
            Discover talented Australian college athletes across all sports and universities. 
            Use the filters below to find exactly what you're looking for.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter Bar */}
        <FilterBar athletes={athletes} onFilterChange={handleFilterChange} />

        {/* Refresh Button and Error Display */}
        <div className="flex justify-between items-center mb-6">
          {refreshError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded font-body">
              {refreshError}
            </div>
          )}
          <button
            onClick={refreshData}
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-heading shadow-md"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </>
            )}
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 font-body">
            Showing <span className="font-semibold text-text">{filteredAthletes.length}</span> of{' '}
            <span className="font-semibold text-text">{athletes.length}</span> athletes
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-600 font-body">Loading athletes...</p>
            </div>
          </div>
        )}

        {/* No Athletes Found */}
        {!loading && filteredAthletes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text mb-2 font-heading">No Athletes Found</h3>
            <p className="text-gray-600 mb-4 font-body">
              Try adjusting your filters or check back later for new athletes.
            </p>
            <button
              onClick={() => {
                setFilteredAthletes(athletes);
                handleFilterChange({ sport: '', college: '', year: '', nationality: '', search: '' });
              }}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-heading shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Athletes Grid */}
        {!loading && filteredAthletes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAthletes.map((athlete) => (
              <AthleteCard key={athlete.id} athlete={athlete} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const athletes = await fetchAthletes();
    return {
      props: {
        athletes,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching athletes for directory:', error);
    return {
      props: {
        athletes: [],
      },
      revalidate: 3600,
    };
  }
}; 