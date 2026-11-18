'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Dot + lagging ring cursor. Grows and goes solid over anything interactive
 * (links, buttons, [data-cursor-hover]). Disabled on touch devices.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine)').matches;
    setEnabled(canHover);
    if (!canHover) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor-hover], input, textarea'
      );
      setHovering(!!el);
    };

    document.body.classList.add('cursor-none-fine');
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      document.body.classList.remove('cursor-none-fine');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-cyan-300"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-violet-300/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 54 : 32,
          height: hovering ? 54 : 32,
          backgroundColor: hovering ? 'rgba(236,72,153,0.15)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  );
}
