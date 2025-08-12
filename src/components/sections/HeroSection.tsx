'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Animation du titre avec GSAP
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split('') || []
      titleRef.current.innerHTML = chars
        .map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')
      
      gsap.fromTo(
        titleRef.current.children,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 1.5,
        }
      )
    }

    // Animation du sous-titre
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 2.5,
          ease: 'power3.out'
        }
      )
    }

    // Scroll animations
    gsap.to('.scroll-indicator', {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

  }, [])

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      <motion.div 
        className="container mx-auto px-6 z-20"
        style={{ y }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bleu-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-bleu-neon"></span>
            </span>
            <span className="text-sm font-sora text-gray-300">
              Créateurs d'expériences digitales
            </span>
          </motion.div>

          {/* Titre principal */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-space font-bold mb-6 perspective-1000"
          >
            <span className="gradient-text">GLOBINET</span>
          </h1>

          {/* Sous-titre */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl font-sora font-light text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Nous transformons vos idées en expériences digitales 
            <span className="text-bleu-neon"> immersives</span> et 
            <span className="text-violet-electrique"> innovantes</span>
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <motion.button
              className="group relative px-8 py-4 overflow-hidden rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2 px-8 py-4 bg-gradient-neon rounded-full">
                <span className="text-noir-profond font-sora font-semibold">
                  Découvrir notre univers
                </span>
                <svg className="w-5 h-5 text-noir-profond" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </motion.button>

            <motion.button
              className="group relative px-8 py-4 glass rounded-full border border-bleu-neon/30 hover:border-bleu-neon transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-sora font-medium text-white group-hover:text-bleu-neon transition-colors">
                Voir nos réalisations
              </span>
            </motion.button>
          </motion.div>

          {/* Statistiques */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            {[
              { value: '150+', label: 'Projets réalisés' },
              { value: '98%', label: 'Clients satisfaits' },
              { value: '5★', label: 'Note moyenne' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className="text-3xl md:text-4xl font-space font-bold gradient-text mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm font-sora text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-sora text-gray-400 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-bleu-neon/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-bleu-neon rounded-full mt-2" />
          </div>
        </div>
      </motion.div>

      {/* Effet de lumière cinématique */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-bleu-neon/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-violet-electrique/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-magenta/10 blur-3xl pointer-events-none" />
    </motion.section>
  )
}
