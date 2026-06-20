'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { experienceData } from '@/data/experience-data';
import SectionBg from './SectionBg';

type TimelineEntry = {
  kind: 'work' | 'edu';
  title: string;
  subtitle: string;
  meta: string;
  period: string;
  bullets: string[];
  tags?: string[];
};

const card =
  'rounded-2xl border border-violet-500/20 bg-[rgba(17,24,39,0.5)] backdrop-blur-md shadow-[0_8px_40px_rgba(99,102,241,0.12)]';

function buildTimeline(): TimelineEntry[] {
  const work: TimelineEntry[] = experienceData.work.map((j) => ({
    kind: 'work',
    title: j.role,
    subtitle: j.company,
    meta: j.location,
    period: j.period,
    bullets: j.achievements,
  }));
  const edu: TimelineEntry[] = experienceData.education.map((e) => ({
    kind: 'edu',
    title: e.degree,
    subtitle: e.institution,
    meta: `${e.location}${e.cgpa ? ` · CGPA ${e.cgpa}` : ''}`,
    period: e.period,
    bullets: e.achievements ?? [],
    tags: e.relevantCourses,
  }));
  return [...work, ...edu];
}

export default function ExperienceSection() {
  const entries = buildTimeline();

  return (
    <section
      id="experience"
      className="min-h-screen w-full relative px-4 sm:px-8 md:px-16 lg:px-24 pt-24 pb-12 overflow-hidden"
    >
      <SectionBg variant="beams" />
      <div className="container max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Experience &amp; Education
          </h2>
          <p className="text-violet-300/80 mt-3">My journey so far 🚀</p>
        </motion.div>

        <div className="relative pl-10 sm:pl-14">
          {/* glowing vertical line */}
          <motion.div
            className="absolute left-[14px] sm:left-[22px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-400 origin-top"
            style={{ boxShadow: '0 0 12px rgba(124,58,237,0.6)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <div className="space-y-8">
            {entries.map((e, idx) => (
              <motion.div
                key={`${e.title}-${idx}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.2, type: 'spring' }}
                  className="absolute -left-10 sm:-left-14 top-1 grid place-items-center w-8 h-8 rounded-full bg-[#0B1120] border-2 border-violet-400 text-violet-300 text-sm"
                  style={{ boxShadow: '0 0 16px rgba(124,58,237,0.6)' }}
                >
                  {e.kind === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                </motion.div>

                <div className={`${card} p-6 group hover:border-violet-400/40 transition-colors`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{e.title}</h3>
                    <span className="text-xs font-medium text-violet-200 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-fuchsia-300 font-medium">{e.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-4">{e.meta}</p>

                  {e.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {e.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {e.tags && e.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
