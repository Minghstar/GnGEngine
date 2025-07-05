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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
} 