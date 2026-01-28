import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../data/content';
import ExperienceCard from './ExperienceCard';
import Timeline, { TimelineItem } from './effects/Timeline';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-12"
        >
          Experience
        </motion.h2>

        <Timeline items={experience}>
          {experience.map((exp, index) => (
            <TimelineItem key={exp.company} index={index}>
              <ExperienceCard {...exp} index={index} expandable />
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
