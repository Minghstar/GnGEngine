import React from 'react';

interface Stat {
  label: string;
  value: string | number;
}

const StatsBar: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="flex flex-wrap justify-center gap-6 bg-white rounded-xl py-6 px-4 mb-8 shadow-md border-l-4 border-accent">
    {stats.map((stat, i) => (
      <div key={i} className="flex flex-col items-center min-w-[100px] group">
        <span className="font-heading text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-200">{stat.value}</span>
        <span className="font-body text-base text-gray-600 mt-1">{stat.label}</span>
      </div>
    ))}
  </div>
);

export default StatsBar; 