import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const spokes = Array.from({ length: 24 }, (_, index) => index * 15);

type AshokaChakraProps = {
  className?: string;
  strokeWidth?: number;
};

export function AshokaChakra({ className = '', strokeWidth = 0.8 }: AshokaChakraProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}>
      
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
      {spokes.map((angle) =>
      <line
        key={angle}
        x1="50"
        y1="4"
        x2="50"
        y2="44"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        transform={`rotate(${angle} 50 50)`} />

      )}
    </motion.svg>);

}