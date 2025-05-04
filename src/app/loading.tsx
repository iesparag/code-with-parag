'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-50"
            style={{
              background: `linear-gradient(${i * 72}deg, rgba(147, 51, 234, 0.3), rgba(219, 39, 119, 0.3))`,
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main loading animation */}
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-purple-600 dark:border-purple-400"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            borderRadius: ['50%', '30%', '50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-pink-500 dark:border-pink-400"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0, 360],
            borderRadius: ['30%', '50%', '30%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-8 text-xl font-medium text-purple-600 dark:text-purple-400"
        animate={{
          opacity: [0.5, 1, 0.5],
          y: [-5, 0, -5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
