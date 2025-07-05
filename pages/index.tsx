import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import HowItWorksSection from '../components/HowItWorksSection';
import FeatureSection from '../components/FeatureSection';
import FinalCTASection from '../components/FinalCTASection';
import RecentlyAddedAthletes from '../components/RecentlyAddedAthletes';
import { CheckCircle } from 'lucide-react';
import { fetchAthletes, Athlete } from '../utils/airtable';

interface HomeProps {
  athletes: Athlete[];
}

export default function Home({ athletes }: HomeProps) {
  const stats = [
    { label: 'Athletes', value: '850+' },
    { label: 'Colleges Tracked', value: '53' },
    { label: 'Sports Covered', value: '10+' },
  ];

  const features = [
    { icon: <CheckCircle className="w-6 h-6 text-accent-blue" />, label: 'Directory with advanced filters' },
    { icon: <CheckCircle className="w-6 h-6 text-accent-blue" />, label: 'AI-powered scouting summaries' },
    { icon: <CheckCircle className="w-6 h-6 text-accent-blue" />, label: 'Aussie-first athlete profiles' },
    { icon: <CheckCircle className="w-6 h-6 text-accent-blue" />, label: 'Contact athletes directly (coming soon)' },
  ];

  return (
    <Layout title="GNG Engine - Home" description="Discover Australia's rising athletes. Powered by AI. GNG Engine finds, verifies, and showcases Aussie talent in U.S. college sports.">
      <HeroSection
        headline="Discover Australia's Rising Athletes"
        subtext="Powered by AI. GNG Engine finds, verifies, and showcases Aussie talent in U.S. college sports."
        onPrimaryClick={() => window.location.href = '/directory'}
        onSecondaryClick={() => window.location.href = '/results'}
      />
      <motion.div 
        className="max-w-5xl mx-auto w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <StatsBar stats={stats} />
      </motion.div>
      <RecentlyAddedAthletes athletes={athletes} />
      
      {/* Claim Your Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-16 bg-gradient-to-r from-accent/5 to-accent/10"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 font-heading">
            Is Your Profile Listed?
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-body max-w-2xl mx-auto">
            Are you an Australian athlete studying in the US? Search for your profile and claim it to verify your identity and take control of your information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => window.location.href = '/claim-profile'}
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Claim Your Profile
            </motion.button>
            <motion.button
              onClick={() => window.location.href = '/directory'}
              className="bg-white text-accent border-2 border-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent/10 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Athletes
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <HowItWorksSection />
      </motion.div>
      <motion.div 
        className="max-w-5xl mx-auto w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <FeatureSection features={features} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <FinalCTASection />
      </motion.div>
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
    console.error('Error fetching athletes for homepage:', error);
    return {
      props: {
        athletes: [],
      },
      revalidate: 3600,
    };
  }
}; 