'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { skillsData } from '@/data/skills-data';

// three.js canvas must be client-only (no SSR)
const SkillGalaxy = dynamic(() => import('./SkillGalaxy'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] sm:h-[640px] flex items-center justify-center">
      <span className="text-violet-300/70 animate-pulse">Initializing skill galaxy…</span>
    </div>
  ),
});

const CATEGORY_LEGEND: { key: string; color: string }[] = [
  { key: 'frontend', color: '#a78bfa' },
  { key: 'backend', color: '#22d3ee' },
  { key: 'tools', color: '#f472b6' },
  { key: 'other', color: '#34d399' },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-screen pt-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
            Skills &amp; Technologies
          </h2>
          <p className="text-lg text-violet-300/80">
            An interactive galaxy of everything I build with — drag to explore 🌌
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
          style={{
            maskImage:
              'radial-gradient(ellipse 75% 75% at 50% 50%, #000 60%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 75% at 50% 50%, #000 60%, transparent 100%)',
          }}
        >
          <SkillGalaxy />
        </motion.div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6">
          {CATEGORY_LEGEND.map(({ key, color }) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
              <span className="text-sm text-violet-200/80">
                {skillsData[key]?.title ?? key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
