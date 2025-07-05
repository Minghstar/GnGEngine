import React from 'react';
import Button from './Button';

interface HeroSectionProps {
  headline: string;
  subtext: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ headline, subtext, onPrimaryClick, onSecondaryClick }) => (
  <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-br from-primary to-primary/80 min-h-[60vh] text-center relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-accent rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
    </div>
    
    <div className="relative z-10">
      <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight animate-fade-in">
        {headline}
      </h1>
      <div className="border-t-4 border-accent w-20 mx-auto mt-4 mb-6"></div>
      <p className="font-body text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subtext}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" onClick={onPrimaryClick} className="transform hover:scale-105 transition-transform duration-200">
          Explore Athletes
        </Button>
        <Button variant="secondary" onClick={onSecondaryClick} className="transform hover:scale-105 transition-transform duration-200">
          View Results
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection; 