import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { fetchAthletes, Athlete } from '../utils/airtable';

interface SportCard {
  id: string;
  name: string;
  description: string;
  athleteCount: number;
  image?: string;
  color: string;
}

interface ResultsProps {
  athletes: Athlete[];
}

export default function Results({ athletes: initialAthletes }: ResultsProps) {
  const [athletes] = useState<Athlete[]>(initialAthletes);
  const [sportCards, setSportCards] = useState<SportCard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate sport cards from athlete data
    const generateSportCards = () => {
      const sportCounts = athletes.reduce((acc, athlete) => {
        acc[athlete.sport] = (acc[athlete.sport] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const sportDescriptions: Record<string, string> = {
        'Football': 'American football athletes competing at the collegiate level',
        'Basketball': 'Basketball players representing their universities',
        'Soccer': 'Soccer players in collegiate competition',
        'Tennis': 'Tennis athletes competing in NCAA tournaments',
        'Swimming': 'Swimming and diving athletes',
        'Track and Field': 'Track and field athletes',
        'Baseball': 'Baseball players in collegiate leagues',
        'Volleyball': 'Volleyball athletes',
        'Golf': 'Golf athletes competing at collegiate level',
        'Lacrosse': 'Lacrosse players in collegiate competition',
        'Hockey': 'Ice hockey athletes',
        'Rowing': 'Rowing athletes',
        'Cross Country': 'Cross country runners',
        'Wrestling': 'Wrestling athletes',
        'Softball': 'Softball players',
        'Field Hockey': 'Field hockey athletes',
        'Water Polo': 'Water polo athletes',
        'Rugby': 'Rugby athletes',
        'Cricket': 'Cricket athletes',
        'Other': 'Other sports athletes'
      };

      const sportColors: Record<string, string> = {
        'Football': 'from-red-600 to-red-800',
        'Basketball': 'from-orange-500 to-orange-700',
        'Soccer': 'from-green-500 to-green-700',
        'Tennis': 'from-yellow-500 to-yellow-700',
        'Swimming': 'from-blue-500 to-blue-700',
        'Track and Field': 'from-purple-500 to-purple-700',
        'Baseball': 'from-indigo-500 to-indigo-700',
        'Volleyball': 'from-pink-500 to-pink-700',
        'Golf': 'from-emerald-500 to-emerald-700',
        'Lacrosse': 'from-teal-500 to-teal-700',
        'Hockey': 'from-gray-600 to-gray-800',
        'Rowing': 'from-cyan-500 to-cyan-700',
        'Cross Country': 'from-amber-500 to-amber-700',
        'Wrestling': 'from-slate-600 to-slate-800',
        'Softball': 'from-rose-500 to-rose-700',
        'Field Hockey': 'from-lime-500 to-lime-700',
        'Water Polo': 'from-sky-500 to-sky-700',
        'Rugby': 'from-violet-500 to-violet-700',
        'Cricket': 'from-fuchsia-500 to-fuchsia-700',
        'Other': 'from-neutral-500 to-neutral-700'
      };

      const cards: SportCard[] = Object.entries(sportCounts).map(([sport, count]) => ({
        id: sport.toLowerCase().replace(/\s+/g, '-'),
        name: sport,
        description: sportDescriptions[sport] || `${sport} athletes`,
        athleteCount: count,
        color: sportColors[sport] || 'from-gray-500 to-gray-700'
      }));

      setSportCards(cards.sort((a, b) => b.athleteCount - a.athleteCount));
    };

    generateSportCards();
  }, [athletes]);

  const handleSportClick = (sportCard: SportCard) => {
    // Navigate to the detailed sport page
    window.location.href = `/sport/${sportCard.id}`;
  };

  return (
    <Layout 
      title="Sports Results - GNG Engine"
      description="Explore Australian college athletes by sport. Browse comprehensive results across all NCAA sports."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 font-heading">
            Sports Results
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Explore Australian college athletes by sport. Click on any sport to view detailed results and statistics.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="bg-charcoal-black rounded-xl p-6 mb-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-red font-heading">{sportCards.length}</div>
              <div className="text-neutral-gray font-body">Sports Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-red font-heading">{athletes.length}</div>
              <div className="text-neutral-gray font-body">Total Athletes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-red font-heading">
                {Math.round(athletes.length / sportCards.length)}
              </div>
              <div className="text-neutral-gray font-body">Avg. Athletes per Sport</div>
            </div>
          </div>
        </div>

        {/* Sport Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-accent mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-text-secondary font-body">Loading sports...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sportCards.map((sportCard) => (
              <div
                key={sportCard.id}
                onClick={() => handleSportClick(sportCard)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${sportCard.color} rounded-2xl p-8 text-white h-full flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold font-heading">{sportCard.name}</h3>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                        {sportCard.athleteCount} athletes
                      </div>
                    </div>
                    <p className="text-white/90 font-body mb-6">
                      {sportCard.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-white/80 text-sm font-body">
                      Click to view details
                    </div>
                    <svg 
                      className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary-red to-accent-blue rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold font-heading mb-4">
              Detailed Sport Pages Coming Soon
            </h3>
            <p className="text-white/90 font-body mb-6">
              We're working on detailed sport-specific pages with comprehensive statistics, 
              performance data, and advanced filtering options.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Performance Stats</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Season Records</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Team Rankings</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Advanced Filters</span>
            </div>
          </div>
        </div>
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
    console.error('Error fetching athletes for results page:', error);
    return {
      props: {
        athletes: [],
      },
      revalidate: 3600,
    };
  }
}; 