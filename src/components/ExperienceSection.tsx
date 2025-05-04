'use client';

import { motion } from 'framer-motion';
import { experienceData } from '@/data/experience-data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen w-full relative px-4 sm:px-8 md:px-16 lg:px-20 pt-20">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-8 text-primary"
            >
              Work Experience
            </motion.h3>
            <div className="space-y-8">
              {experienceData.work.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute -left-3 top-2 w-6 h-6 rounded-full border-2 border-primary bg-background"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="absolute inset-1 rounded-full bg-primary/20" />
                  </motion.div>

                  {/* Timeline line */}
                  <motion.div
                    className="absolute -left-0.5 top-8 w-0.5 bg-primary/20"
                    initial={{ height: 0 }}
                    whileInView={{ height: "calc(100% - 1rem)" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />

                  <div className="pl-8 pb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="text-xl font-semibold">{job.company}</h4>
                      <span className="text-sm text-muted-foreground">
                        {job.location}
                      </span>
                      <span className="text-sm text-primary font-medium">
                        {job.period}
                      </span>
                    </div>
                    <h5 className="text-lg font-medium mb-4">{job.role}</h5>
                    <ul className="space-y-3">
                      {job.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index * 6 + i) * 0.1 }}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                            className="mt-2 w-1 h-1 rounded-full bg-primary/50"
                          />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-8 text-primary"
            >
              Education
            </motion.h3>
            <div className="space-y-8">
              {experienceData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/5 hover:border-primary/20 transition-all"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xl font-semibold">{edu.degree}</h4>
                      <span className="text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-lg text-muted-foreground">
                        {edu.institution}
                      </h5>
                      <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                        <span>{edu.location}</span>
                        {edu.cgpa && (
                          <span className="flex items-center gap-1">
                            • CGPA: <span className="text-primary">{edu.cgpa}</span>
                          </span>
                        )}
                        {/* {edu.percentage && (
                          <span className="flex items-center gap-1">
                            • Score: <span className="text-primary">{edu.percentage}</span>
                          </span>
                        )}
                        {edu.stream && (
                          <span className="flex items-center gap-1">
                            • {edu.stream}
                          </span>
                        )} */}
                      </div>
                    </div>

                    {edu.achievements && (
                      <div className="space-y-2">
                        <h6 className="font-medium text-primary">Achievements</h6>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-primary/50" />
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {edu.relevantCourses && (
                      <div className="space-y-2">
                        <h6 className="font-medium text-primary">Relevant Courses</h6>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantCourses.map((course, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
