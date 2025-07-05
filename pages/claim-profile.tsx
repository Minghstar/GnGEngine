import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ScrollAnimation from '../components/ScrollAnimation';
import TextReveal from '../components/TextReveal';
import Toast from '../components/Toast';
import { Athlete } from '../utils/airtable';
import { getDisplayName, getDisplayCollege, getDisplaySport, getInitials } from '../utils/athleteValidation';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
import ClaimProfileModal from '../components/ClaimProfileModal';

interface ClaimProfileProps {}

interface SearchResult {
  id: string;
  name: string;
  college: string;
  sport: string;
  image?: string;
}

interface ClaimFormData {
  fullName: string;
  email: string;
  socialMedia?: string;
  explanation: string;
  athleteId: string;
  athleteName: string;
  college: string;
  sport: string;
}

export default function ClaimProfile({}: ClaimProfileProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<SearchResult | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [formData, setFormData] = useState<ClaimFormData>({
    fullName: '',
    email: '',
    socialMedia: '',
    explanation: '',
    athleteId: '',
    athleteName: '',
    college: '',
    sport: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        email: user.primaryEmailAddress?.emailAddress || prev.email
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch(`/api/search-athletes?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.athletes.slice(0, 5)); // Limit to 5 results
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClaimProfile = (athlete: SearchResult) => {
    setSelectedAthlete(athlete);
    setFormData({
      fullName: athlete.name,
      email: '',
      socialMedia: '',
      explanation: '',
      athleteId: athlete.id,
      athleteName: athlete.name,
      college: athlete.college,
      sport: athlete.sport
    });
    setIsClaimModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/claim-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setToast({
          message: 'Claim request submitted successfully! We\'ll get back to you within 24-48 hours.',
          type: 'success',
          isVisible: true
        });
        setTimeout(() => {
          setIsClaimModalOpen(false);
          setSubmitStatus('idle');
          setSearchResults([]);
          setSearchQuery('');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setToast({
          message: 'Failed to submit claim request. Please try again.',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      setSubmitStatus('error');
      setToast({
        message: 'An error occurred. Please try again or contact us directly.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <ProtectedRoute requiredRole="athlete">
      <Layout 
        title="Claim Your Profile - GNG Engine"
        description="Find and claim your athlete profile on GNG Engine. Search for your name to locate your profile and verify your identity."
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <ScrollAnimation delay={0.2}>
            <div className="text-center mb-10">
              <TextReveal 
                type="word"
                delay={0.3}
                stagger={0.1}
                className="text-4xl md:text-5xl font-bold text-text mb-4 font-heading"
              >
                Claim Your Profile
              </TextReveal>
              <motion.div 
                className="border-t-4 border-accent w-20 mx-auto mt-4 mb-6"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ duration: 0.6, delay: 0.5 }}
              ></motion.div>
              <TextReveal 
                type="line"
                delay={0.7}
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-body"
              >
                Is your profile listed on GNG Engine? Search for your name below and claim your profile to verify your identity.
              </TextReveal>
            </div>
          </ScrollAnimation>

          {/* Search Section */}
          <ScrollAnimation delay={0.4}>
            <div className="mb-8">
              <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-accent">
                <h2 className="text-xl font-bold text-text mb-4 font-heading">Find Your Profile</h2>
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search by your name..."
                />
                <p className="text-sm text-gray-600 mt-3 font-body">
                  Try searching for your full name or just your first or last name.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Loading State */}
          {isSearching && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <svg className="animate-spin h-12 w-12 text-accent mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-600 font-body">Searching for your profile...</p>
            </motion.div>
          )}

          {/* Search Results */}
          <AnimatePresence>
            {!isSearching && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-text mb-4 font-heading">
                  Found {searchResults.length} matching profile{searchResults.length !== 1 ? 's' : ''}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((athlete, index) => (
                    <motion.div
                      key={athlete.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow"
                    >
                      {/* Mini Athlete Card */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-accent to-accent/80">
                          {athlete.image ? (
                            <Image
                              src={athlete.image}
                              alt={athlete.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
                              <span className="text-white text-lg font-bold">
                                {getInitials(athlete.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-text truncate font-heading">
                            {getDisplayName(athlete.name)}
                          </h4>
                          <p className="text-sm text-gray-600 truncate font-body">
                            {getDisplayCollege(athlete.college)}
                          </p>
                          {athlete.sport && (
                            <p className="text-xs text-accent font-medium font-body">
                              {getDisplaySport(athlete.sport)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleClaimProfile(athlete)}
                        className="w-full bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm"
                      >
                        Claim This Profile
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          <AnimatePresence>
            {!isSearching && searchQuery && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2 font-heading">No Profiles Found</h3>
                <p className="text-gray-600 mb-4 font-body">
                  We couldn't find any profiles matching "{searchQuery}". Try different search terms or contact us if you believe your profile should be listed.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 font-body">
                    • Try searching by just your first or last name
                  </p>
                  <p className="text-sm text-gray-500 font-body">
                    • Check for spelling variations
                  </p>
                  <p className="text-sm text-gray-500 font-body">
                    • Contact us at info@gngengine.com
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Claim Modal */}
          <AnimatePresence>
            {isClaimModalOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-text font-heading">Claim Profile</h2>
                    <button
                      onClick={() => setIsClaimModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {submitStatus === 'success' ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-text mb-2 font-heading">Claim Request Sent!</h3>
                        <p className="text-gray-600 font-body">
                          We've received your claim request and will get back to you within 24-48 hours.
                        </p>
                      </div>
                    ) : submitStatus === 'error' ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-text mb-2 font-heading">Something went wrong</h3>
                        <p className="text-gray-600 mb-4 font-body">
                          Please try again or contact us directly at info@gngengine.com
                        </p>
                        <button
                          onClick={() => setSubmitStatus('idle')}
                          className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="bg-accent/5 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-600 font-body mb-2">Claiming profile for:</p>
                          <p className="font-semibold text-text font-heading">{selectedAthlete?.name}</p>
                          <p className="text-sm text-gray-600 font-body">{selectedAthlete?.college}</p>
                        </div>

                        <div>
                          <label htmlFor="fullName" className="block text-sm font-semibold text-text mb-2 font-heading">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-text mb-2 font-heading">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="socialMedia" className="block text-sm font-semibold text-text mb-2 font-heading">
                            Social Media (Optional)
                          </label>
                          <input
                            type="text"
                            id="socialMedia"
                            name="socialMedia"
                            value={formData.socialMedia}
                            onChange={handleInputChange}
                            placeholder="Instagram, Twitter, LinkedIn, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body"
                          />
                        </div>

                        <div>
                          <label htmlFor="explanation" className="block text-sm font-semibold text-text mb-2 font-heading">
                            Why are you claiming this profile?
                          </label>
                          <textarea
                            id="explanation"
                            name="explanation"
                            value={formData.explanation}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Tell us why you're claiming this profile and any additional information..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body resize-none"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Claim Request'}
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toast Notification */}
          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={closeToast}
          />
        </div>

        <ClaimProfileModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Layout>
    </ProtectedRoute>
  );
} 