'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects } from '@/data/portfolio-data';
import SectionBg from './SectionBg';

type Project = (typeof projects)[number];

function CardFace({ project, active, index }: { project: Project; active: boolean; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-violet-500/25 bg-[rgba(17,24,39,0.75)] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* gradient border glow when active */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 blur-[2px] transition-opacity duration-300 ${
          active ? 'opacity-70' : 'opacity-0'
        }`}
      />
      <div className="relative rounded-2xl overflow-hidden">
        <span className="absolute top-3 left-3 z-20 w-8 h-8 grid place-items-center rounded-lg bg-black/40 backdrop-blur text-violet-200 text-sm font-mono border border-violet-500/30">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative h-44 sm:h-48 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={project.video}
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
              >
                {tag}
              </span>
            ))}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition-opacity"
            >
              <FaExternalLinkAlt className="text-xs" /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const count = projects.length;
  const [current, setCurrent] = useState(0);

  const go = (dir: number) => setCurrent((c) => (c + dir + count) % count);

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
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            Featured Projects
          </h2>
          <p className="text-lg text-violet-300/80">Drag, swipe or use the arrows to explore ✨</p>
        </motion.div>

        {/* 3D coverflow stage */}
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
