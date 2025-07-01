import React from 'react';
import { Brain, Flag, BarChart2 } from 'lucide-react';

const WhatIsGNG = () => {
  return (
    <section className="bg-background py-20 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">What is GNG Engine?</h2>
        <p className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          GNG Engine is a next-generation platform for discovering, tracking, and scouting Australian student-athletes in the U.S. college system. Our AI-driven technology verifies talent, aggregates NCAA stats, and makes it easy for scouts and coaches to find the next big thing from Australia.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* AI-Powered Discovery */}
        <div className="flex flex-col items-center bg-dark-gray rounded-2xl p-8 shadow-lg border border-light-gray">
          <div className="bg-green-highlight/10 rounded-full p-4 mb-4">
            <Brain className="w-8 h-8 text-green-highlight" />
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">AI-Powered Discovery</h3>
          <p className="font-body text-text-secondary text-base">Advanced algorithms scan rosters and data sources to find emerging Aussie athletes.</p>
        </div>
        {/* Australian Talent */}
        <div className="flex flex-col items-center bg-dark-gray rounded-2xl p-8 shadow-lg border border-light-gray">
          <div className="bg-accent/10 rounded-full p-4 mb-4">
            <Flag className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">Australian Talent</h3>
          <p className="font-body text-text-secondary text-base">We focus exclusively on Australian student-athletes competing in the U.S. college system.</p>
        </div>
        {/* Verified NCAA Stats */}
        <div className="flex flex-col items-center bg-dark-gray rounded-2xl p-8 shadow-lg border border-light-gray">
          <div className="bg-accent/10 rounded-full p-4 mb-4">
            <BarChart2 className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">Verified NCAA Stats</h3>
          <p className="font-body text-text-secondary text-base">Every profile is backed by verified NCAA statistics and up-to-date performance data.</p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsGNG; 