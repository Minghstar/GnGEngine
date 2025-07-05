import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import AthleteCard from '../../components/AthleteCard';
import SportIcons from '../../components/SportIcons';
import { fetchAthletes, Athlete } from '../../utils/airtable';

interface SportPageProps {
  athletes: Athlete[];
  sportName: string;
  sportStats: {
    totalAthletes: number;
    colleges: string[];
    years: string[];
  };
}

export default function SportPage({ athletes, sportName, sportStats }: SportPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title={`Loading ${sportName} - GNG Engine`}>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-accent mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-text-secondary font-body">Loading sport details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${sportName} Athletes - GNG Engine`}
      description={`Discover Australian ${sportName} athletes competing in U.S. college sports. Browse profiles, stats, and performance data.`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-accent hover:text-accent-blue transition-colors font-body"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Results
          </button>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full p-3 border-2 border-accent/30">
              <SportIcons sport={sportName} size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text font-heading">
              {sportName} Athletes
            </h1>
          </div>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Discover Australian {sportName.toLowerCase()} athletes competing at the collegiate level.
          </p>
        </div>

        {/* Sport Stats */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md border-l-4 border-accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-primary font-heading group-hover:text-accent transition-colors duration-200">{sportStats.totalAthletes}</div>
              <div className="text-gray-600 font-body">Total Athletes</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary font-heading group-hover:text-accent transition-colors duration-200">{sportStats.colleges.length}</div>
              <div className="text-gray-600 font-body">Colleges</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary font-heading group-hover:text-accent transition-colors duration-200">{sportStats.years.length}</div>
              <div className="text-gray-600 font-body">Class Years</div>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold font-heading mb-3">
              Detailed {sportName} Statistics Coming Soon
            </h3>
            <p className="text-white/90 font-body mb-4">
              We're working on comprehensive {sportName.toLowerCase()} statistics including performance metrics, 
              season records, team rankings, and advanced analytics.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Performance Stats</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Season Records</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Team Rankings</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Advanced Analytics</span>
            </div>
          </div>
        </div>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {athletes.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>

        {/* No Athletes Found */}
        {athletes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text mb-2 font-heading">No {sportName} Athletes Found</h3>
            <p className="text-gray-600 mb-4 font-body">
              No athletes found for {sportName}. Check back later or browse other sports.
            </p>
            <button
              onClick={() => router.push('/results')}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-heading shadow-md"
            >
              Browse All Sports
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const athletes = await fetchAthletes();
    const sports = [...new Set(athletes.map(athlete => athlete.sport))];
    
    const paths = sports.map((sport) => ({
      params: { id: sport.toLowerCase().replace(/\s+/g, '-') },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating sport paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const athletes = await fetchAthletes();
    const sportId = params?.id as string;
    
    // Find the sport name from the ID
    const sportName = athletes.find(athlete => 
      athlete.sport.toLowerCase().replace(/\s+/g, '-') === sportId
    )?.sport || 'Unknown Sport';
    
    // Filter athletes by sport
    const sportAthletes = athletes.filter(athlete => athlete.sport === sportName);
    
    // Calculate sport stats
    const colleges = [...new Set(sportAthletes.map(athlete => athlete.college))];
    const years = [...new Set(sportAthletes.map(athlete => athlete.year))];
    
    const sportStats = {
      totalAthletes: sportAthletes.length,
      colleges,
      years,
    };

    return {
      props: {
        athletes: sportAthletes,
        sportName,
        sportStats,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching sport data:', error);
    return {
      props: {
        athletes: [],
        sportName: 'Unknown Sport',
        sportStats: {
          totalAthletes: 0,
          colleges: [],
          years: [],
        },
      },
      revalidate: 3600,
    };
  }
}; 