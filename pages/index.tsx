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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
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