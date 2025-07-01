import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { fetchAthletes, fetchAthleteById, Athlete } from '../../utils/airtable';

interface ProfileProps {
  athlete: Athlete | null;
}

export default function Profile({ athlete }: ProfileProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Loading... - GNG Engine">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-aussie-green mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-gray-600">Loading athlete profile...</p>
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
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Athlete Not Found</h1>
            <p className="text-gray-600 mb-8">
              The athlete you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/directory"
              className="inline-block bg-aussie-green text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Back to Directory
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${athlete.name} - ${athlete.sport} - GNG Engine`}
      description={`Learn more about ${athlete.name}, a ${athlete.sport} athlete from ${athlete.college}. View their profile, achievements, and background.`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/directory"
            className="inline-flex items-center text-aussie-green hover:text-green-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3">
              <div className="relative h-64 md:h-full bg-gray-200">
                {athlete.image ? (
                  <Image
                    src={athlete.image}
                    alt={`${athlete.name} - ${athlete.sport}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-aussie-green to-green-700">
                    <div className="text-white text-6xl font-bold">
                      {athlete.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="md:w-2/3 p-6">
              <div className="mb-4">
                <span className="bg-aussie-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  {athlete.sport}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-montserrat">
                {athlete.name}
              </h1>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>College:</strong> {athlete.college}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Year:</strong> {athlete.year}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Hometown:</strong> {athlete.hometown}
                  </span>
                </div>
                
                {athlete.nationality && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">
                      <strong>Nationality:</strong> {athlete.nationality}
                    </span>
                  </div>
                )}
                
                {athlete.highSchool && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">
                      <strong>High School:</strong> {athlete.highSchool}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">
            About {athlete.name}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {athlete.name} is a talented {athlete.sport} athlete currently studying at {athlete.college}. 
            Originally from {athlete.hometown}, they are in their {athlete.year} year of study. 
            {athlete.highSchool && ` They previously attended ${athlete.highSchool}.`}
          </p>
        </div>
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