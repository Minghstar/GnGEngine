import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { fetchAthletes } from '../utils/airtable';
import { Athlete } from '../utils/airtable';

interface HomeProps {
  athleteCount: number;
}

export default function Home({ athleteCount }: HomeProps) {
  return (
    <Layout 
      title="GNG Engine - Home"
      description="Discover Australia's rising athletes. Powered by AI. GNG Engine finds, verifies, and showcases Aussie talent in U.S. college sports."
    >
      {/* Hero Section */}
      <section className="bg-dark min-h-screen flex items-center">
        <div className="max-w-screen-xl mx-auto px-8 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-light-gray rounded-full text-sm text-gray-300">
                  <span className="w-2 h-2 bg-accent-blue rounded-full mr-2"></span>
                  Powered by AI • Real-time Data
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white font-space-grotesk leading-tight">
                  Discover Australia's{' '}
                  <span className="bg-gradient-to-r from-accent-blue to-accent-rose bg-clip-text text-transparent">
                    Rising Athletes
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                  GNG Engine finds, verifies, and showcases Aussie talent in U.S. college sports.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/directory"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-accent-blue to-accent-rose text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-accent-blue/25"
                >
                  Explore Athletes
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <button className="inline-flex items-center justify-center bg-light-gray text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-gray transition-all duration-300">
                  Watch Demo
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>{athleteCount}+ Verified Athletes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-accent-rose/20 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span>NCAA-Wide Coverage</span>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-96 h-80 bg-gradient-to-br from-accent-blue/20 to-accent-rose/20 rounded-2xl p-1">
                  <img 
                    src="https://source.unsplash.com/random/600x400/?athlete,data" 
                    alt="GNG Engine Platform Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-dark-gray rounded-xl p-4 shadow-xl border border-light-gray">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Live Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-dark-gray">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform automatically discovers and verifies Australian athletes across the NCAA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-blue/50 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Scan NCAA Rosters</h3>
              <p className="text-gray-300 leading-relaxed">
                Our system continuously monitors NCAA team rosters across all divisions and sports
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-rose to-accent-rose/50 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2. AI Detection</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced AI algorithms identify and verify Australian athletes using multiple data sources
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-rose rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Verified Profiles</h3>
              <p className="text-gray-300 leading-relaxed">
                Display comprehensive athlete profiles with verified stats, achievements, and contact info
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to discover and connect with Australia's top college athletes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Verified Aussie-Only Feed</h3>
              <p className="text-gray-300">
                Curated feed of verified Australian athletes only, no noise or false positives
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 bg-accent-rose/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real-time Updates</h3>
              <p className="text-gray-300">
                Live roster updates and athlete information as it happens across the NCAA
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Athlete Summaries</h3>
              <p className="text-gray-300">
                Comprehensive athlete profiles with stats, achievements, and career highlights
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 bg-accent-rose/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Mobile-First Experience</h3>
              <p className="text-gray-300">
                Optimized for mobile devices with responsive design and touch-friendly interface
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">NCAA-Wide Coverage</h3>
              <p className="text-gray-300">
                Complete coverage across all NCAA divisions, conferences, and sports
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-light-gray rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="w-12 h-12 bg-accent-rose/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Airtable Integration</h3>
              <p className="text-gray-300">
                Seamless integration with Airtable for easy data management and updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Carousel Section */}
      <section className="py-24 bg-dark-gray">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-6">
              Platform Preview
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how GNG Engine helps you discover and connect with Australian athletes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Demo Card 1 */}
            <div className="bg-light-gray rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg">
              <img 
                src="https://source.unsplash.com/random/400x300/?dashboard" 
                alt="Verified Feed"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Verified Feed</h3>
                <p className="text-gray-300 text-sm">Real-time feed of verified Australian athletes</p>
              </div>
            </div>

            {/* Demo Card 2 */}
            <div className="bg-light-gray rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg">
              <img 
                src="https://source.unsplash.com/random/400x300/?profile" 
                alt="Athlete Card"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Athlete Card</h3>
                <p className="text-gray-300 text-sm">Comprehensive athlete profiles and stats</p>
              </div>
            </div>

            {/* Demo Card 3 */}
            <div className="bg-light-gray rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg">
              <img 
                src="https://source.unsplash.com/random/400x300/?analytics" 
                alt="Match History"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Match History</h3>
                <p className="text-gray-300 text-sm">Detailed performance and match data</p>
              </div>
            </div>

            {/* Demo Card 4 */}
            <div className="bg-light-gray rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg">
              <img 
                src="https://source.unsplash.com/random/400x300/?scouting" 
                alt="Scouting Summary"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Scouting Summary</h3>
                <p className="text-gray-300 text-sm">AI-generated scouting reports and insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-accent-blue/10 to-accent-rose/10">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-6">
            Ready to find your next recruit?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our early access beta and explore verified Australian athletes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-accent-blue to-accent-rose text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
              Join the Engine
            </button>
            <Link 
              href="/directory"
              className="bg-light-gray text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-gray transition-all duration-300"
            >
              Browse Athletes
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const athletes = await fetchAthletes();
    return {
      props: {
        athleteCount: athletes.length,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching athletes for home page:', error);
    return {
      props: {
        athleteCount: 0,
      },
      revalidate: 3600,
    };
  }
}; 