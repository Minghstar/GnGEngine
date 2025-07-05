import React, { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  triggerOnce?: boolean;
  threshold?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.5, 
  y = 30,
  triggerOnce = true,
  threshold = 0.1
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    threshold: threshold
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: y }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 