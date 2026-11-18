'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaTrophy, FaStar } from 'react-icons/fa';
import { experienceData } from '@/data/experience-data';
import SectionBg from './SectionBg';
import SplitHeading from './SplitHeading';
import SpotlightCard from './SpotlightCard';

type Accent = 'violet' | 'cyan';

type TimelineEntry = {
  title: string;
  subtitle: string;
  location: string;
  period: string;
  badge?: string; // e.g. CGPA, a standout stat
  bullets: string[];
  tags?: string[];
};

const ACCENTS: Record<Accent, { border: string; glow: string; text: string; chip: string; dot: string }> = {
  violet: {
    border: 'border-violet-500/20 hover:border-violet-400/50',
    glow: 'rgba(124,58,237,0.55)',
    text: 'text-fuchsia-300',
    chip: 'text-violet-200 bg-violet-500/15 border-violet-500/30',
    dot: 'bg-fuchsia-400',
  },
  cyan: {
    border: 'border-cyan-500/20 hover:border-cyan-400/50',
    glow: 'rgba(34,211,238,0.55)',
    text: 'text-cyan-300',
    chip: 'text-cyan-200 bg-cyan-500/15 border-cyan-500/30',
    dot: 'bg-cyan-400',
  },
};

const card = 'rounded-2xl border bg-[rgba(17,24,39,0.5)] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.25)]';

function Timeline({
  entries,
  accent,
  icon,
}: {
  entries: TimelineEntry[];
  accent: Accent;
  icon: React.ReactNode;
}) {
  const a = ACCENTS[accent];

  return (
    <div className="relative pl-10 sm:pl-14">
      <motion.div
        className={`absolute left-[14px] sm:left-[22px] top-2 bottom-2 w-[2px] origin-top ${
          accent === 'violet'
            ? 'bg-gradient-to-b from-violet-500 to-fuchsia-500'
            : 'bg-gradient-to-b from-cyan-400 to-teal-400'
        }`}
        style={{ boxShadow: `0 0 12px ${a.glow}` }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
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
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 + 0.2, type: 'spring' }}
              className={`absolute -left-10 sm:-left-14 top-1 grid place-items-center w-8 h-8 rounded-full bg-[#0B1120] border-2 text-sm ${
                accent === 'violet' ? 'border-violet-400 text-violet-300' : 'border-cyan-400 text-cyan-300'
              }`}
              style={{ boxShadow: `0 0 16px ${a.glow}` }}
            >
              {icon}
            </motion.div>

            <SpotlightCard className={`${card} ${a.border} p-6 group transition-colors`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">{e.title}</h3>
                <div className="flex items-center gap-2">
                  {e.badge && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${a.chip}`}
                    >
                      <FaTrophy className="text-[10px]" /> {e.badge}
                    </span>
                  )}
                  <span className="text-xs font-medium text-gray-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {e.period}
                  </span>
                </div>
              </div>
              <p className={`font-medium ${a.text}`}>{e.subtitle}</p>
              <p className="text-sm text-gray-400 mb-4">{e.location}</p>

              {e.bullets.length > 0 && (
                <ul className="space-y-2">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                      <FaStar className={`mt-[3px] text-[10px] shrink-0 ${a.text}`} />
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
                      className={`px-2.5 py-1 text-xs rounded-md border ${
                        accent === 'violet'
                          ? 'bg-violet-500/10 text-violet-300 border-violet-500/20'
                          : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SubHeading({ icon, title, accent }: { icon: React.ReactNode; title: string; accent: Accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-6 pl-1"
    >
      <span
        className={`grid place-items-center w-9 h-9 rounded-xl border text-base ${
          accent === 'violet'
            ? 'border-violet-400/40 bg-violet-500/10 text-violet-300'
            : 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300'
        }`}
      >
        {icon}
      </span>
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const work: TimelineEntry[] = experienceData.work.map((j) => ({
    title: j.role,
    subtitle: j.company,
    location: j.location,
    period: j.period,
    bullets: j.achievements,
  }));
  const edu: TimelineEntry[] = experienceData.education.map((e) => ({
    title: e.degree,
    subtitle: e.institution,
    location: e.location,
    period: e.period,
    badge: e.cgpa ? `CGPA ${e.cgpa}` : undefined,
    bullets: e.achievements ?? [],
    tags: e.relevantCourses,
  }));

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
          <SplitHeading
            text="Experience & Education"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
          />
          <p className="text-violet-300/80 mt-3">My journey so far 🚀</p>
        </motion.div>

        <SubHeading icon={<FaBriefcase />} title="Work Experience" accent="violet" />
        <Timeline entries={work} accent="violet" icon={<FaBriefcase />} />

        <div className="h-16" />

        <SubHeading icon={<FaGraduationCap />} title="Education" accent="cyan" />
        <Timeline entries={edu} accent="cyan" icon={<FaGraduationCap />} />
      </div>
    </section>
  );
}
