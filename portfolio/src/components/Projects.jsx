import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects, projectCategories } from '../data/content';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-3">
            Selected Works
          </h2>
          <p className="text-[#888888]">
            Projects I've built and shipped.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === category
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#16161e] text-[#888888] hover:text-[#fafafa] border border-[#262630] hover:border-[#10b981]/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.name} {...project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
