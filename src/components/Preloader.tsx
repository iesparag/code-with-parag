'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Full-screen intro: counts 0→100 then wipes away, revealing the page.
 * Runs once per tab session (sessionStorage) so repeat navigations aren't slowed down.
 */
export default function Preloader() {
  const [done, setDone] = useState(true);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('intro-played')) return;
    setDone(false);

    let cancelled = false;
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setDisplay(Math.round(eased * 100));
      if (p < 1 && !cancelled) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('intro-played', '1');
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-[#0B1120]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
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
            <div className="w-56 h-px bg-violet-500/20 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                style={{ width: `${display}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
