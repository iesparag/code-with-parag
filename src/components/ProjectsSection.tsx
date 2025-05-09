'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { projects } from '@/data/portfolio-data';
import React, { useEffect, useRef } from 'react';

export default function ProjectsSection() {
  useTheme(); // Theme is used for dark mode styling
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Initialize refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, projects.length);
  }, []);

  return (
    <section id="projects" className="min-h-screen w-full relative px-4 sm:px-8 md:px-16 lg:px-24 pt-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400">
            Some of my recent work
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                ease: [0.21, 1.11, 0.81, 0.99]
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                className="relative h-48 group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
              >
                {/* Project preview video or image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 mix-blend-overlay" />
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ rotate: 180, scale: 0, opacity: 0 }}
                    whileInView={{ 
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.2
                      }
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <motion.video
                      ref={(el: HTMLVideoElement | null) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      className="w-full h-full object-cover rounded-t-xl"
                      src={project.video}
                      loop
                      muted
                      playsInline
                      autoPlay
                      onViewportEnter={() => {
                        const video = videoRefs.current[index];
                        if (video) video.play().catch(() => {});
                      }}
                      onViewportLeave={() => {
                        const video = videoRefs.current[index];
                        if (video) video.pause();
                      }}
                    />
                    
                    {/* Overlay gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 mix-blend-overlay"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    />
                  </motion.div>
                </motion.div>
                {/* Hover overlay with project icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="text-white p-4 rounded-full bg-purple-600/80 backdrop-blur-sm"
                    initial={{ scale: 0.8, rotate: -10 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="px-3 py-1 bg-purple-900/80 text-purple-300 rounded-full text-sm hover:bg-purple-800 transition-colors duration-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = project.github}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/50 text-purple-300 hover:bg-purple-800/70 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                    GitHub
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = project.demo}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/50 text-blue-300 hover:bg-blue-800/70 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Live Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
