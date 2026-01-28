import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ExperienceCard({ company, role, date, location, points, tags, index, expandable = false }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayPoints = expandable && !isExpanded ? points.slice(0, 2) : points;
  const hasMorePoints = expandable && points.length > 2;

  return (
    <motion.div
      className="glass-card rounded-lg p-6 relative overflow-hidden cursor-pointer"
      onClick={() => expandable && setIsExpanded(!isExpanded)}
      layout
    >
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-[#fafafa] flex items-center gap-2">
              {company}
              {expandable && (
                <motion.span
                  className="text-[#666666] text-sm"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              )}
            </h3>
            <p className="text-[#888888]">{role}</p>
          </div>
          <div className="text-sm text-[#666666] md:text-right">
            <p>{date}</p>
            <p>{location}</p>
          </div>
        </div>

        <motion.ul className="space-y-2 mb-4" layout>
          <AnimatePresence mode="sync">
            {displayPoints.map((point, i) => (
              <motion.li
                key={i}
                className="text-[#888888] text-sm flex items-start gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[#666666] mt-1.5">•</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {hasMorePoints && !isExpanded && (
          <p className="text-xs text-[#666666] mb-4">
            Click to see {points.length - 2} more...
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-[#888888] glass-tag rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
