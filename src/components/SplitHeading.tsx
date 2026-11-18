'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/** Splits a heading into words and reveals them with a staggered rise + blur on scroll-into-view. */
export default function SplitHeading({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}) {
  // Observe the static (untransformed) wrapper, not the sliding word spans
  // themselves — a word starts translated out of its own overflow-hidden
  // mask, so watching its own clipped box would never report "in view".
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });

  const words = text.split(' ');

  return (
    <Tag className={className} style={{ display: 'inline-block' }}>
      <span className="sr-only">{text}</span>
      <span
        ref={containerRef}
        aria-hidden
        className="inline-flex flex-wrap justify-center gap-x-[0.3em]"
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden py-1 leading-tight inline-block">
            <motion.span
              initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
              animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : undefined}
              transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
