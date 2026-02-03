import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Creative", "Strategy", "Operations", "Systems", "Ollie Pinto"];
const LOADER_DURATION_MS = 2500;
const WORD_INTERVAL_MS = 400;
const COUNT_INTERVAL_MS = 30;
const LOADER_SESSION_KEY = 'portfolio:loader-seen';

const shouldShowLoader = () => {
  if (typeof document === 'undefined') return true;
  const datasetSetting = document.documentElement.dataset.loader;
  if (datasetSetting) return datasetSetting !== 'skip';
  try {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const saveData = navigator.connection?.saveData ?? false;
    const hasSeen = sessionStorage.getItem(LOADER_SESSION_KEY) === 'true';
    return !(reduceMotion || saveData || hasSeen);
  } catch (error) {
    return true;
  }
};

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!shouldShowLoader()) {
      setIsLoading(false);
      return;
    }

    const main = document.getElementById('main-content');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    main?.setAttribute('aria-busy', 'true');
    try {
      sessionStorage.setItem(LOADER_SESSION_KEY, 'true');
    } catch (error) {
      // Session storage may be unavailable.
    }

    const counterInterval = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        if (next >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        return next;
      });
    }, COUNT_INTERVAL_MS);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev === words.length - 1) return prev;
        return prev + 1;
      });
    }, WORD_INTERVAL_MS);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute('aria-busy');
      clearInterval(wordInterval);
    }, LOADER_DURATION_MS);

    return () => {
      clearInterval(counterInterval);
      clearInterval(wordInterval);
      clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute('aria-busy');
    };
  }, []);

  const loaderVariants = {
    exit: { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit="exit"
          variants={loaderVariants}
          role="status"
          aria-live="polite"
          aria-label="Site loading"
          data-site-loader="true"
          className="fixed left-0 top-0 z-[999] flex w-screen h-[100lvh] min-h-[100vh] flex-col items-center justify-center bg-bg-depth text-text-primary px-4"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom)',
            paddingTop: 'env(safe-area-inset-top)',
          }}
        >
          <div className="w-full max-w-md">
            
            {/* Top Bar */}
            <div className="flex justify-between items-end mb-4 font-sans text-xs text-text-muted uppercase tracking-widest">
              <span>Loading...</span>
              <span>{count}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-surface relative overflow-hidden rounded-full mb-12">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-accent-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
              />
            </div>

            {/* Changing Words - UPDATED TO ABRIL FATFACE */}
            <div className="h-20 overflow-hidden flex items-center justify-center">
                <motion.h1 
                    key={wordIndex}
                    initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    // Added font-serif, tracking-wide, and slightly larger size
                    className="text-4xl md:text-6xl font-serif font-normal tracking-wide text-center"
                >
                    {words[wordIndex]}
                </motion.h1>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
