import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark/95 backdrop-blur-md border-b border-light-gray sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-rose rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">GNG</span>
              </div>
              <span className="text-xl font-bold text-white font-space-grotesk">
                GNG Engine
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/directory" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Explore
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              How It Works
            </Link>
            <Link 
              href="#for-scouts" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              For Scouts
            </Link>
            <Link 
              href="#for-athletes" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              For Athletes
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button className="bg-gradient-to-r from-accent-blue to-accent-rose text-white px-6 py-2 rounded-lg font-medium text-sm hover:scale-105 transition-all duration-300 shadow-lg">
              Join Waitlist
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-blue transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-gray border-t border-light-gray">
            <Link 
              href="/directory" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="#for-scouts" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              For Scouts
            </Link>
            <Link 
              href="#for-athletes" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              For Athletes
            </Link>
            <div className="pt-2">
              <button className="w-full bg-gradient-to-r from-accent-blue to-accent-rose text-white px-6 py-2 rounded-lg font-medium text-sm hover:scale-105 transition-all duration-300">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 