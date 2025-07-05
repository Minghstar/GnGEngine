import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  // Role-based navigation
  const getNavLinks = () => {
    const baseLinks = [
      { href: '/', label: 'Home' },
      { href: '/directory', label: 'Directory' },
      { href: '/results', label: 'Results' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ];

    if (isSignedIn && user?.publicMetadata?.role === 'athlete') {
      return [
        ...baseLinks,
        { href: '/claim-profile', label: 'Claim Profile' },
      ];
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
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
            <span className="text-2xl font-bold text-primary font-heading tracking-tight">GNG Engine</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-body font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SignedOut>
                <SignInButton 
                  mode="modal"
                  appearance={{
                    variables: {
                      colorPrimary: "#007F3E", // GNG green
                      colorText: "#000000",
                      colorTextOnPrimaryBackground: "#ffffff",
                      borderRadius: "12px",
                      colorAccent: "#FFD700", // Gold for tags or highlights
                      fontFamily: "Inter, sans-serif"
                    },
                    elements: {
                      card: "shadow-2xl border border-gray-200 bg-white",
                      headerTitle: "text-xl font-semibold text-primary",
                      formFieldInput: "rounded-md focus:ring-2 ring-accent",
                      socialButtonsBlockButton: "hover:scale-[1.02] transition-all",
                      footerAction: "text-sm text-gray-500",
                      formButtonPrimary: "bg-primary text-white hover:bg-primary/90 rounded-md"
                    }
                  }}
                >
                  <Button variant="primary">Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-body font-medium transition-colors duration-200">
                    <span>{user?.firstName || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      {user?.publicMetadata?.role === 'athlete' ? 'Athlete' : 'Follower'}
                    </div>
                    <SignOutButton>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              </SignedIn>
            </motion.div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-body font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <SignedOut>
                  <SignInButton 
                    mode="modal"
                    appearance={{
                      variables: {
                        colorPrimary: "#007F3E", // GNG green
                        colorText: "#000000",
                        colorTextOnPrimaryBackground: "#ffffff",
                        borderRadius: "12px",
                        colorAccent: "#FFD700", // Gold for tags or highlights
                        fontFamily: "Inter, sans-serif"
                      },
                      elements: {
                        card: "shadow-2xl border border-gray-200 bg-white",
                        headerTitle: "text-xl font-semibold text-primary",
                        formFieldInput: "rounded-md focus:ring-2 ring-accent",
                        socialButtonsBlockButton: "hover:scale-[1.02] transition-all",
                        footerAction: "text-sm text-gray-500",
                        formButtonPrimary: "bg-primary text-white hover:bg-primary/90 rounded-md"
                      }
                    }}
                  >
                    <Button variant="primary" className="w-full">Sign In</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="border-t pt-4 mt-4">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {user?.publicMetadata?.role === 'athlete' ? 'Athlete' : 'Follower'}
                    </div>
                    <SignOutButton>
                      <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                </SignedIn>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar; 