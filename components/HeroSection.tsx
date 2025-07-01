import React from 'react';
import { Users } from 'lucide-react';

interface HeroSectionProps {
  athleteCount?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ athleteCount }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-background overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Sports background"
          className="w-full h-full object-cover object-center opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-green-highlight/60" />
      </div>
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-7 h-7 text-accent" />
          {athleteCount !== undefined && (
            <span className="text-green-highlight font-bold font-heading text-lg tracking-tight">
              {athleteCount}+ Verified Athletes
            </span>
          )}
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-snug tracking-tight mb-4">
          Discover the Future of <span className="text-accent">Aussie Talent</span>
        </h1>
        <p className="font-body text-lg md:text-2xl text-text-secondary mb-8 max-w-xl mx-auto">
          Track and scout Australian student-athletes across the U.S. college system.
        </p>
        <a
          href="/directory"
          className="inline-block bg-accent text-background font-heading font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Start Scouting
        </a>
      </div>
    </section>
  );
};

export default HeroSection; 