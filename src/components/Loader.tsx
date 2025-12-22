import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Creative", "Strategy", "Operations", "Systems", "Ollie Pinto"];

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const updateViewportHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      setViewportHeight(Math.round(height));
    };

    updateViewportHeight();

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', updateViewportHeight);
    visualViewport?.addEventListener('scroll', updateViewportHeight);
    window.addEventListener('resize', updateViewportHeight);

    const counterInterval = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        if (next >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        return next;
      });
    }, 30);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev === words.length - 1) return prev;
        return prev + 1;
      });
    }, 400);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
      clearInterval(wordInterval);
    }, 2500);

    return () => {
      clearInterval(counterInterval);
      clearInterval(wordInterval);
      clearTimeout(timeout);
      visualViewport?.removeEventListener('resize', updateViewportHeight);
      visualViewport?.removeEventListener('scroll', updateViewportHeight);
      window.removeEventListener('resize', updateViewportHeight);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const loaderVariants = {
    exit: (height: number | null) => ({
      y: height ? -height : '-100%',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit="exit"
          variants={loaderVariants}
          custom={viewportHeight}
          role="status"
          aria-live="polite"
          aria-label="Site loading"
          className="fixed left-0 top-0 z-[999] flex w-screen flex-col items-center justify-center bg-bg-depth text-text-primary px-4"
          style={{
            height: viewportHeight ? `${viewportHeight}px` : '100vh',
            paddingBottom: 'env(safe-area-inset-bottom)',
            paddingTop: 'env(safe-area-inset-top)',
          }}
        >
          <div className="w-full max-w-md">
            
            {/* Top Bar */}
            <div className="flex justify-between items-end mb-4 font-sans text-xs text-text-muted uppercase tracking-widest">
              <span>System Initializing...</span>
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
