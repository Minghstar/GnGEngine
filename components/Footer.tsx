import React from 'react';
import Link from 'next/link';
import { Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray py-8 px-4 border-t border-light-gray">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-2 text-text-secondary text-sm">
          <span>&copy; {new Date().getFullYear()} GNG Engine. All rights reserved.</span>
          <span className="hidden md:inline mx-2">|</span>
          <a href="mailto:info@gngengine.com" className="hover:text-accent transition-colors">info@gngengine.com</a>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          {/* Add more social icons as needed */}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 text-text-secondary text-xs mt-2 md:mt-0">
          <a href="#" className="hover:text-accent transition-colors">Terms</a>
          <span className="hidden md:inline mx-1">|</span>
          <a href="#" className="hover:text-accent transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 