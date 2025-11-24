import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  // Default state is 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // On load, sync state with what's actually on the HTML tag
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full bg-surface border border-border-color text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
      aria-pressed={theme === 'dark'}
      aria-label={theme === 'dark' ? 'Activate light theme' : 'Activate dark theme'}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </button>
  );
}
