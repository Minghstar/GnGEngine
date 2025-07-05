import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: 'character' | 'word' | 'line';
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.5, 
  stagger = 0.03,
  type = 'word'
}) => {
  const text = typeof children === 'string' ? children : '';
  
  if (type === 'character' && typeof children === 'string') {
    return (
      <motion.div className={className}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration,
              delay: delay + index * stagger,
              ease: 'easeOut'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (type === 'word' && typeof children === 'string') {
    return (
      <motion.div className={className}>
        {text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration,
              delay: delay + index * stagger,
              ease: 'easeOut'
            }}
          >
            {word}{index < text.split(' ').length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Default line animation for non-string content
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default TextReveal; 