import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="section-divider">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="divider-line"
      />
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="divider-diamond mx-4"
      />
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="divider-line"
      />
    </div>
  );
}
