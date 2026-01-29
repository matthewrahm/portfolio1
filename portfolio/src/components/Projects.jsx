import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/content';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
