'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaRocket } from 'react-icons/fa';
import { projects } from '@/data/portfolio-data';
import SectionBg from './SectionBg';
import SplitHeading from './SplitHeading';
import SpotlightCard from './SpotlightCard';

type Project = (typeof projects)[number];

// Each card gets its own accent instead of every card repeating the same
// violet→fuchsia→cyan wash — keeps the carousel feeling distinct card to card.
const ACCENTS = [
  { from: '#a78bfa', to: '#22d3ee', ring: 'rgba(167,139,250,0.45)', chip: 'text-violet-300 bg-violet-500/10 border-violet-500/25', solid: 'from-violet-600 to-cyan-500' },
  { from: '#22d3ee', to: '#34d399', ring: 'rgba(34,211,238,0.45)', chip: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/25', solid: 'from-cyan-500 to-emerald-500' },
  { from: '#f472b6', to: '#a78bfa', ring: 'rgba(244,114,182,0.45)', chip: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/25', solid: 'from-fuchsia-600 to-violet-600' },
  { from: '#fbbf24', to: '#f472b6', ring: 'rgba(251,191,36,0.4)', chip: 'text-amber-300 bg-amber-500/10 border-amber-500/25', solid: 'from-amber-500 to-fuchsia-600' },
];

const TAG_LIMIT = 4;

function CardFace({ project, active, index }: { project: Project; active: boolean; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const accent = ACCENTS[index % ACCENTS.length];
  const shownTags = project.tags.slice(0, TAG_LIMIT);
  const extraCount = project.tags.length - shownTags.length;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <SpotlightCard
      className="rounded-2xl overflow-hidden border bg-[#0d1326] transition-colors duration-300"
      style={{
        borderColor: active ? accent.ring : 'rgba(124,58,237,0.18)',
        boxShadow: active ? `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px ${accent.ring}, 0 0 32px -8px ${accent.ring}` : '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <div className="relative rounded-2xl overflow-hidden">
        <span
          className="absolute top-3 left-3 z-20 w-8 h-8 grid place-items-center rounded-lg bg-black/50 backdrop-blur text-sm font-mono font-bold border"
          style={{ color: accent.from, borderColor: accent.ring }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative h-40 sm:h-44 overflow-hidden">
          {project.video ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={project.video}
              loop
              muted
              playsInline
            />
          ) : (
            <div
              className="w-full h-full grid place-items-center"
              style={{ background: `linear-gradient(135deg, ${accent.from}33, ${accent.to}1a)` }}
            >
              <span className="px-5 text-center text-lg sm:text-xl font-semibold text-white/90 leading-snug">
                {project.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1326] via-[#0d1326]/10 to-transparent" />
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {shownTags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs rounded-full border ${accent.chip}`}
              >
                {tag}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="px-2.5 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-gray-400">
                +{extraCount} more
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={active ? 0 : -1}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <FaGithub /> Code
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={active ? 0 : -1}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${accent.solid} hover:opacity-90 transition-opacity`}
            >
              <FaExternalLinkAlt className="text-xs" /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function ProjectsSection() {
  const count = projects.length;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [launchId, setLaunchId] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);
    setLaunchId((id) => id + 1);
    setCurrent((c) => (c + dir + count) % count);
  };

  return (
    <section
      id="projects"
      className="min-h-screen w-full relative px-4 sm:px-8 md:px-16 lg:px-24 pt-24 pb-12 overflow-hidden"
    >
      <SectionBg variant="spotlight" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SplitHeading
            text="Featured Projects"
            className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400"
          />
          <p className="text-lg text-violet-300/80">Drag, swipe or use the arrows to explore ✨</p>
        </motion.div>

        {/* Wraps the 3D stage + the rocket overlay. The rocket is kept OUTSIDE the
            perspective div below: Chromium paints preserve-3d descendants in their
            own compositing layer, which can sit above a 2D sibling regardless of
            z-index — so the rocket needs to not share that 3D containing block. */}
        <div className="relative">
          <div className="relative" style={{ perspective: '1400px' }}>
          <motion.div
            className="relative h-[460px] sm:h-[480px] flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            {projects.map((project, index) => {
              let offset = index - current;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;
              const active = offset === 0;
              const abs = Math.abs(offset);

              return (
                <motion.div
                  key={project.title}
                  className="absolute w-[280px] sm:w-[360px] cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    x: offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 300),
                    rotateY: offset * -34,
                    scale: active ? 1 : 0.82,
                    opacity: abs <= 1 ? (active ? 1 : 0.55) : 0,
                    zIndex: 10 - abs,
                    filter: active ? 'blur(0px)' : 'blur(2px)',
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  onClick={() => !active && setCurrent(index)}
                >
                  <CardFace project={project} active={active} index={index} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-11 h-11 rounded-full bg-white/5 border border-violet-500/30 text-violet-200 hover:bg-violet-500/20 hover:scale-110 transition-all"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-11 h-11 rounded-full bg-white/5 border border-violet-500/30 text-violet-200 hover:bg-violet-500/20 hover:scale-110 transition-all"
          >
            <FaChevronRight />
          </button>
          </div>

          {/* rocket-launch transition effect when switching projects. Deliberately a
              sibling of the perspective div above, not a descendant — see the note
              on the outer wrapper. Flight uses vw units (relative to the real
              viewport); the outer <section> still clips the far edges. */}
          <div className="pointer-events-none absolute inset-0 z-30">
            <AnimatePresence>
              {launchId > 0 && (
                <motion.div
                  key={launchId}
                  data-rocket="true"
                  // FaRocket's artwork already points up-and-right by default — for
                  // forward travel (also up-and-right) it needs no rotation at all.
                  // For reverse travel we mirror horizontally (not rotate), which
                  // turns "up-right" into "up-left" and flips the trail along with it.
                  className="absolute top-1/2 left-1/2"
                  initial={{
                    x: direction > 0 ? '-42vw' : '42vw',
                    y: 40,
                    opacity: 0,
                  }}
                  animate={{
                    x: direction > 0 ? '42vw' : '-42vw',
                    y: -40,
                    opacity: [0, 1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: 'easeIn',
                    opacity: { duration: 0.65, times: [0, 0.15, 0.8, 1] },
                  }}
                >
                  <div className="relative" style={{ transform: direction < 0 ? 'scaleX(-1)' : undefined }}>
                    {/* exhaust trail, fixed at the angle opposite the icon's default
                        up-right-pointing nose (135deg clockwise from due east) */}
                    <div
                      className="absolute top-1/2 left-1/2 h-1 w-[70px] rounded-full bg-gradient-to-r from-cyan-300/80 to-transparent blur-[1px]"
                      style={{ transformOrigin: 'left center', transform: 'translateY(-50%) rotate(135deg)' }}
                    />
                    <FaRocket className="relative text-3xl sm:text-4xl text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* dots */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setCurrent(i)}
              aria-label={`Go to ${p.title}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'w-2 bg-violet-500/30 hover:bg-violet-500/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
