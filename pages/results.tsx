import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { motion, useInView } from 'framer-motion';
import Layout from '../components/Layout';
import SportIcons from '../components/SportIcons';
import ScrollAnimation from '../components/ScrollAnimation';
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
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 font-heading">
            Sports Results
          </h1>
          <motion.div 
            className="border-t-4 border-accent w-20 mx-auto mt-4 mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          ></motion.div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-body">
            Explore Australian college athletes by sport. Click on any sport to view detailed results and statistics.
          </p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div 
          className="bg-white rounded-xl p-6 mb-8 text-center shadow-md border-l-4 border-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="text-3xl font-bold text-primary font-heading group-hover:text-accent transition-colors duration-200">{sportCards.length}</div>
              <div className="text-gray-600 font-body">Sports Covered</div>
            </motion.div>
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="text-3xl font-bold text-primary font-heading group-hover:text-accent transition-colors duration-200">{athletes.length}</div>
              <div className="text-gray-600 font-body">Total Athletes</div>
            </motion.div>
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="text-3xl font-bold text-primary font-heading group-hover:text-accent transition-colors duration-200">
                {Math.round(athletes.length / sportCards.length)}
              </div>
              <div className="text-gray-600 font-body">Avg. Athletes per Sport</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sport Cards Grid */}
        {loading ? (
          <ScrollAnimation delay={0.2}>
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-gray-600 font-body">Loading sports...</p>
              </div>
            </div>
          </ScrollAnimation>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sportCards.map((sportCard, index) => (
              <ScrollAnimation
                key={sportCard.id}
                delay={index * 0.1}
                y={30}
              >
                <motion.div
                  onClick={() => handleSportClick(sportCard)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  <div className={`bg-gradient-to-br ${sportCard.color} rounded-2xl p-8 text-white h-full flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 rounded-full p-2">
                            <SportIcons sport={sportCard.name} size={24} className="text-white" />
                          </div>
                          <h3 className="text-2xl font-bold font-heading">{sportCard.name}</h3>
                        </div>
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
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-semibold text-sm">View Details</span>
                        <svg 
                          className="w-6 h-6 text-accent group-hover:translate-x-1 transition-transform duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white shadow-lg">
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