import React from 'react';
import { Search, Filter, Eye } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8 text-accent-blue" />,
    title: 'We Find',
    desc: 'Our AI scans NCAA rosters and databases to identify all student-athletes.'
  },
  {
    icon: <Filter className="w-8 h-8 text-primary-red" />,
    title: 'We Filter',
    desc: 'We verify nationality and background to focus on Australian talent only.'
  },
  {
    icon: <Eye className="w-8 h-8 text-accent-blue" />,
    title: 'You Scout',
    desc: 'Browse verified profiles, stats, and contact info in a sleek, searchable platform.'
  },
];

const HowItWorksSection = () => (
  <section className="w-full py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-white mb-10 text-center">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center bg-charcoal-black rounded-xl p-8 shadow-md text-center">
            <div className="mb-4">{step.icon}</div>
            <h3 className="font-heading text-xl text-text-white font-bold mb-2">{step.title}</h3>
            <p className="font-body text-base text-neutral-gray">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection; 