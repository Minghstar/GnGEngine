import React from 'react';
import Link from 'next/link';

const CTABanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-green-highlight/90 via-background/95 to-accent/80 py-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 md:mb-0">
          Ready to scout the next big thing?
        </h2>
        <Link href="/directory" className="inline-block bg-accent text-background font-heading font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform duration-200">
          Explore Now
        </Link>
      </div>
    </section>
  );
};

export default CTABanner; 