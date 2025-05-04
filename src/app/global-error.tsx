'use client';

import { motion } from 'framer-motion';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-red-500/5 dark:bg-red-500/10"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  borderRadius: `${Math.random() * 50}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  rotate: [0, Math.random() * 360],
                  scale: [1, Math.random() + 0.5],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  yoyo: true,
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative text-center z-10 bg-white/90 dark:bg-gray-800/90 p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-8xl mb-8"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              💥
            </motion.div>
            <motion.h2
              className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Oops! Critical Error
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We&apos;ve encountered an unexpected error.
              <br />
              Our team has been notified and is working on it.
            </motion.p>
            <motion.button
              onClick={() => reset()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Try again
            </motion.button>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
