import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function AnimatedIcon({
  children,
  className = '',
  hoverColor = '#10b981',
  drawDuration = 0.8,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <span className={`animated-icon ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={`animated-icon inline-flex ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{
        scale: 1.1,
        filter: `drop-shadow(0 0 8px ${hoverColor}80)`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );
}

export function AnimatedPath({
  d,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  className = '',
  duration = 0.8,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        className={className}
      />
    );
  }

  return (
    <motion.path
      ref={ref}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        isInView
          ? { pathLength: 1, opacity: 1 }
          : { pathLength: 0, opacity: 0 }
      }
      transition={{
        pathLength: { duration, delay, ease: 'easeInOut' },
        opacity: { duration: 0.2, delay },
      }}
    />
  );
}

export function AnimatedSvg({
  children,
  viewBox = '0 0 24 24',
  className = '',
  width = 24,
  height = 24,
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      width={width}
      height={height}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function AnimatedArrowDown({ className = '', size = 24, color = 'currentColor' }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={prefersReduced ? {} : { y: [0, 6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <AnimatedPath d="M12 5v14" duration={0.5} />
      <AnimatedPath d="M19 12l-7 7-7-7" duration={0.5} delay={0.3} />
    </motion.svg>
  );
}

export function AnimatedExternalLink({ className = '', size = 16, color = 'currentColor' }) {
  return (
    <AnimatedSvg className={className} width={size} height={size}>
      <AnimatedPath d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4" stroke={color} duration={0.4} />
      <AnimatedPath d="M14 4h6m0 0v6m0-6L10 14" stroke={color} duration={0.4} delay={0.2} />
    </AnimatedSvg>
  );
}

export function AnimatedGitHub({ className = '', size = 24, color = 'currentColor' }) {
  return (
    <AnimatedIcon className={className} hoverColor="#10b981">
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
        />
      </svg>
    </AnimatedIcon>
  );
}

export function AnimatedLinkedIn({ className = '', size = 24, color = 'currentColor' }) {
  return (
    <AnimatedIcon className={className} hoverColor="#10b981">
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </AnimatedIcon>
  );
}
