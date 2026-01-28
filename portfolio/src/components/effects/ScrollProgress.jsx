import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springScroll } from '../../config/motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  const scaleX = useSpring(0, springScroll);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scaleX.set(scrollProgress);
  }, [scrollProgress, scaleX]);

  if (prefersReduced) {
    return (
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-[#10b981] to-[#34d399] origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    );
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scroll-progress"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
      }}
    />
  );
}
