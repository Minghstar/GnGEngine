import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/directory', label: 'Directory' },
  { href: '/results', label: 'Results' },
  { href: '/for-scouts', label: 'For Scouts' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-charcoal-black/95 backdrop-blur-md border-b border-neutral-gray sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="mr-3">
              <img
                src="/logo-test.svg"
                alt="GNG Engine Logo"
                width={40}
                height={40}
                className="rounded-lg bg-white/10"
              />
            </div>
            <span className="text-2xl font-bold text-white font-heading tracking-tight">GNG Engine</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-gray hover:text-primary-red px-3 py-2 rounded-md text-base font-body font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/submit" className="ml-4">
              <Button variant="primary">Submit Athlete</Button>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-gray hover:text-primary-red focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-red transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-charcoal-black border-t border-neutral-gray">
          <div className="px-4 py-4 space-y-2 flex flex-col">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-gray hover:text-primary-red block px-3 py-2 rounded-md text-base font-body font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/submit" className="mt-2">
              <Button variant="primary" className="w-full">Submit Athlete</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 