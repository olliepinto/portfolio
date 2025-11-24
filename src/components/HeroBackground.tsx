import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HeroBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // OPTIMIZATION 1: Softer physics (Increased damping/stiffness)
  // This makes the movement more subtle and less "jittery"
  const springConfig = { damping: 30, stiffness: 40, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const x1 = useTransform(x, [0, windowSize.width || 1], [-40, 40]);
  const y1 = useTransform(y, [0, windowSize.height || 1], [-40, 40]);
  
  const x2 = useTransform(x, [0, windowSize.width || 1], [20, -20]);
  const y2 = useTransform(y, [0, windowSize.height || 1], [20, -20]);

  useEffect(() => {
    setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
      
      {/* Layer 1: Large Slow Waves */}
      <motion.div 
        style={{ x: x1, y: y1 }}
        // OPTIMIZATION 2: Added 'will-change-transform'
        // This forces the browser to render this on the GPU, ignoring the heavy gradient on top.
        className="absolute inset-[-10%] w-[120%] h-[120%] flex items-center justify-center opacity-30 will-change-transform"
      >
        <svg className="w-full h-full text-accent-secondary" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M-100 500 C 200 300, 400 800, 1100 500" stroke="currentColor" strokeWidth="2" fill="none" />
           <path d="M-100 600 C 200 400, 400 900, 1100 600" stroke="currentColor" strokeWidth="2" fill="none" />
           <path d="M-100 700 C 200 500, 400 1000, 1100 700" stroke="currentColor" strokeWidth="2" fill="none" />
           <circle cx="800" cy="200" r="300" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Layer 2: Detailed Topographic Lines (Faster) */}
      <motion.div 
        style={{ x: x2, y: y2 }}
        // OPTIMIZATION 2: Added 'will-change-transform' here too
        className="absolute inset-[-5%] w-[110%] h-[110%] flex items-center justify-center opacity-50 will-change-transform"
      >
        <svg className="w-full h-full text-text-muted" viewBox="0 0 1920 1080" fill="none">
            <path d="M0 200 Q 400 500 900 300 T 1920 400" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M0 250 Q 420 550 920 350 T 1920 450" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M0 300 Q 440 600 940 400 T 1920 500" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M1600 0 Q 1400 500 1700 1080" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M1550 0 Q 1350 500 1650 1080" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
        </svg>
      </motion.div>

    </div>
  );
}