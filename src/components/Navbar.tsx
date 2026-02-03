import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Menu, X } from 'lucide-react';
import data from '../data/portfolio.json';
import ThemeToggle from './ThemeToggle';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkedin = data.social?.linkedin;

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Primary"
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div className="pointer-events-auto relative bg-surface/80 backdrop-blur-md border border-border-color rounded-full shadow-xl p-1.5">
          
          {/* 1. DESKTOP LAYOUT (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-2">
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
              type="button"
              className="ml-1 px-4 py-2 text-sm font-medium bg-text-primary text-bg-depth rounded-full hover:scale-105 transition-transform font-sans whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              Let's Talk
            </button>
            {linkedin ? (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkedin.label}
                title={linkedin.label}
                className="ml-1 inline-flex items-center justify-center w-10 h-10 rounded-full border border-border-color bg-surface hover:bg-surface-hover hover:border-accent-secondary/60 transition-colors"
              >
                <Linkedin size={18} className="text-black dark:text-white" />
              </a>
            ) : null}
          </div>

          {/* 2. MOBILE LAYOUT (Visible on Mobile) */}
          <div className="flex md:hidden items-center justify-between gap-2">
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-surface border border-border-color rounded-full text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-links"
              type="button"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Spacer */}
            <div className="w-px h-6 bg-border-color mx-1"></div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Let's Talk (Always Visible) */}
            <button 
              onClick={() => setIsContactOpen(true)}
              type="button"
              className="px-4 py-2 text-sm font-medium bg-text-primary text-bg-depth rounded-full font-sans whitespace-nowrap active:scale-95 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              Let's Talk
            </button>
            {linkedin ? (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkedin.label}
                title={linkedin.label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border-color bg-surface hover:bg-surface-hover hover:border-accent-secondary/60 transition-colors"
              >
                <Linkedin size={18} className="text-black dark:text-white" />
              </a>
            ) : null}
          </div>

          {/* 3. MOBILE MENU DROPDOWN */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                id="mobile-nav-links"
                className="absolute top-full left-0 right-0 mt-2 p-2 bg-surface border border-border-color rounded-2xl shadow-xl flex flex-col gap-1 overflow-hidden md:hidden"
              >
                {data.nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-text-primary hover:bg-surface-hover rounded-xl transition-colors font-sans text-center"
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.nav>

      {/* The Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
