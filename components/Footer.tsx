import React from 'react';
import Link from 'next/link';
import { Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal-black py-8 px-4 border-t border-neutral-gray">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-2 text-neutral-gray text-sm font-body">
          <span>&copy; {new Date().getFullYear()} GNG Engine. All rights reserved.</span>
          <span className="hidden md:inline mx-2">|</span>
          <a href="mailto:info@gngengine.com" className="hover:text-primary-red transition-colors">info@gngengine.com</a>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <Link href="/" className="hover:text-primary-red transition-colors text-neutral-gray">Home</Link>
          <Link href="/directory" className="hover:text-primary-red transition-colors text-neutral-gray">Directory</Link>
          <Link href="/about" className="hover:text-primary-red transition-colors text-neutral-gray">About</Link>
          <Link href="/contact" className="hover:text-primary-red transition-colors text-neutral-gray">Contact</Link>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-gray hover:text-primary-red transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 