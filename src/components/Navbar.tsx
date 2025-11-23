import React, { useState } from 'react';
import { motion } from 'framer-motion';
import data from '../data/portfolio.json';
import ThemeToggle from './ThemeToggle';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="flex items-center gap-2 p-1 bg-surface/80 backdrop-blur-md border border-border-color rounded-full shadow-xl pointer-events-auto">
          <div className="flex gap-1">
            {data.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-full transition-all font-sans"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="w-px h-6 bg-border-color mx-1"></div>
          
          <ThemeToggle />
          
          <button 
            onClick={() => setIsContactOpen(true)}
            className="ml-1 px-4 py-2 text-sm font-medium bg-text-primary text-bg-depth rounded-full hover:scale-105 transition-transform font-sans"
          >
            Let's Talk
          </button>
        </div>
      </motion.div>

      {/* The Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}