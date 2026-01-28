import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springScroll } from '../../config/motion';

export default function Timeline({ children, items }) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const smoothProgress = useSpring(scrollYProgress, springScroll);
  const lineScaleY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const years = [...new Set(items.map((item) => {
    const year = item.date.match(/\d{4}/);
    return year ? year[0] : null;
  }).filter(Boolean))];

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline track */}
      <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-[#262630]" />

      {/* Timeline progress line */}
      <motion.div
        className="timeline-progress absolute left-0 md:left-8 top-0 w-[2px] origin-top"
        style={{
          height: lineScaleY,
          background: 'linear-gradient(180deg, #10b981 0%, #34d399 100%)',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(52, 211, 153, 0.3)',
        }}
      />

      {/* Year markers */}
      <div className="absolute left-0 md:left-8 top-0 bottom-0 -translate-x-1/2">
        {years.map((year, index) => (
          <TimelineYearMarker
            key={year}
            year={year}
            index={index}
            total={years.length}
            progress={smoothProgress}
          />
        ))}
      </div>

      {/* Timeline items */}
      <div className="pl-8 md:pl-20 space-y-8">
        {children}
      </div>
    </div>
  );
}

function TimelineYearMarker({ year, index, total, progress }) {
  const threshold = index / Math.max(total - 1, 1);
  const [isActive, setIsActive] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const unsubscribe = progress.on('change', (value) => {
      setIsActive(value >= threshold - 0.1);
    });
    return unsubscribe;
  }, [progress, threshold]);

  const topPosition = `${(index / Math.max(total - 1, 1)) * 100}%`;

  return (
    <motion.div
      className="absolute left-0 -translate-x-1/2 flex items-center"
      style={{ top: topPosition }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-br from-[#10b981] to-[#34d399] border-transparent'
            : 'bg-[#0a0a0f] border-[#404040]'
        }`}
        animate={
          isActive && !prefersReduced
            ? { scale: [1, 1.2, 1], boxShadow: ['0 0 0px rgba(16, 185, 129, 0)', '0 0 15px rgba(16, 185, 129, 0.6)', '0 0 8px rgba(16, 185, 129, 0.4)'] }
            : {}
        }
        transition={{ duration: 0.4 }}
      />

      <span
        className={`ml-4 text-sm font-mono transition-colors duration-300 ${
          isActive ? 'text-[#fafafa]' : 'text-[#666666]'
        }`}
      >
        {year}
      </span>
    </motion.div>
  );
}

export function TimelineItem({ children, index, isExpanded, onToggle }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="absolute left-[-32px] md:left-[-48px] top-6 w-6 md:w-10 h-[2px] bg-gradient-to-r from-[#404040] to-transparent" />
      {children}
    </motion.div>
  );
}
