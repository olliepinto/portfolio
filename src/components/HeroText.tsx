import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import data from '../data/portfolio.json';

export default function HeroText() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        // Delay set to 3.0s to wait for the loading screen to finish
        delayChildren: 3.0,   
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1] 
        } 
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center md:items-start text-center md:text-left space-y-8"
    >
       {/* Badge */}
       <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 border border-border-color rounded-full bg-surface/80 backdrop-blur-md shadow-sm hover:border-accent-primary/50 transition-colors">
          <span className="relative flex h-2 w-2">
            {/* FIX: Changed 'class' to 'className' in these spans */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
          </span>
          <span className="text-sm font-medium text-text-muted lowercase font-sans">{data.hero.badge}</span>
       </motion.div>

       {/* Headline */}
       <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-wide text-text-primary leading-[1.1]">
         {data.hero.headline}
       </motion.h1>

       {/* Subheadline */}
       <motion.p variants={item} className="text-xl text-text-muted max-w-lg leading-relaxed font-sans font-light">
         {data.hero.subheadline}
       </motion.p>

       {/* Buttons */}
       <motion.div variants={item} className="pt-2 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
         <a href="#work" className="px-8 py-4 bg-text-primary text-bg-depth font-bold rounded-full hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2 font-sans">
           {data.hero.ctaPrimary} <ArrowDownRight size={20} />
         </a>
         <a href="#about" className="px-8 py-4 bg-surface border border-border-color text-text-primary font-medium rounded-full hover:bg-surface-hover transition-colors flex items-center justify-center font-sans">
           {data.hero.ctaSecondary}
         </a>
       </motion.div>
    </motion.div>
  );
}