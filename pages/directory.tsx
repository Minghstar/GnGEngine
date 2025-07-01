import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import FilterBar, { FilterState } from '../components/FilterBar';
import AthleteCard from '../components/AthleteCard';
import { fetchAthletes, Athlete } from '../utils/airtable';

interface DirectoryProps {
  athletes: Athlete[];
}

export default function Directory({ athletes: initialAthletes }: DirectoryProps) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(initialAthletes);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = athletes;

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

    setFilteredAthletes(filtered);
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const freshAthletes = await fetchAthletes();
      setAthletes(freshAthletes);
      setFilteredAthletes(freshAthletes);
    } catch (error) {
      console.error('Error refreshing athletes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout 
      title="Athlete Directory - GNG Engine"
      description="Browse our comprehensive directory of Australian college athletes. Filter by sport, college, year, and nationality."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-montserrat">
            Athlete Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover talented Australian college athletes across all sports and universities. 
            Use the filters below to find exactly what you're looking for.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar athletes={athletes} onFilterChange={handleFilterChange} />

        {/* Refresh Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={refreshData}
            disabled={loading}
            className="px-6 py-2 bg-aussie-green text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredAthletes.length}</span> of{' '}
            <span className="font-semibold">{athletes.length}</span> athletes
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-aussie-green mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-600">Loading athletes...</p>
            </div>
          </div>
        )}

        {/* No Athletes Found */}
        {!loading && filteredAthletes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Athletes Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or check back later for new athletes.
            </p>
            <button
              onClick={() => {
                setFilteredAthletes(athletes);
                // Reset filters by triggering a filter change with empty values
                handleFilterChange({ sport: '', college: '', year: '', nationality: '' });
              }}
              className="px-6 py-2 bg-aussie-green text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Athletes Grid */}
        {!loading && filteredAthletes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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