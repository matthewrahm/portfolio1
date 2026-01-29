import { motion } from 'framer-motion';

export default function ProjectCard({ name, description, impact, highlights, tags, category, featured, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative rounded-xl ${featured ? 'md:row-span-2' : ''}`}
    >
      {/* Card content */}
      <div className={`relative glass-card rounded-xl p-6 h-full flex flex-col
        ${featured ? 'md:p-8' : ''}`}
      >
        {/* Category badge */}
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 rounded-full mb-4">
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

        {/* Tags pushed to bottom */}
        <div className="flex flex-wrap gap-2 mt-auto">
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
