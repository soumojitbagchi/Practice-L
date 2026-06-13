import { motion } from 'framer-motion';

export default function Badge({ text, variants }) {
  return (
    <motion.div
      variants={variants}
      className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
    >
      <span className="text-sm font-medium text-zinc-300">{text}</span>
    </motion.div>
  );
}
