import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string | number;
}

const StatsBar: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <motion.div 
    className="flex flex-wrap justify-center gap-6 bg-white rounded-xl py-6 px-4 mb-8 shadow-md border-l-4 border-accent"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    {stats.map((stat, i) => (
      <motion.div 
        key={i} 
        className="flex flex-col items-center min-w-[100px] group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
      >
        <span className="font-heading text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-200">{stat.value}</span>
        <span className="font-body text-base text-gray-600 mt-1">{stat.label}</span>
      </motion.div>
    ))}
  </motion.div>
);

export default StatsBar; 