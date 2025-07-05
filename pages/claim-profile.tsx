import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import AthleteCard from '../components/AthleteCard';
import ClaimProfileModal from '../components/ClaimProfileModal';
import ScrollAnimation from '../components/ScrollAnimation';
import TextReveal from '../components/TextReveal';
import { fetchAthletes, Athlete } from '../utils/airtable';

interface ClaimProfileProps {
  athletes: Athlete[];
}

export default function ClaimProfile({ athletes: initialAthletes }: ClaimProfileProps) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(initialAthletes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredAthletes(athletes);
      return;
    }

    const search = query.toLowerCase();
    const filtered = athletes.filter(
      athlete =>
        athlete.name.toLowerCase().includes(search) ||
        athlete.college.toLowerCase().includes(search) ||
        athlete.hometown.toLowerCase().includes(search) ||
        athlete.sport.toLowerCase().includes(search)
    );
    setFilteredAthletes(filtered);
  };

  const handleClaimProfile = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setIsClaimModalOpen(true);
  };

  const handleVerificationSuccess = () => {
    // Refresh the athletes list to show updated verification status
    window.location.reload();
  };

  return (
    <Layout 
      title="Claim Your Profile - GNG Engine"
      description="Find and claim your athlete profile on GNG Engine. Search for your name, college, or hometown to locate your profile."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <ScrollAnimation delay={0.2}>
          <div className="text-center mb-10">
            <TextReveal 
              type="word"
              delay={0.3}
              stagger={0.1}
              className="text-4xl md:text-5xl font-bold text-text mb-4 font-heading"
            >
              Claim Your Profile
            </TextReveal>
            <motion.div 
              className="border-t-4 border-accent w-20 mx-auto mt-4 mb-6"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            ></motion.div>
            <TextReveal 
              type="line"
              delay={0.7}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-body"
            >
              Is your profile listed on GNG Engine? Search for your name, college, or hometown below 
              and claim your profile to verify your identity and take control of your information.
            </TextReveal>
          </div>
        </ScrollAnimation>

        {/* Search Section */}
        <ScrollAnimation delay={0.4}>
          <div className="mb-8">
            <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-accent">
              <h2 className="text-xl font-bold text-text mb-4 font-heading">Find Your Profile</h2>
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search by name, college, hometown, or sport..."
              />
              <p className="text-sm text-gray-600 mt-3 font-body">
                Try searching for your name, your college, or your hometown to find your profile.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 font-body">
            Found <span className="font-semibold text-text">{filteredAthletes.length}</span> athletes
            {searchQuery && (
              <span className="ml-2 text-sm text-accent font-medium">
                • Searching for "{searchQuery}"
              </span>
            )}
          </p>
        </div>

        {/* No Results */}
        {searchQuery && filteredAthletes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text mb-2 font-heading">No Profiles Found</h3>
            <p className="text-gray-600 mb-4 font-body">
              We couldn't find any profiles matching your search. Try different search terms or contact us if you believe your profile should be listed.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-body">
                • Try searching by just your first or last name
              </p>
              <p className="text-sm text-gray-500 font-body">
                • Search by your college name
              </p>
              <p className="text-sm text-gray-500 font-body">
                • Search by your hometown
              </p>
            </div>
          </div>
        )}

        {/* Athletes Grid */}
        {filteredAthletes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAthletes.map((athlete, index) => (
              <ScrollAnimation
                key={athlete.id}
                delay={index * 0.05}
                y={20}
              >
                <div className="relative">
                  <AthleteCard athlete={athlete} />
                  <motion.button
                    onClick={() => handleClaimProfile(athlete)}
                    className="absolute bottom-4 left-4 right-4 bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Claim This Profile
                  </motion.button>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        )}

        {/* Claim Modal */}
        {selectedAthlete && (
          <ClaimProfileModal 
            isOpen={isClaimModalOpen} 
            onClose={() => {
              setIsClaimModalOpen(false);
              setSelectedAthlete(null);
            }} 
            athleteName={selectedAthlete.name}
            athleteId={selectedAthlete.id}
            onVerificationSuccess={handleVerificationSuccess}
          />
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
    console.error('Error fetching athletes for claim page:', error);
    return {
      props: {
        athletes: [],
      },
      revalidate: 3600,
    };
  }
}; 