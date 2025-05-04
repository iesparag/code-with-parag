'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { aboutData } from '@/data/about-data';
import Image from 'next/image';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

export default function AboutSection() {
  const { scrollYProgress } = useScroll();
  useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section className="pt-16 w-full relative overflow-hidden bg-gradient-to-b from-background to-background/50">
      {/* Animated gradient orbs */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <motion.div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      {/* Animated grid background */}
      <motion.div className="absolute inset-0" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
      }} />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            delay: i * 20
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5
          }}
        />
      ))}
      <motion.div className="container max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold inline-block bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            About Me
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Profile & Stats */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="relative">
              {/* Profile Image Container */}
              <div className="max-w-[280px] sm:max-w-[320px] md:max-w-[480px] mx-auto lg:mx-0">
                <motion.div className="relative z-10 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1">
                  <motion.div className="w-full h-full rounded-2xl overflow-hidden relative bg-background/80 backdrop-blur-sm">
                    {aboutData.avatar ? (
                      <motion.div
                        className="relative w-full h-full"
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={aboutData.avatar}
                          alt={aboutData.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
                          priority
                        />
                      </motion.div>
                    ) : (
                      <motion.div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl font-bold bg-gradient-to-r from-primary/40 to-primary/20 bg-clip-text text-transparent">
                          {aboutData.initials}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>

              {/* Social Links */}
              {/* <div className="absolute bottom-4 right-4 flex gap-3">
                {aboutData.social.map((item) => {
                  const Icon = item.platform === 'GitHub' ? BsGithub :
                             item.platform === 'LinkedIn' ? BsLinkedin :
                             BsTwitter;
                  return (
                    <motion.a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-card/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div> */}
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {aboutData.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-primary/10 hover:border-primary/20 transition-all"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <motion.div className="relative">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary), 0.2)' }}
                    >
                      <span className="text-xl font-bold text-primary">{stat.value}</span>
                    </motion.div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - About Text */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 overflow-hidden group">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.8 }}
              />
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <motion.div className="relative space-y-6">
                {aboutData.description.split('. ').map((sentence, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {sentence.trim()}.
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Skills */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {aboutData.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <motion.div className="relative">
                    <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                      {skill.name}
                    </h3>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
