'use client';

import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills-data';
import '@/styles/cube.css';

const SkillCube = ({ skill }: { skill: string }) => {
  return (
    <div className="cube-wrapper">
      <div className="cube">
        <div className="cube-face front">{skill}</div>
        <div className="cube-face back">{skill}</div>
        <div className="cube-face right">{skill}</div>
        <div className="cube-face left">{skill}</div>
      </div>
    </div>
  );
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-screen pt-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Moving particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                background: `rgba(99, 102, 241, ${Math.random() * 0.15 + 0.05})`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(99, 102, 241, 0.3)`,
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [
                  0,
                  Math.random() * 200 - 100,
                  Math.random() * -200 + 100,
                  0,
                ],
                y: [
                  0,
                  Math.random() * 200 - 100,
                  Math.random() * -200 + 100,
                  0,
                ],
                scale: [1, Math.random() + 2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Floating shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border border-indigo-500/20"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, Math.random() + 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 25 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Technologies I&apos;ve been working with
          </p>
        </motion.div>

        <div className="space-y-16">
          {Object.entries(skillsData).map(([key, category], sectionIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: sectionIndex * 0.2,
                ease: "easeOut"
              }}
              className="skill-section backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1 + sectionIndex * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <SkillCube skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
