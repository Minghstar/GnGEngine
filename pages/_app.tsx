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
import { useEffect } from 'react';

function AppContent({ Component, pageProps }: any) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if user has selected a role
      const hasRole = user.publicMetadata?.role;
      
      if (!hasRole && router.pathname !== '/select-role') {
        // New user without role - redirect to role selection
        router.push('/select-role');
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

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