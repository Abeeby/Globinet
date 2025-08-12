'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulation de chargement avec progression réaliste
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15
        const newProgress = Math.min(prev + increment, 100)
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500)
        }
        
        return newProgress
      })
    }, 200)

    // Animation du logo avec GSAP
    const tl = gsap.timeline()
    
    tl.fromTo('.logo-letter',
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out'
      }
    )
    .to('.loading-text', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .to('.progress-container', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.3')

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[300] bg-noir-profond flex items-center justify-center overflow-hidden"
          exit={{ 
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Effet de particules flottantes */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-bleu-neon to-violet-electrique rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight 
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
                style={{
                  boxShadow: '0 0 10px currentColor',
                }}
              />
            ))}
          </div>

          {/* Grille de fond animée */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'grid-move 10s linear infinite'
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            {/* Logo animé */}
            <div className="mb-12 perspective-1000">
              <h1 className="text-7xl md:text-9xl font-space font-bold">
                {'GLOBIWEB'.split('').map((letter, i) => (
                  <span 
                    key={i}
                    className="logo-letter inline-block gradient-text"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>

            {/* Texte de chargement */}
            <motion.p 
              className="loading-text text-sm font-sora text-gray-400 uppercase tracking-widest mb-8 opacity-0 translate-y-5"
            >
              Préparation de votre expérience digitale
            </motion.p>

            {/* Barre de progression */}
            <div className="progress-container opacity-0 scale-90">
              <div className="relative w-64 mx-auto">
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-neon rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'linear' }}
                    style={{
                      boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
                    }}
                  />
                </div>
                
                {/* Pourcentage */}
                <motion.span 
                  className="absolute -right-12 top-1/2 -translate-y-1/2 text-bleu-neon font-space font-bold text-sm"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>

            {/* Indicateur de chargement orbital */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-bleu-neon rounded-full"
                  style={{ boxShadow: '0 0 20px #00F5FF' }}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-violet-electrique rounded-full"
                  style={{ boxShadow: '0 0 15px #9B51E0' }}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-rose-magenta rounded-full"
                  style={{ boxShadow: '0 0 15px #FF00A8' }}
                />
              </motion.div>
            </div>
          </div>

          {/* Effets de lumière cinématique */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/3 bg-gradient-to-b from-bleu-neon/20 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-violet-electrique/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-rose-magenta/20 blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
