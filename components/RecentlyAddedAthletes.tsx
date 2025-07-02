import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AthleteCard from './AthleteCard';
import { Athlete } from '../utils/airtable';

interface RecentlyAddedAthletesProps {
  athletes: Athlete[];
}

const RecentlyAddedAthletes: React.FC<RecentlyAddedAthletesProps> = ({ athletes }) => {
  // Take the first 6 athletes (assuming they're already sorted by creation date)
  // In a real implementation, you'd sort by creation timestamp
  const recentAthletes = athletes.slice(0, 6);

  if (recentAthletes.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-heading">
            Recently Added Athletes
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-body">
            Meet the latest Australian athletes joining GNG Engine. Discover fresh talent from across the country.
          </p>
        </div>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentAthletes.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/directory" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-red text-text-white rounded-xl hover:bg-accent-blue transition-colors duration-200 font-heading font-bold text-lg">
            View All Athletes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedAthletes; 