'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-noir-profond"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="relative flex flex-col items-center">
            {/* Logo animé */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-gradient-neon rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="relative flex items-center justify-center w-full h-full">
                  <span className="text-5xl font-space font-bold gradient-text">G</span>
                </div>
              </div>
            </motion.div>

            {/* Texte Globinet */}
            <motion.h1
              className="text-4xl font-space font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="gradient-text">GLOBINET</span>
            </motion.h1>

            {/* Barre de progression */}
            <div className="w-64 h-1 bg-gris-fume rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-neon"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Pourcentage */}
            <motion.span
              className="mt-4 text-sm font-inter text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.span>

            {/* Particules flottantes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-bleu-neon rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: [0, (i - 2) * 100], 
                  y: [0, -200],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
