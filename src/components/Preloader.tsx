'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Phase = 'idle' | 'counting' | 'welcome' | 'done';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Full-screen intro: counts 0→100 slowly, then crossfades into a "Welcome"
 * message before the curtain lifts. Runs once per tab session (sessionStorage)
 * so repeat navigations aren't slowed down.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [display, setDisplay] = useState(0);

  // Drive the 0→100 count. Only a flag read here — the "played" flag itself
  // is written once the whole sequence actually finishes, below.
  useEffect(() => {
    if (sessionStorage.getItem('intro-played')) return;
    setPhase('counting');

    let cancelled = false;
    const start = performance.now();
    const duration = 2400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeInOutCubic(p) * 100));
      if (p < 1 && !cancelled) {
        raf = requestAnimationFrame(tick);
      } else if (!cancelled) {
        setPhase('welcome');
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hold on the welcome message, then finish.
  useEffect(() => {
    if (phase !== 'welcome') return;
    const t = setTimeout(() => {
      sessionStorage.setItem('intro-played', '1');
      setPhase('done');
    }, 1300);
    return () => clearTimeout(t);
  }, [phase]);

  const overlayVisible = phase === 'counting' || phase === 'welcome';

  useEffect(() => {
    document.body.style.overflow = overlayVisible ? 'hidden' : '';
  }, [overlayVisible]);

  return (
    <AnimatePresence>
      {overlayVisible && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[#0B1120]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence mode="wait">
            {phase === 'counting' && (
              <motion.div
                key="counting"
                className="flex flex-col items-center gap-4"
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.4, ease: 'easeIn' } }}
              >
                <motion.span
                  className="text-sm tracking-[0.4em] uppercase text-violet-300/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Parag Jain
                </motion.span>
                <div className="text-6xl md:text-7xl font-bold tabular-nums bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  {display}
                  <span className="text-2xl md:text-3xl align-top">%</span>
                </div>
                <div className="w-56 h-px bg-violet-500/20 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                    style={{ width: `${display}%` }}
                  />
                </div>
              </motion.div>
            )}

            {phase === 'welcome' && (
              <motion.div
                key="welcome"
                className="flex flex-col items-center gap-3 px-6 text-center"
                exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.45, ease: 'easeIn' } }}
              >
                <motion.span
                  className="text-4xl"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: [0, 18, -10, 18, 0] }}
                  transition={{ opacity: { duration: 0.3 }, rotate: { duration: 0.9, delay: 0.1 } }}
                >
                  👋
                </motion.span>

                <motion.p
                  className="text-base md:text-lg text-violet-300/80 tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Welcome, I&apos;m
                </motion.p>

                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  Parag Jain
                </motion.h1>

                <motion.p
                  className="text-sm md:text-base text-gray-400 max-w-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Step in — let&apos;s build something intelligent together ✨
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
