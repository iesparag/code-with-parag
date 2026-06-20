'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaStar, FaCodeBranch, FaUsers, FaUserPlus } from 'react-icons/fa';
import { socialLinks } from '@/data/portfolio-data';
import SectionBg from './SectionBg';

const GH_USER = 'iesparag';

type LiveStats = {
  repos: number;
  stars: number;
  followers: number;
  following: number;
};

/** Count-up animation that triggers when scrolled into view. */
function Counter({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <>{display.toLocaleString()}</>;
}

const STAT_META: { key: keyof LiveStats; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'repos', label: 'Repositories', icon: <FaCodeBranch />, color: '#a78bfa' },
  { key: 'stars', label: 'Total Stars', icon: <FaStar />, color: '#22d3ee' },
  { key: 'followers', label: 'Followers', icon: <FaUsers />, color: '#f472b6' },
  { key: 'following', label: 'Following', icon: <FaUserPlus />, color: '#34d399' },
];

export default function GitHubSection() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`),
          fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`),
        ]);
        if (!u.ok || !r.ok) return;
        const user = await u.json();
        const repos = await r.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count ?? 0), 0)
          : 0;
        if (!cancelled) {
          setStats({
            repos: user.public_repos ?? 0,
            stars,
            followers: user.followers ?? 0,
            following: user.following ?? 0,
          });
        }
      } catch {
        /* rate-limited or offline — image widgets below still render */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const card =
    'rounded-2xl border border-violet-500/20 bg-[rgba(17,24,39,0.55)] backdrop-blur-md shadow-[0_8px_40px_rgba(99,102,241,0.15)]';

  return (
    <section
      id="github"
      className="min-h-screen w-full relative px-4 sm:px-8 md:px-16 lg:px-24 pt-20 overflow-hidden"
    >
      <SectionBg variant="grid" />
      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
            GitHub Activity
          </h2>
          <p className="text-lg text-violet-300/80">
            Live snapshot of my open-source contributions &amp; code 🚀
          </p>
        </motion.div>

        {/* Live animated stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {STAT_META.map((m, i) => (
            <motion.a
              key={m.key}
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`${card} p-5 sm:p-6 flex flex-col items-center text-center group`}
            >
              <span className="text-2xl mb-2 transition-transform group-hover:scale-125" style={{ color: m.color }}>
                {m.icon}
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                {stats ? <Counter value={stats[m.key]} inView={inView} /> : '—'}
              </span>
              <span className="text-sm text-gray-400 mt-1">{m.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Stats card + Top languages (token-free image widgets) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`${card} p-4 flex items-center justify-center`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="GitHub stats"
              className="w-full max-w-[480px]"
              src={`https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&hide_border=true&count_private=true&bg_color=00000000&title_color=a78bfa&icon_color=22d3ee&text_color=e5e7eb`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`${card} p-4 flex items-center justify-center`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Top languages"
              className="w-full max-w-[480px]"
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GH_USER}&layout=compact&hide_border=true&langs_count=8&bg_color=00000000&title_color=a78bfa&text_color=e5e7eb`}
            />
          </motion.div>
        </div>

        {/* Streak (token-free) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`${card} p-4 mb-8 flex items-center justify-center`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="GitHub streak"
            className="w-full max-w-[560px]"
            src={`https://streak-stats.demolab.com?user=${GH_USER}&hide_border=true&background=00000000&stroke=a78bfa&ring=22d3ee&fire=f472b6&currStreakLabel=a78bfa&sideLabels=e5e7eb&dates=9ca3af&sideNums=e5e7eb&currStreakNum=ffffff&dayLabels=9ca3af`}
          />
        </motion.div>

        {/* Animated contribution activity graph (token-free) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`${card} p-4`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Contribution activity graph"
            className="w-full"
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${GH_USER}&bg_color=00000000&color=a78bfa&line=22d3ee&point=ffffff&area=true&area_color=7c3aed&hide_border=true`}
          />
        </motion.div>
      </div>
    </section>
  );
}
