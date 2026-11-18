'use client';

import { motion } from 'framer-motion';

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
  const words = text.split(' ');

  return (
    <Tag className={className} style={{ display: 'inline-block' }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden py-1 leading-tight">
            <motion.span
              initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.8 }}
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
