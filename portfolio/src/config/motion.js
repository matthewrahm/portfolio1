/**
 * Shared spring physics constants for consistent animations across the site
 */

// Default spring for general UI interactions
export const springDefault = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

// Snappy spring for quick responses
export const springSnappy = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

// Soft spring for gentle movements
export const springSoft = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

// Magnetic button spring (as specified in plan)
export const springMagnetic = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
};

// Elastic spring for bouncy effects
export const springElastic = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
  mass: 0.5,
};

// Timeline/scroll-based spring
export const springScroll = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
};

// Stagger animation defaults
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springDefault,
  },
};

// Fade in from below (common pattern)
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Parallax config
export const parallaxConfig = {
  travelRange: 50,
  smoothing: 0.1,
};
