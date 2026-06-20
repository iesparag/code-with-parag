'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaRegCopy, FaCheck } from 'react-icons/fa';
import { socialLinks, personalInfo } from '@/data/portfolio-data';
import SectionBg from './SectionBg';

const card =
  'rounded-2xl border border-violet-500/20 bg-[rgba(17,24,39,0.5)] backdrop-blur-md shadow-[0_8px_40px_rgba(99,102,241,0.12)]';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const methods = [
    {
      label: 'WhatsApp',
      value: 'Chat with me',
      href: socialLinks.whatsapp,
      icon: <FaWhatsapp />,
      color: '#25D366',
    },
    {
      label: 'LinkedIn',
      value: '/in/iesparag',
      href: socialLinks.linkedin,
      icon: <FaLinkedin />,
      color: '#0A66C2',
    },
    {
      label: 'GitHub',
      value: '@iesparag',
      href: socialLinks.github,
      icon: <FaGithub />,
      color: '#a78bfa',
    },
  ];

  return (
    <section id="contact" className="w-full relative px-4 sm:px-8 md:px-16 lg:px-24 py-24 overflow-hidden">
      <SectionBg variant="rings" />
      <div className="container max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Let&apos;s build something amazing
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-xl mx-auto">
            Got an idea, a role, or a freelance project? I&apos;m just a message away.
          </p>
        </motion.div>

        {/* Email card with copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${card} p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6`}
        >
          <div className="flex items-center gap-4">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-fuchsia-500/15 text-fuchsia-300 text-xl">
              <FaEnvelope />
            </span>
            <div>
              <p className="text-sm text-gray-400">Email me at</p>
              <p className="text-lg text-white font-medium">{personalInfo.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border border-violet-500/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 transition-colors"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaRegCopy />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition-opacity"
            >
              Send Email
            </a>
          </div>
        </motion.div>

        {/* Other methods */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {methods.map((m, i) => (
            <motion.a
              key={m.label}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`${card} p-6 flex flex-col items-center text-center group`}
            >
              <span
                className="text-3xl mb-3 transition-transform group-hover:scale-125"
                style={{ color: m.color }}
              >
                {m.icon}
              </span>
              <span className="text-white font-medium">{m.label}</span>
              <span className="text-sm text-gray-400">{m.value}</span>
            </motion.a>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-14">
          © {new Date().getFullYear()} {personalInfo.name} · Built with Next.js, Three.js &amp; Framer Motion
        </p>
      </div>
    </section>
  );
}
