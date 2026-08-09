import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';
import { AshokaChakra } from './ChakraAccent';
import { FlagWave } from './FlagWave';

export function Hero() {
  const { scrollY } = useScroll();
  const flagBlur = useTransform(scrollY, [0, 320], ['blur(0px)', 'blur(7px)']);
  const flagOpacity = useTransform(scrollY, [0, 320], [1, 0.35]);
  const flagScale = useTransform(scrollY, [0, 320], [1, 0.94]);

  const scrollToServices = () => {
    document.getElementById('docinfo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[78vh] w-full items-center justify-center overflow-hidden px-5 py-24">
      
      <AshokaChakra className="pointer-events-none absolute -right-24 top-10 h-[340px] w-[340px] text-saffron/10 dark:text-saffron/[0.08]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        
        <motion.div style={{ filter: flagBlur, opacity: flagOpacity, scale: flagScale }}>
          <FlagWave className="mb-8" />
        </motion.div>

        <h1 className="font-display text-6xl font-bold tracking-tight sm:text-7xl">DocSetu</h1>

        <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Know exactly what documents you need — before you need them.
        </p>
        <p className="mt-3 max-w-lg text-sm text-slate-500 dark:text-slate-500">
  From PAN cards to passports, DocSetu breaks down every requirement so you walk in prepared, not guessing.
</p>
    
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          <span>7 Government Services</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block" />
          <span>No Login Required</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block" />
          <span>Official Sources Only</span>
        </div>

        <button
          type="button"
          onClick={scrollToServices}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90">
          
          Explore Services
          <ArrowDownIcon size={16} />
        </button>
      </motion.div>
    </section>);

}