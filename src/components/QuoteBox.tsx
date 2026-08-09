import React from 'react';
import { motion } from 'framer-motion';

export function QuoteBox() {
  return (
    <section id="about" className="w-full px-5 py-16">
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-3xl rounded-3xl border border-slate-900/10 bg-white/60 px-8 py-12 text-center backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
        
        <blockquote className="font-display text-xl leading-relaxed sm:text-2xl">
          “The best way to find yourself is to lose yourself in the service of others.”
        </blockquote>
        <figcaption className="mt-5 text-sm text-slate-600 dark:text-slate-400">
          <span className="mr-2 inline-block h-px w-8 translate-y-[-4px] bg-indiagreen" />
          Mahatma Gandhi
        </figcaption>
      </motion.figure>
    </section>);

}