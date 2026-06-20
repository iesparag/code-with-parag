'use client';

import { motion } from 'framer-motion';

type Variant = 'dots' | 'grid' | 'beams' | 'rings' | 'spotlight';

const fade =
  'radial-gradient(ellipse 75% 70% at 50% 40%, #000 35%, transparent 100%)';

function Blob({
  color,
  className,
  dur = 20,
  move = [0, 60, 0],
}: {
  color: string;
  className: string;
  dur?: number;
  move?: number[];
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[110px] ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 60%)` }}
      animate={{ x: move, y: [0, -40, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function SectionBg({ variant }: { variant: Variant }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {variant === 'dots' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(rgba(167,139,250,0.22) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage: fade,
              WebkitMaskImage: fade,
            }}
          />
          <Blob color="rgba(124,58,237,0.18)" className="h-[28rem] w-[28rem] -top-20 -left-20" />
          <Blob color="rgba(34,211,238,0.14)" className="h-[24rem] w-[24rem] bottom-0 right-0" dur={26} move={[0, -50, 0]} />
        </>
      )}

      {variant === 'grid' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: fade,
              WebkitMaskImage: fade,
            }}
          />
          <Blob color="rgba(34,211,238,0.16)" className="h-[26rem] w-[26rem] top-10 left-1/4" />
          <Blob color="rgba(52,211,153,0.12)" className="h-[22rem] w-[22rem] bottom-0 right-10" dur={24} />
        </>
      )}

      {variant === 'beams' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(244,114,182,0.10) 1px, transparent 1px)',
              backgroundSize: '90px 100%',
              maskImage: fade,
              WebkitMaskImage: fade,
            }}
          />
          <Blob color="rgba(217,70,239,0.16)" className="h-[26rem] w-[26rem] top-0 -left-10" />
          <Blob color="rgba(124,58,237,0.14)" className="h-[24rem] w-[24rem] bottom-10 right-1/4" dur={28} move={[0, 40, 0]} />
        </>
      )}

      {variant === 'rings' && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[280, 460, 640, 820].map((s, i) => (
              <motion.div
                key={s}
                className="absolute rounded-full border border-violet-500/10"
                style={{ width: s, height: s, left: -s / 2, top: -s / 2 }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <Blob color="rgba(124,58,237,0.16)" className="h-[26rem] w-[26rem] top-1/4 left-1/3" />
          <Blob color="rgba(34,211,238,0.12)" className="h-[22rem] w-[22rem] bottom-0 right-1/4" dur={24} />
        </>
      )}

      {variant === 'spotlight' && (
        <>
          <motion.div
            className="absolute h-[40rem] w-[40rem] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.22), transparent 60%)', top: '10%', left: '20%' }}
            animate={{ x: [0, 200, 0], y: [0, 80, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Blob color="rgba(244,114,182,0.12)" className="h-[24rem] w-[24rem] bottom-0 left-10" dur={28} />
        </>
      )}
    </div>
  );
}
