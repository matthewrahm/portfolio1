import { motion } from 'framer-motion';

export default function ProjectCard({ name, description, impact, tags, category, liveUrl, githubUrl, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card rounded-lg p-6 group"
    >
      {/* Category badge */}
      {category && (
        <span className="inline-block px-3 py-1 text-xs font-medium text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 rounded-full mb-4">
          {category}
        </span>
      )}

      <h3 className="text-xl font-semibold text-[#fafafa] mb-2 group-hover:text-[#10b981] transition-colors">
        {name}
      </h3>
      <p className="text-[#888888] mb-2">{description}</p>
      <p className="text-sm text-[#666666] mb-4">{impact}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium text-[#888888] glass-tag rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {liveUrl && liveUrl !== '#' && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#10b981] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live
          </a>
        )}
        {githubUrl && githubUrl !== '#' && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#10b981] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
            GitHub
          </a>
        )}
        {(!liveUrl || liveUrl === '#') && (!githubUrl || githubUrl === '#') && (
          <span className="text-sm text-[#666666]">Links coming soon</span>
        )}
      </div>
    </motion.div>
  );
}
