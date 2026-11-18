'use client';

/** Infinite horizontal ticker band — the "premium agency site" signature strip. */
export default function MarqueeStrip({
  items,
  speed = 28,
}: {
  items: string[];
  speed?: number;
}) {
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-violet-500/15 bg-white/[0.02] py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0B1120] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0B1120] to-transparent z-10" />
      <div
        className="flex w-max items-center gap-10 marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-lg md:text-xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 whitespace-nowrap"
          >
            {item}
            <span className="text-violet-500/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
