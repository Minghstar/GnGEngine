import React from 'react';
import Link from 'next/link';
import { Twitter } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
        
        {/* Logo and Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 text-gray-600 text-sm font-body">
            <div className="mb-2 md:mb-0">
              <img
                src="/logo-test.svg"
                alt="GNG Engine Logo"
                width={40}
                height={40}
                className="rounded-lg bg-white/10"
              />
            </div>
            <span>&copy; {new Date().getFullYear()} GNG Engine. All rights reserved.</span>
            <span className="hidden md:inline mx-2">|</span>
            <a href="mailto:info@gngengine.com" className="hover:text-primary transition-colors">info@gngengine.com</a>
          </div>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link href="/" className="hover:text-primary transition-colors text-gray-600">Home</Link>
            <Link href="/directory" className="hover:text-primary transition-colors text-gray-600">Directory</Link>
            <Link href="/about" className="hover:text-primary transition-colors text-gray-600">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors text-gray-600">Contact</Link>
          </div>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 