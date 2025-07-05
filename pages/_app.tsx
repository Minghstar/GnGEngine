import '@fontsource/outfit/400.css';
import '@fontsource/outfit/700.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

function AppContent({ Component, pageProps }: any) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if user has selected a role
      const hasRole = user.publicMetadata?.role;
      
      if (!hasRole && router.pathname !== '/select-role') {
        // New user without role - redirect to role selection
        router.push('/select-role');
      } else if (hasRole === 'athlete' && router.pathname === '/') {
        // Athlete on homepage - check if they have a claimed profile
        checkAthleteProfile();
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  const checkAthleteProfile = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    setIsCheckingProfile(true);
    try {
      // Search for athletes claimed by this user's email
      const response = await fetch(`/api/search-athletes?claimedBy=${encodeURIComponent(user.primaryEmailAddress.emailAddress)}`);
      const data = await response.json();
      
      if (data.success && data.athletes.length > 0) {
        // User has claimed a profile - redirect to it
        const claimedProfile = data.athletes[0];
        router.push(`/profile/${claimedProfile.id}`);
      } else {
        // No claimed profile - redirect to claim page
        router.push('/claim-profile');
      }
    } catch (error) {
      console.error('Error checking athlete profile:', error);
      // Fallback to claim page
      router.push('/claim-profile');
    } finally {
      setIsCheckingProfile(false);
    }
  };

  // Show loading state while checking profile
  if (isCheckingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-accent mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}

export default function App({ Component, pageProps }: any) {
  return (
    <ClerkProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ClerkProvider>
  );
} 