import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface HeroSectionProps {
  headline: string;
  subtext: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ headline, subtext, onPrimaryClick, onSecondaryClick }) => (
  <motion.section 
    className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-br from-primary to-primary/80 min-h-[60vh] text-center relative overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    {/* Background Pattern */}
    <motion.div 
      className="absolute inset-0 opacity-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-accent rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 w-16 h-16 bg-accent rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      ></motion.div>
    </motion.div>
    
    <div className="relative z-10">
      <motion.h1 
        className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {headline}
      </motion.h1>
      
      <motion.div 
        className="border-t-4 border-accent w-20 mx-auto mt-4 mb-6"
        initial={{ width: 0 }}
        animate={{ width: "5rem" }}
        transition={{ duration: 0.6, delay: 0.4 }}
      ></motion.div>
      
      <motion.p 
        className="font-body text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {subtext}
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button variant="primary" onClick={onPrimaryClick} className="transform hover:scale-105 transition-transform duration-200">
          Explore Athletes
        </Button>
        <Button variant="secondary" onClick={onSecondaryClick} className="transform hover:scale-105 transition-transform duration-200">
          View Results
        </Button>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection; 