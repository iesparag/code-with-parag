'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['#a78bfa', '#22d3ee', '#f472b6', '#fbbf24', '#34d399'];

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: number;
  delay: number;
  isDot: boolean;
};

function makeParticles(count = 20): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 70 + Math.random() * 90;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20, // slight upward bias, like a pop
      rotate: (Math.random() - 0.5) * 420,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 7,
      delay: Math.random() * 0.08,
      isDot: i % 3 === 0,
    };
  });
}

/** One-shot confetti pop, re-triggered any time `burstKey` changes. */
export default function ConfettiBurst({ burstKey }: { burstKey: number }) {
  const particles = useMemo(() => makeParticles(), [burstKey]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <AnimatePresence>
        {burstKey > 0 && (
          <motion.div key={burstKey} className="relative h-0 w-0">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className={p.isDot ? 'absolute rounded-full' : 'absolute rounded-[2px]'}
                style={{ width: p.size, height: p.size, background: p.color }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
                animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 1 }}
                transition={{ duration: 0.75, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
            {/* a quick little "pop" glow at the center to sell the celebration beat */}
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 16, height: 16, background: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)' }}
              initial={{ scale: 0.4, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
