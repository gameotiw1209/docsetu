import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const slices = Array.from({ length: 22 }, (_, index) => index);
const spokeCount = 24;
const spokes = Array.from({ length: spokeCount }, (_, index) => index);

/**
 * A small waving tricolour built from vertical slices — each slice drifts on a
 * staggered sine so the whole ribbon reads as cloth in the wind.
 * The Ashoka Chakra is rendered as a single overlay on top of all slices,
 * so it's never clipped by an individual slice's width.
 */
export function FlagWave({ className = '' }: {className?: string;}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`relative flex h-16 w-28 overflow-hidden rounded-sm shadow-lg shadow-black/20 ${className}`}>
      
      {slices.map((index) =>
      <motion.div
        key={index}
        className="h-full flex-1"
        animate={
        reduceMotion ?
        undefined :
        {
          y: [0, -3.5, 0, 3.5, 0],
          scaleY: [1, 0.96, 1, 0.96, 1]
        }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.06
        }}>
        
          <div className="h-1/3 w-full bg-saffron" />
          <div className="h-1/3 w-full bg-white" />
          <div className="h-1/3 w-full bg-indiagreen" />
        </motion.div>
      )}

      {/* Ashoka Chakra overlay — sits on top of every slice, centered on the white band, never clipped */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#0b1a4a"
            strokeWidth="3" />
          
          <circle cx="50" cy="50" r="4" fill="#0b1a4a" />
          {spokes.map((index) => {
            const angle = index * 360 / spokeCount;
            const rad = angle * Math.PI / 180;
            const x2 = 50 + 44 * Math.sin(rad);
            const y2 = 50 - 44 * Math.cos(rad);
            return (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="#0b1a4a"
                strokeWidth="1.5" />);


          })}
        </svg>
      </div>
    </div>);

}