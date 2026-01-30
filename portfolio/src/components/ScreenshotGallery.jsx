import { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrowserMockup from './BrowserMockup';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const ScreenshotGallery = forwardRef(function ScreenshotGallery({ screenshots, reducedMotion }, ref) {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = useCallback((newDirection) => {
    setPage(([prev]) => {
      const next = prev + newDirection;
      if (next < 0 || next >= screenshots.length) return [prev, 0];
      return [next, newDirection];
    });
  }, [screenshots.length]);

  const goTo = useCallback((index) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  useImperativeHandle(ref, () => ({
    prev: () => paginate(-1),
    next: () => paginate(1),
  }), [paginate]);

  const current = screenshots[currentIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Gallery viewport */}
      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={reducedMotion ? undefined : slideVariants}
            initial={reducedMotion ? { opacity: 0 } : 'enter'}
            animate={reducedMotion ? { opacity: 1 } : 'center'}
            exit={reducedMotion ? { opacity: 0 } : 'exit'}
            transition={reducedMotion ? { duration: 0.2 } : { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <BrowserMockup url={current.caption}>
              <img
                src={current.src}
                alt={current.alt}
                className="w-full h-auto block"
                draggable={false}
              />
            </BrowserMockup>
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next arrows */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-card flex items-center justify-center text-[#888] hover:text-[#10b981] hover:border-[#10b981]/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
              aria-label="Previous screenshot"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={currentIndex === screenshots.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-card flex items-center justify-center text-[#888] hover:text-[#10b981] hover:border-[#10b981]/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
              aria-label="Next screenshot"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <p className="text-sm text-[#888] text-center" aria-live="polite">
        {current.caption}
      </p>

      {/* Dot indicators */}
      {screenshots.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`gallery-dot ${i === currentIndex ? 'gallery-dot-active' : ''}`}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ScreenshotGallery;
