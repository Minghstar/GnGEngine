import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ShareButtons from '../../components/ShareButtons';
import ClaimProfileModal from '../../components/ClaimProfileModal';
import ViewCounter from '../../components/ViewCounter';
import { fetchAthletes, fetchAthleteById, Athlete } from '../../utils/airtable';
import { 
  validateAthlete, 
  getDisplayName, 
  getDisplayCollege, 
  getDisplayHometown, 
  getDisplaySport, 
  getDisplayYear, 
  getFallbackValue,
  getInitials,
  shouldShowLowResBadge 
} from '../../utils/athleteValidation';

interface ProfileProps {
  athlete: Athlete | null;
}

// Helper to get flag emoji from nationality string
function getFlagEmoji(nationality: string) {
  if (!nationality) return '🇦🇺';
  if (nationality.toLowerCase().includes('austral')) return '🇦🇺';
  if (nationality.toLowerCase().includes('new zealand')) return '🇳🇿';
  // Add more as needed
  return '🏳️';
}

// Helper to get sport color for glow effect
function getSportColor(sport: string): string {
  const sportColors: { [key: string]: string } = {
    'Tennis': 'from-green-400 to-green-600',
    'Basketball': 'from-orange-400 to-orange-600',
    'Soccer': 'from-blue-400 to-blue-600',
    'Swimming': 'from-cyan-400 to-cyan-600',
    'Track': 'from-purple-400 to-purple-600',
    'Golf': 'from-emerald-400 to-emerald-600',
    'Volleyball': 'from-red-400 to-red-600',
    'Baseball': 'from-yellow-400 to-yellow-600',
    'Softball': 'from-pink-400 to-pink-600',
    'Lacrosse': 'from-indigo-400 to-indigo-600',
  };
  return sportColors[sport] || 'from-accent to-accent/80';
}

// Helper to get division color
function getDivisionColor(division: string): string {
  const divisionColors: { [key: string]: string } = {
    'D1': 'from-red-500 to-red-700',
    'D2': 'from-blue-500 to-blue-700',
    'D3': 'from-green-500 to-green-700',
    'NAIA': 'from-purple-500 to-purple-700',
    'NJCAA': 'from-orange-500 to-orange-700',
  };
  return divisionColors[division] || 'from-gray-500 to-gray-700';
}

export default function Profile({ athlete }: ProfileProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // Define ownership and verification logic
  const userIsOwner = 
    user?.publicMetadata?.role === "athlete" &&
    athlete?.claimedStatus === "Claimed" &&
    user?.primaryEmailAddress?.emailAddress === athlete?.claimedByEmail;

  const isVerified = athlete?.verifiedStatus === "Verified";

  if (router.isFallback) {
    return (
      <Layout title="Loading... - GNG Engine">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-accent mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-text-secondary font-body">Loading athlete profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!athlete) {
    return (
      <Layout title="Athlete Not Found - GNG Engine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-neutral-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-4 font-heading">Athlete Not Found</h1>
            <p className="text-text-secondary mb-8 font-body">
              The athlete you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/directory" className="inline-block">
              <Button variant="primary">Back to Directory</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Validate athlete data
  const validatedAthlete = validateAthlete(athlete);
  
  // Get fallback values for missing data
  const displayName = getDisplayName(athlete.name);
  const displayCollege = getDisplayCollege(athlete.college);
  const displaySport = getDisplaySport(athlete.sport);
  const displayYear = getDisplayYear(athlete.year);
  const displayHometown = getDisplayHometown(athlete.hometown);
  const displayNationality = getFallbackValue(athlete.nationality, 'Australian');
  const displayHighSchool = athlete.highSchool ? athlete.highSchool : null;
  
  // Get initials for fallback avatar
  const initials = getInitials(displayName);
  
  // Check if image is low resolution
  const showLowResBadge = shouldShowLowResBadge(athlete.image);

  // Mock data for results timeline and AI summary
  const mockResults = [
    { date: '2024-03-15', event: 'Conference Championship', result: 'W', score: '6-2, 6-1', opponent: 'Stanford' },
    { date: '2024-03-10', event: 'Regular Season Match', result: 'W', score: '7-5, 6-3', opponent: 'UCLA' },
    { date: '2024-03-05', event: 'Tournament Quarterfinal', result: 'L', score: '4-6, 6-4, 3-6', opponent: 'USC' },
    { date: '2024-02-28', event: 'Regular Season Match', result: 'W', score: '6-2, 6-0', opponent: 'Cal Berkeley' },
  ];

  const aiSummary = `A rising star in collegiate tennis, ${displayName} has demonstrated exceptional skill and determination throughout their career. Known for their powerful serve and strategic gameplay, they've consistently performed at a high level in competitive matches. Their dedication to both academics and athletics exemplifies the true student-athlete spirit.`;

  return (
    <Layout 
      title={`${displayName} - ${displaySport} - GNG Engine`}
      description={`Learn more about ${displayName}, a ${displaySport} athlete from ${displayCollege}. View their profile, achievements, and background.`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/directory" className="inline-flex items-center text-accent hover:text-primary-red font-heading transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Link>
        </div>

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image and Basic Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile Image */}
            <div className="relative">
              <div className={`relative w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl bg-gradient-to-br ${getSportColor(displaySport)} p-1`}>
                {athlete.image ? (
                  <Image
                    src={athlete.image}
                    alt={`${displayName} - ${displaySport} athlete`}
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallbackDiv = parent.querySelector('.profile-fallback-avatar') as HTMLElement;
                        if (fallbackDiv) {
                          fallbackDiv.style.display = 'flex';
                        }
                      }
                    }}
                  />
                ) : null}
                
                {/* Fallback Avatar */}
                <div 
                  className={`profile-fallback-avatar w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-red to-accent-blue ${athlete.image ? 'hidden' : ''}`}
                >
                  <div className="text-white text-8xl font-bold font-heading">
                    {initials}
                  </div>
                </div>
              </div>
              
              {/* Low Res Badge */}
              {showLowResBadge && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold font-heading shadow">
                    Low Res
                  </span>
                </div>
              )}
            </div>

            {/* Basic Info Cards */}
            <div className="space-y-4">
              {/* School Card */}
              <Card className="p-6 border-l-4 border-accent">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 font-heading">School</h3>
                    <p className="text-lg font-bold text-text font-heading">{displayCollege}</p>
                  </div>
                </div>
              </Card>

              {/* Year Card */}
              <Card className="p-6 border-l-4 border-primary">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 font-heading">Class Year</h3>
                    <p className="text-lg font-bold text-text font-heading">{displayYear}</p>
                  </div>
                </div>
              </Card>

              {/* Division Card */}
              {athlete.division && athlete.division.division !== 'Unknown' && (
                <Card className="p-6 border-l-4 border-accent">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getDivisionColor(athlete.division.division)} rounded-full flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 font-heading">Division</h3>
                      <p className="text-lg font-bold text-text font-heading">{athlete.division.fullName}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Nationality Card */}
              <Card className="p-6 border-l-4 border-accent">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{getFlagEmoji(displayNationality)}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 font-heading">Nationality</h3>
                    <p className="text-lg font-bold text-text font-heading">{displayNationality}</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Right Column - Name, Sport, Verified Badge */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name and Sport */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-4xl md:text-5xl font-bold text-text font-heading">
                  {displayName}
                </h1>
                {isVerified && (
                  <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <motion.span 
                      className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold shadow relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      title={`Verified on ${athlete.verifiedAt ? new Date(athlete.verifiedAt).toLocaleDateString() : 'Unknown date'}`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'easeInOut'
                        }}
                      />
                      <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </motion.span>
                  </motion.div>
                )}
              </div>
              
              {/* Edit Button for Owners */}
              {userIsOwner && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    onClick={() => router.push(`/profile/${athlete.id}/edit`)}
                    className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit My Info
                  </Button>
                </motion.div>
              )}
              
              <div className="flex items-center space-x-4">
                <span className={`bg-gradient-to-r ${getSportColor(displaySport)} text-white px-6 py-3 rounded-full text-lg font-bold font-heading shadow-lg`}>
                  {displaySport}
                </span>
                <span className="text-2xl">{getFlagEmoji(displayNationality)}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-text mb-4 font-heading">Profile Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Hometown:</span>
                    <span className="font-semibold text-text font-body">{displayHometown}</span>
                  </div>
                  {displayHighSchool && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-body">High School:</span>
                      <span className="font-semibold text-text font-body">{displayHighSchool}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Nationality:</span>
                    <span className="font-semibold text-text font-body">{displayNationality}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Athlete
              </Button>
              {!athlete.isVerified && (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setIsClaimModalOpen(true)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Claim This Profile
                </Button>
              )}
            </div>

            {/* Share Buttons */}
            <div className="pt-4">
              <ShareButtons 
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title={`${displayName} - ${displaySport} Athlete`}
                description={`Check out ${displayName}'s profile on GNG Engine`}
              />
            </div>
          </motion.div>
        </div>

        {/* Animated Gold Divider */}
        <motion.div 
          className="relative my-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Results Timeline Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text font-heading">Recent Results</h2>
            <button
              onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
              className="text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              {isTimelineExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          
          <div className="space-y-4">
            {mockResults.slice(0, isTimelineExpanded ? mockResults.length : 2).map((result, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text font-heading">{result.event}</h3>
                    <p className="text-sm text-gray-600 font-body">{new Date(result.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      result.result === 'W' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.result}
                    </span>
                    <p className="text-sm text-gray-600 mt-1 font-body">{result.score}</p>
                    <p className="text-xs text-gray-500 font-body">vs {result.opponent}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Summary Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="text-2xl font-bold text-text mb-6 font-heading">About This Athlete</h2>
          <Card className="p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {aiSummary}
            </motion.p>
          </Card>
        </motion.div>

        {/* View Counter */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ViewCounter athleteId={athlete.id} />
        </motion.div>

        {/* Claim Modal */}
        <ClaimProfileModal 
          isOpen={isClaimModalOpen} 
          onClose={() => setIsClaimModalOpen(false)} 
          athleteName={displayName}
          athleteId={athlete.id}
          onVerificationSuccess={() => {
            window.location.reload();
          }}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const athletes = await fetchAthletes();
    const paths = athletes.map((athlete) => ({
      params: { id: athlete.id },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const athleteId = params?.id as string;
    const athlete = await fetchAthleteById(athleteId);

    if (!athlete) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        athlete,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching athlete:', error);
    return {
      notFound: true,
    };
  }
}; 