'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowDown } from 'react-icons/fa';
import { personalInfo, socialLinks } from '@/data/portfolio-data';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const ROLES = [
  'Full Stack MERN Developer',
  'GenAI & Agentic AI Explorer',
  'Python Developer',
  'Turning Ideas into Products',
];

/** Lightweight typewriter that cycles through ROLES. */
function useTypewriter() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === full) delay = 1500;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      } else {
        setText(full.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  return text;
}

export default function HeroSection() {
  const typed = useTypewriter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const rotateX = useTransform(y, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.x + rect.width / 2;
    const cy = rect.y + rect.height / 2;
    mouseX.set((e.clientX - cx) / (rect.width / 2));
    mouseY.set((e.clientY - cy) / (rect.height / 2));
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12"
    >
      {/* live 3D background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div
        className="container mx-auto px-4 pt-32 relative z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:pl-8 lg:pl-12">
          {/* LEFT */}
          <motion.div style={{ perspective: 1000, rotateX, rotateY }} className="text-center md:text-left">
            {/* availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for freelance &amp; full-time
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-violet-300/80 mb-2"
            >
              👋 Hi, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 mb-4 leading-tight"
            >
              {personalInfo.name}
            </motion.h1>

            {/* typewriter */}
            <div className="h-9 md:h-10 mb-6">
              <span className="text-xl md:text-2xl font-mono text-cyan-300">
                {typed}
                <span className="ml-0.5 animate-pulse text-fuchsia-400">|</span>
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto md:mx-0"
            >
              I build scalable web apps with the <span className="text-violet-300">MERN stack &amp; Python</span>,
              and craft intelligent experiences with <span className="text-cyan-300">GenAI, RAG &amp; AI Agents</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_8px_30px_rgba(124,58,237,0.4)] hover:shadow-[0_8px_40px_rgba(124,58,237,0.6)] transition-shadow"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-xl font-medium text-violet-200 border border-violet-500/40 bg-violet-500/5 hover:bg-violet-500/15 transition-colors"
              >
                Contact Me
              </motion.a>

              <div className="flex gap-3 ml-1">
                {[
                  { href: socialLinks.github, icon: <FaGithub />, label: 'GitHub' },
                  { href: socialLinks.linkedin, icon: <FaLinkedin />, label: 'LinkedIn' },
                  { href: socialLinks.whatsapp, icon: <FaWhatsapp />, label: 'WhatsApp' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="grid place-items-center w-11 h-11 rounded-xl border border-violet-500/30 bg-white/5 text-xl text-violet-200 hover:text-white hover:border-violet-400/60 transition-colors"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — image with orbit rings */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ perspective: 1000, rotateX, rotateY }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* rotating gradient ring */}
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #7c3aed, #22d3ee, #f472b6, #7c3aed)',
                  WebkitMask: 'radial-gradient(circle, transparent 64%, #000 65%)',
                  mask: 'radial-gradient(circle, transparent 64%, #000 65%)',
                  opacity: 0.7,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-dashed border-violet-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-2xl" />
                <Image
                  src="/hero-image.png"
                  alt={personalInfo.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain [filter:drop-shadow(0_10px_30px_rgba(124,58,237,0.35))]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 1.6, repeat: Infinity } }}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 text-violet-300/70 hover:text-violet-200 flex flex-col items-center gap-1 text-sm"
        >
          Scroll
          <FaArrowDown />
        </motion.a>
      </div>
    </section>
  );
}
