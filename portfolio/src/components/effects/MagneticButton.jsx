import { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springMagnetic } from '../../config/motion';

/**
 * Physics-based magnetic attraction wrapper
 * Buttons pull toward cursor within specified radius
 * Elastic snap-back on mouse leave
 */
export default function MagneticButton({
  children,
  className = '',
  radius = 150,
  strength = 0.4,
  as = 'div',
  ...props
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Spring values for smooth animation
  const x = useSpring(0, springMagnetic);
  const y = useSpring(0, springMagnetic);

  const handleMouseMove = useCallback((e) => {
    if (prefersReduced || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      // Calculate attraction based on distance (closer = stronger)
      const attractionFactor = (1 - distance / radius) * strength;
      x.set(distanceX * attractionFactor);
      y.set(distanceY * attractionFactor);
    }
  }, [prefersReduced, radius, strength, x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Snap back to center
    x.set(0);
    y.set(0);
  }, [x, y]);

  // If reduced motion, render without magnetic effect
  if (prefersReduced) {
    const Component = as;
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={`magnetic-button ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
