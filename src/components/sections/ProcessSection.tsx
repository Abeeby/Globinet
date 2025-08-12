'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    id: 1,
    phase: 'Découverte',
    title: 'Comprendre votre vision',
    description: 'Nous plongeons dans votre univers pour comprendre vos objectifs, vos défis et vos ambitions.',
    icon: '🔍',
    color: '#00F5FF',
    details: ['Analyse approfondie', 'Workshops créatifs', 'Étude de marché'],
    duration: '1-2 semaines'
  },
  {
    id: 2,
    phase: 'Stratégie',
    title: 'Définir la roadmap',
    description: 'Nous élaborons une stratégie digitale sur-mesure alignée avec vos objectifs business.',
    icon: '🎯',
    color: '#9B51E0',
    details: ['Architecture technique', 'User journey', 'KPIs et métriques'],
    duration: '1 semaine'
  },
  {
    id: 3,
    phase: 'Design',
    title: 'Créer l\'expérience',
    description: 'Nos designers créent des interfaces immersives qui captivent et engagent vos utilisateurs.',
    icon: '🎨',
    color: '#FF00A8',
    details: ['Wireframes', 'Prototypes interactifs', 'Design system'],
    duration: '2-3 semaines'
  },
  {
    id: 4,
    phase: 'Développement',
    title: 'Donner vie au projet',
    description: 'Nos développeurs transforment les designs en expériences digitales performantes et scalables.',
    icon: '⚡',
    color: '#00F5FF',
    details: ['Code moderne', 'Tests rigoureux', 'Optimisation performance'],
    duration: '4-8 semaines'
  },
  {
    id: 5,
    phase: 'Lancement',
    title: 'Propulser votre succès',
    description: 'Nous déployons votre solution et assurons un lancement réussi avec un support continu.',
    icon: '🚀',
    color: '#9B51E0',
    details: ['Déploiement progressif', 'Monitoring', 'Formation équipes'],
    duration: '1 semaine'
  }
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    if (!isInView || !timelineRef.current) return

    // Animation des étapes au scroll
    const steps = timelineRef.current.querySelectorAll('.process-step')
    
    steps.forEach((step, index) => {
      // Animation d'entrée
      gsap.fromTo(step,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Animation des particules
      const particles = step.querySelectorAll('.particle')
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: 'random(-50, 50)',
          y: 'random(-50, 50)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.2,
        })
      })
    })

    // Animation de la ligne de progression
    gsap.to('.progress-dot', {
      motionPath: {
        path: '#timeline-path',
        align: '#timeline-path',
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      duration: 10,
      repeat: -1,
      ease: 'none',
    })

  }, [isInView])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm font-sora font-medium text-rose-magenta uppercase tracking-widest mb-4">
            Notre Process
          </span>
          
          <h2 className="text-5xl md:text-7xl font-space font-bold mb-6">
            <span className="text-white">Un voyage </span>
            <span className="gradient-text">créatif</span>
          </h2>
          
          <p className="text-xl font-sora text-gray-300 max-w-3xl mx-auto">
            De l'idée à la réalisation, découvrez comment nous transformons vos ambitions 
            en expériences digitales extraordinaires
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Ligne centrale animée */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gris-fume to-transparent">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-bleu-neon via-violet-electrique to-rose-magenta"
              style={{ height: lineHeight }}
            />
            
            {/* Particule qui suit la ligne */}
            <div className="progress-dot absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-bleu-neon rounded-full shadow-[0_0_20px_rgba(0,245,255,0.8)]" />
          </div>

          {/* SVG Path pour l'animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ display: 'none' }}>
            <path
              id="timeline-path"
              d={`M ${typeof window !== 'undefined' ? window.innerWidth / 2 : 0} 0 L ${typeof window !== 'undefined' ? window.innerWidth / 2 : 0} 2000`}
              fill="none"
            />
          </svg>

          {/* Process Steps */}
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`process-step relative flex items-center mb-32 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="glass rounded-2xl p-8 relative overflow-hidden">
                    {/* Background gradient */}
                    <div 
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ background: `radial-gradient(circle at ${index % 2 === 0 ? 'right' : 'left'}, ${step.color}, transparent)` }}
                    />

                    {/* Phase badge */}
                    <motion.span
                      className="inline-block px-4 py-1 text-xs font-sora rounded-full mb-4"
                      style={{ 
                        backgroundColor: `${step.color}20`,
                        color: step.color,
                        border: `1px solid ${step.color}40`
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.phase}
                    </motion.span>

                    {/* Icon */}
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-space font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 font-sora mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      {step.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-sora glass rounded-lg text-gray-400"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className={`flex items-center gap-2 text-sm text-gray-400 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-sora">{step.duration}</span>
                    </div>

                    {/* Floating particles */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="particle absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: step.color,
                          top: `${20 + i * 30}%`,
                          left: index % 2 === 0 ? `${10 + i * 10}%` : `${70 + i * 10}%`,
                          opacity: 0.3,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
                      border: `2px solid ${step.color}`,
                      boxShadow: `0 0 30px ${step.color}40`
                    }}
                  >
                    <span className="text-2xl font-space font-bold text-white">
                      {step.id}
                    </span>
                  </div>
                  
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      border: `2px solid ${step.color}`,
                      opacity: 0.5
                    }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              </div>

              {/* Empty space for the other half */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg font-sora text-gray-300 mb-8">
            Prêt à embarquer dans cette aventure créative ?
          </p>
          <motion.button
            className="group relative px-8 py-4 overflow-hidden rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-4 bg-gradient-neon rounded-full">
              <span className="font-sora font-semibold text-noir-profond">
                Commencer le voyage
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-bleu-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-rose-magenta/5 rounded-full blur-3xl" />
    </section>
  )
}
