
import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  className?: string;
}

const PageTransition: React.FC<PropsWithChildren<PageTransitionProps>> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
