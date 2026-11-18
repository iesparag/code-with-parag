'use client';

import { useRef } from 'react';

/**
 * Wraps a card and paints a radial glow that follows the cursor via CSS vars,
 * updated through a ref-written style (no React state, no re-render per move).
 */
export default function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${clientY - rect.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`relative group/spotlight ${className ?? ''}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(167,139,250,0.18), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}
