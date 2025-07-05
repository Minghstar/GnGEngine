import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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

export default function Profile({ athlete }: ProfileProps) {
  const router = useRouter();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

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
  
  // Get fallback values for missing data with improved messaging
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

  return (
    <Layout 
      title={`${displayName} - ${displaySport} - GNG Engine`}
      description={`Learn more about ${displayName}, a ${displaySport} athlete from ${displayCollege}. View their profile, achievements, and background.`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/directory" className="inline-flex items-center text-accent hover:text-primary-red font-heading transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Link>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3 flex items-center justify-center bg-background relative min-h-[260px] max-w-[250px] max-h-[250px]">
              {athlete.image ? (
                <Image
                  src={athlete.image}
                  alt={`${displayName} - ${displaySport} athlete`}
                  fill
                  className="object-cover rounded-l-2xl md:rounded-none md:rounded-l-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={(e) => {
                    // Fallback to initials if image fails to load
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
              
              {/* Fallback Avatar - Always present but hidden when image loads */}
              <div 
                className={`profile-fallback-avatar w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-red to-accent-blue ${athlete.image ? 'hidden' : ''}`}
              >
                <div className="text-white text-6xl font-bold font-heading">
                  {initials}
                </div>
              </div>
              
              {/* Low Res Badge */}
              {showLowResBadge && (
                <div className="absolute bottom-3 left-3">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold font-heading shadow">
                    Low Res
                  </span>
                </div>
              )}
            </div>
            {/* Info Section */}
            <div className="md:w-2/3 p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="bg-primary-red text-text-white px-3 py-1 rounded-full text-sm font-heading font-bold">
                  {displaySport}
                </span>
                <span className="flex items-center gap-1 text-lg font-heading text-charcoal">
                  {getFlagEmoji(displayNationality)}
                  <span className="text-base text-neutral-gray">{displayNationality}</span>
                </span>
                <span className="bg-charcoal-black text-text-white px-3 py-1 rounded-full text-xs font-heading">
                  Year {displayYear}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-heading mb-2">
                {displayName}
              </h1>
              <div className="space-y-2 font-body text-base text-text-secondary">
                <div><span className="font-bold text-charcoal">College:</span> {displayCollege}</div>
                <div><span className="font-bold text-charcoal">Hometown:</span> {displayHometown}</div>
                {athlete.division && athlete.division.division !== 'Unknown' && (
                  <div><span className="font-bold text-charcoal">Division:</span> {athlete.division.fullName}</div>
                )}
                {displayHighSchool && (
                  <div><span className="font-bold text-charcoal">High School:</span> {displayHighSchool}</div>
                )}
              </div>
              <div className="mt-4 space-y-3">
                <Button variant="primary" className="w-full md:w-auto">Scout This Athlete</Button>
                <Button 
                  variant="secondary" 
                  className="w-full md:w-auto"
                  onClick={() => setIsClaimModalOpen(true)}
                >
                  Is this you? Claim Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card>
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">
            About {displayName}
          </h2>
          {displayName !== 'Unnamed Athlete' && displayCollege !== 'College Unknown' ? (
            <p className="text-text-secondary leading-relaxed font-body">
              {displayName} is a talented {displaySport} athlete currently studying at {displayCollege}. 
              {displayHometown !== 'Hometown Unknown' && ` Originally from ${displayHometown},`} they are in their {displayYear} year of study.
              {displayHighSchool && ` They previously attended ${displayHighSchool}.`}
            </p>
          ) : (
            <p className="text-text-secondary leading-relaxed font-body italic">
              No bio information available.
            </p>
          )}
          {/* Future: Add stats, achievements, highlights here */}
          
          {/* View Counter */}
          <div className="mt-6 pt-4 border-t border-neutral-gray">
            <ViewCounter athleteId={athlete.id} />
          </div>
        </Card>

        {/* Share Section */}
        <Card>
          <ShareButtons 
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={`${displayName} - ${displaySport} Athlete`}
            description={`Check out ${displayName}, a ${displaySport} athlete from ${displayCollege}`}
          />
        </Card>

        {/* Claim Profile Modal */}
                <ClaimProfileModal 
          isOpen={isClaimModalOpen} 
          onClose={() => setIsClaimModalOpen(false)} 
          athleteName={displayName}
          athleteId={athlete.id}
          onVerificationSuccess={() => {
            // Refresh the page to show the verified badge
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

    return {
      props: {
        athlete,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching athlete for profile:', error);
    return {
      props: {
        athlete: null,
      },
      revalidate: 3600,
    };
  }
}; 