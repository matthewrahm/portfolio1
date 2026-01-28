import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { parallaxConfig, springScroll } from '../../config/motion';

/**
 * Subtle Y-axis parallax effect on text
 * 50px total travel range as specified
 */
export default function ParallaxText({
  children,
  className = '',
  as: Component = 'div',
  travelRange = parallaxConfig.travelRange,
  direction = 'up', // 'up' or 'down'
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to Y offset
  const yOffset = direction === 'up' ? [travelRange / 2, -travelRange / 2] : [-travelRange / 2, travelRange / 2];
  const y = useTransform(scrollYProgress, [0, 1], yOffset);

  // Apply spring smoothing
  const springY = useSpring(y, springScroll);

  // If reduced motion, render without parallax
  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      ref={ref}
      className={`parallax-text ${className}`}
      style={{ y: springY }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Horizontal parallax effect
 */
export function ParallaxHorizontal({
  children,
  className = '',
  travelRange = 30,
  direction = 'left', // 'left' or 'right'
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xOffset = direction === 'left' ? [travelRange, -travelRange] : [-travelRange, travelRange];
  const x = useTransform(scrollYProgress, [0, 1], xOffset);
  const springX = useSpring(x, springScroll);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale parallax effect
 */
export function ParallaxScale({
  children,
  className = '',
  scaleRange = [0.95, 1.05],
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const springScale = useSpring(scale, springScroll);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale: springScale }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Opacity fade parallax effect
 */
export function ParallaxFade({
  children,
  className = '',
  fadeIn = true,
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacityRange = fadeIn ? [0, 1, 1, 0] : [1, 1, 1, 0];
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], opacityRange);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity }}
    >
      {children}
    </motion.div>
  );
}
