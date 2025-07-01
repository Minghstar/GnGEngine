import React from 'react';
import Button from './Button';

const FinalCTASection = () => (
  <section className="w-full py-16 px-4 bg-primary-red text-center">
    <div className="max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-white mb-6">Want to work with top Aussie athletes? Let's chat.</h2>
      <Button variant="secondary" onClick={() => window.location.href = '/contact'}>Contact Us</Button>
    </div>
  </section>
);

export default FinalCTASection; 