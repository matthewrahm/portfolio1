import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data/content';

const categoryLabels = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  web3: 'Web3',
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-12"
        >
          Skills
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-[#fafafa] mb-4">
                {categoryLabels[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)"
                    }}
                    transition={{ duration: 0.2 }}
                    className="px-3 py-1.5 text-sm text-[#888888] glass-tag rounded-full hover:text-[#fafafa] cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
