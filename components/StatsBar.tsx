import React from 'react';

interface Stat {
  label: string;
  value: string | number;
}

const StatsBar: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="flex flex-wrap justify-center gap-6 bg-charcoal-black rounded-xl py-6 px-4 mb-8 shadow">
    {stats.map((stat, i) => (
      <div key={i} className="flex flex-col items-center min-w-[100px]">
        <span className="font-heading text-2xl md:text-3xl font-bold text-primary-red">{stat.value}</span>
        <span className="font-body text-base text-neutral-gray mt-1">{stat.label}</span>
      </div>
    ))}
  </div>
);

export default StatsBar; 