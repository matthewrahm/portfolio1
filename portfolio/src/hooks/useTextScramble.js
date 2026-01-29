import { useState, useEffect, useRef } from 'react';

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}';

export default function useTextScramble(targetText, {
  delay = 300,
  scrambleDuration = 50,
  revealInterval = 80,
  characters = DEFAULT_CHARACTERS,
} = {}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const revealedCount = useRef(0);
  const scrambleTimer = useRef(null);
  const revealTimer = useRef(null);
  const delayTimer = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayText(targetText);
      setIsComplete(true);
      return;
    }

    revealedCount.current = 0;
    setIsComplete(false);

    const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

    const buildDisplay = () => {
      let result = '';
      for (let i = 0; i < targetText.length; i++) {
        if (i < revealedCount.current) {
          result += targetText[i];
        } else if (targetText[i] === ' ') {
          result += ' ';
        } else {
          result += getRandomChar();
        }
      }
      return result;
    };

    delayTimer.current = setTimeout(() => {
      // Start scramble cycling
      scrambleTimer.current = setInterval(() => {
        setDisplayText(buildDisplay());
      }, scrambleDuration);

      // Start revealing characters left-to-right
      revealTimer.current = setInterval(() => {
        // Skip spaces
        while (
          revealedCount.current < targetText.length &&
          targetText[revealedCount.current] === ' '
        ) {
          revealedCount.current++;
        }

        revealedCount.current++;

        if (revealedCount.current >= targetText.length) {
          clearInterval(scrambleTimer.current);
          clearInterval(revealTimer.current);
          setDisplayText(targetText);
          setIsComplete(true);
        }
      }, revealInterval);
    }, delay);

    return () => {
      clearTimeout(delayTimer.current);
      clearInterval(scrambleTimer.current);
      clearInterval(revealTimer.current);
    };
  }, [targetText, delay, scrambleDuration, revealInterval, characters]);

  return { displayText, isComplete };
}
