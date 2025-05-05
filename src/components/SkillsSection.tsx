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
    <section id="skills" className="relative min-h-screen pt-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
            Skills & Technologies
          </h2>
          <p className="text-lg text-violet-300/80">
            Technologies I&apos;ve been working with
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Frontend & Backend Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillsData)
              .filter(([key]) => key === 'frontend' || key === 'backend')
              .map(([key, category], sectionIndex) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: sectionIndex * 0.1,
                    ease: "easeOut"
                  }}
                  className="skill-section backdrop-blur-sm h-full"
                >
                  <motion.h3 
                    className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-violet-300 to-fuchsia-300 text-transparent bg-clip-text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    {category.title}
                  </motion.h3>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-10">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.05,
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

          {/* Tools & Platforms Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillsData)
              .filter(([key]) => key !== 'frontend' && key !== 'backend')
              .map(([key, category], sectionIndex) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: sectionIndex * 0.1,
                    ease: "easeOut"
                  }}
                  className="skill-section backdrop-blur-sm h-full"
                >
                  <motion.h3 
                    className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-violet-300 to-fuchsia-300 text-transparent bg-clip-text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    {category.title}
                  </motion.h3>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.05,
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
      </div>
    </section>
  );
}
