import React from 'react';
import Button from './Button';

interface HeroSectionProps {
  headline: string;
  subtext: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ headline, subtext, onPrimaryClick, onSecondaryClick }) => (
  <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-br from-charcoal-black to-primary-red min-h-[60vh] text-center">
    <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-white mb-4 leading-tight">{headline}</h1>
    <p className="font-body text-xl text-neutral-gray mb-8 max-w-2xl mx-auto">{subtext}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button variant="primary" onClick={onPrimaryClick}>Explore Athletes</Button>
      <Button variant="secondary" onClick={onSecondaryClick}>Submit Athlete</Button>
    </div>
    {/* Placeholder for background image/collage */}
    <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'none' }} />
  </section>
);

export default HeroSection; 