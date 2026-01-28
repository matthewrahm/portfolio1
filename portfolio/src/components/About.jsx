import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { about } from '../data/content';
import StaggeredText from './effects/StaggeredText';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-8">
            About
          </h2>
          <StaggeredText
            text={about.bio}
            className="text-lg md:text-xl text-[#888888] leading-relaxed"
            wordDelay={0.05}
            initialDelay={0.2}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 text-[#666666]"
          >
            {about.school}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
