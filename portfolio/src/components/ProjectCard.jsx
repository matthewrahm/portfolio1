import { motion } from 'framer-motion';

export default function ProjectCard({ name, description, impact, highlights, tags, category, featured, link, index, onClick, hasShowcase }) {
  const handleKeyDown = (e) => {
    if (hasShowcase && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      layout
      layoutId={`project-${name}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative rounded-xl ${featured ? 'md:row-span-2' : ''} ${hasShowcase ? 'cursor-pointer' : ''}`}
      onClick={hasShowcase ? onClick : undefined}
      onKeyDown={hasShowcase ? handleKeyDown : undefined}
      role={hasShowcase ? 'button' : undefined}
      tabIndex={hasShowcase ? 0 : undefined}
      aria-label={hasShowcase ? `View ${name} showcase` : undefined}
    >
      {/* Expand icon for showcase cards */}
      {hasShowcase && (
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-7 h-7 rounded-md btn-depth flex items-center justify-center text-[#888] group-hover:text-[#10b981]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      )}

      {/* Card content */}
      <div className={`relative glass-card rounded-xl p-6 h-full flex flex-col
        ${featured ? 'md:p-8' : ''}`}
      >
        {/* Category badge */}
        {category && (
          <span className="inline-block px-3 py-1.5 text-xs font-medium text-[#10b981] bg-gradient-to-b from-[#142E24] to-[#0F2319] border border-[#10b981]/20 rounded-full mb-4 pill-raised">
            {category}
          </span>
        )}

        <h3 className={`font-semibold text-[#fafafa] mb-2 group-hover:text-[#10b981] transition-colors
          ${featured ? 'text-2xl' : 'text-xl'}`}>
          {name}
        </h3>
        <p className="text-[#888888] mb-2">{description}</p>
        <p className="text-sm text-[#666666] mb-4">{impact}</p>

        {highlights && highlights.length > 0 && (
          <ul className="space-y-1.5 mb-4 text-sm text-[#888888]">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#10b981] mt-0.5 shrink-0">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags and link pushed to bottom */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-[#888888] glass-tag rounded-full"
            >
              {tag}
            </span>
          ))}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10b981] btn-depth-accent-soft rounded-full"
            >
              Live Demo
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
