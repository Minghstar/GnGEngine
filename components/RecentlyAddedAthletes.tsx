import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <motion.section 
      className="py-16 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-heading">
            Fresh Faces, Fierce Dreams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            Six more dreamers just crossed the Pacific. Here's where their stories begin.
          </p>
        </motion.div>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentAthletes.map((athlete, index) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <AthleteCard athlete={athlete} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link href="/directory" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-200 font-heading font-bold text-lg shadow-md hover:shadow-lg">
            View All Athletes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RecentlyAddedAthletes; 