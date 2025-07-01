import React from 'react';

interface Feature {
  icon?: React.ReactNode;
  label: string;
}

const FeatureSection: React.FC<{ features: Feature[] }> = ({ features }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8">
    {features.map((feature, i) => (
      <div key={i} className="flex items-center gap-3 bg-charcoal-black rounded-xl p-4 shadow">
        {feature.icon ? (
          <span className="text-accent-blue w-6 h-6">{feature.icon}</span>
        ) : (
          <span className="inline-block w-6 h-6 bg-primary-red rounded-full flex items-center justify-center text-white font-bold">✓</span>
        )}
        <span className="font-heading text-xl text-text-white">{feature.label}</span>
      </div>
    ))}
  </div>
);

export default FeatureSection; 