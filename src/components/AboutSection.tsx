'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { aboutData } from '@/data/about-data';
import SectionBg from './SectionBg';

/** Animate the numeric part of a stat string like "2.5+" or "10+". */
function StatValue({ value, inView }: { value: string; inView: boolean }) {
  const match = value.match(/([\d.]+)(.*)/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? 1 : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <>
      {n.toFixed(decimals)}
      {suffix}
    </>
  );
}

const card =
  'rounded-2xl border border-violet-500/20 bg-[rgba(17,24,39,0.5)] backdrop-blur-md shadow-[0_8px_40px_rgba(99,102,241,0.12)]';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="pt-24 pb-12 w-full relative overflow-hidden">
      <SectionBg variant="dots" />
      <div className="container max-w-6xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile image (tall) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${card} lg:row-span-2 overflow-hidden group relative`}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={aboutData.avatar}
                alt={aboutData.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-2xl font-bold text-white">{aboutData.name}</h3>
                <p className="text-violet-300">{aboutData.role}</p>
                <p className="text-sm text-gray-400 mt-1">📍 {aboutData.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${card} lg:col-span-2 p-7`}
          >
            <p className="text-sm font-mono text-cyan-300/80 mb-3">// who am I</p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {aboutData.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {aboutData.highlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1.5 text-sm rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-200"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aboutData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`${card} p-5 text-center`}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tabular-nums">
                  <StatValue value={stat.value} inView={inView} />
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
