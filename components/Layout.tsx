import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title = 'GNG Engine - Australian College Athletes', description = 'Showcasing the best Australian college athletes and connecting them with opportunities.' }: LayoutProps) => {
  const previewImage = '/favicon.ico'; // Placeholder, replace with real image if available
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={previewImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={previewImage} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 