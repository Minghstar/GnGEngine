import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import WhatIsGNG from '../components/WhatIsGNG';
import HowItWorks from '../components/HowItWorks';
import AthleteShowcase from '../components/AthleteShowcase';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import { fetchAthletes } from '../utils/airtable';

interface HomeProps {
  athleteCount: number;
}

export default function Home({ athleteCount }: HomeProps) {
  return (
    <Layout 
      title="GNG Engine - Home"
      description="Discover Australia's rising athletes. Powered by AI. GNG Engine finds, verifies, and showcases Aussie talent in U.S. college sports."
    >
      <HeroSection athleteCount={athleteCount} />
      <WhatIsGNG />
      <HowItWorks />
      <AthleteShowcase athleteCount={athleteCount} />
      <CTABanner />
      <Footer />
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