import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, staggerItem } from '../../config/motion';

/**
 * Word-by-word fade-up animation for text
 * 0.05s delay between words as specified
 */
export default function StaggeredText({
  text,
  className = '',
  as: Component = 'p',
  wordDelay = 0.05,
  initialDelay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  // Split text into words
  const words = text.split(' ');

  // If reduced motion, render plain text
  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component ref={ref} className={className}>
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: wordDelay,
              delayChildren: initialDelay,
            },
          },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                },
              },
            }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * Character-by-character staggered reveal
 */
export function StaggeredCharacters({
  text,
  className = '',
  as: Component = 'span',
  charDelay = 0.02,
  initialDelay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  // Split text into characters
  const characters = text.split('');

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component ref={ref} className={className}>
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: charDelay,
              delayChildren: initialDelay,
            },
          },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                },
              },
            }}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * Line-by-line staggered reveal
 */
export function StaggeredLines({
  children,
  className = '',
  lineDelay = 0.1,
  initialDelay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  // Convert children to array
  const lines = Array.isArray(children) ? children : [children];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: lineDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 20,
              },
            },
          }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}
