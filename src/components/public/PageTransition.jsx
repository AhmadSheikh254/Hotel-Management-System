import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduced = useReducedMotion();

  if (reduced) {
    return <div key={location.pathname}>{children}</div>;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
