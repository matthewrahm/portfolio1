import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springSnappy, springSoft, staggerContainer, staggerItem } from '../config/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useScrollLock from '../hooks/useScrollLock';
import useFocusTrap from '../hooks/useFocusTrap';
import ScreenshotGallery from './ScreenshotGallery';

export default function ProjectShowcase({ project, onClose }) {
  const galleryRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const trapRef = useFocusTrap(!!project);
  useScrollLock(!!project);

  const handleKeyDown = useCallback((e) => {
    if (!project) return;
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      galleryRef.current?.prev();
    } else if (e.key === 'ArrowRight') {
      galleryRef.current?.next();
    }
  }, [project, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const { showcase } = project || {};

  return (
    <AnimatePresence>
      {project && showcase && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 showcase-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', ...springSoft }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${project.name} showcase`}
              layoutId={reducedMotion ? undefined : `project-${project.name}`}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card pointer-events-auto"
              style={{
                boxShadow: '0 0 60px rgba(16, 185, 129, 0.15), 0 0 120px rgba(16, 185, 129, 0.05)',
              }}
              initial={reducedMotion ? { opacity: 0 } : undefined}
              animate={reducedMotion ? { opacity: 1 } : undefined}
              exit={reducedMotion ? { opacity: 0 } : undefined}
              transition={reducedMotion ? { duration: 0.2 } : springSnappy}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-card flex items-center justify-center text-[#888] hover:text-[#10b981] hover:border-[#10b981]/30 transition-colors"
                aria-label="Close showcase"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content layout */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8">
                {/* Gallery — 60% on desktop */}
                <motion.div
                  className="w-full md:w-[60%] shrink-0"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={reducedMotion ? { duration: 0.2 } : { ...springSoft, delay: 0.2 }}
                >
                  <ScreenshotGallery
                    ref={galleryRef}
                    screenshots={showcase.screenshots}
                    reducedMotion={reducedMotion}
                  />
                </motion.div>

                {/* Details — 40% on desktop */}
                <motion.div
                  className="flex-1 flex flex-col gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delayChildren: 0.3 }}
                >
                  <motion.div variants={staggerItem}>
                    {project.category && (
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 rounded-full mb-3">
                        {project.category}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-2">
                      {project.name}
                    </h2>
                    <p className="text-[#888] leading-relaxed">
                      {showcase.detailedDescription}
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <h3 className="text-sm font-semibold text-[#fafafa] uppercase tracking-wider mb-2">
                      Key Features
                    </h3>
                    <ul className="space-y-1.5 text-sm text-[#888]">
                      {showcase.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#10b981] mt-0.5 shrink-0">&#8226;</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium text-[#888] glass-tag rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {project.link && (
                    <motion.div variants={staggerItem} className="mt-auto pt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#0a0a0f] bg-[#10b981] hover:bg-[#34d399] rounded-lg transition-colors"
                      >
                        View Live
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
