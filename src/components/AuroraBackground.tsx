'use client';

import { motion } from 'framer-motion';

/**
 * Global animated background: drifting aurora orbs + faint grid.
 * Sits behind everything (fixed, pointer-events-none).
 */
export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0B1120]">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.12) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)',
        }}
      />

      {/* aurora orbs */}
      <motion.div
        className="absolute -top-40 -left-32 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 60%)' }}
        animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.28), transparent 60%)' }}
        animate={{ x: [0, -70, 0], y: [0, 90, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.22), transparent 60%)' }}
        animate={{ x: [0, 60, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
