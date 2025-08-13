'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    id: 1,
    title: 'Découverte',
    icon: '🔍',
    description: 'Nous analysons vos besoins, votre marché et vos objectifs pour créer une stratégie sur-mesure.',
    color: '#00F5FF',
    details: ['Audit complet', 'Analyse concurrentielle', 'Définition des objectifs'],
    duration: '1-2 semaines'
  },
  {
    id: 2,
    title: 'Conception',
    icon: '✏️',
    description: 'Création de maquettes et prototypes interactifs pour visualiser votre projet.',
    color: '#9B51E0',
    details: ['Wireframes', 'Design UI/UX', 'Prototypage'],
    duration: '2-3 semaines'
  },
  {
    id: 3,
    title: 'Développement',
    icon: '⚡',
    description: 'Transformation des designs en code performant avec les dernières technologies.',
    color: '#FF00A8',
    details: ['Frontend', 'Backend', 'Intégrations'],
    duration: '4-8 semaines'
  },
  {
    id: 4,
    title: 'Tests & Optimisation',
    icon: '🔧',
    description: 'Tests rigoureux et optimisations pour garantir performance et qualité.',
    color: '#00F5FF',
    details: ['Tests unitaires', 'Optimisation SEO', 'Performance'],
    duration: '1-2 semaines'
  },
  {
    id: 5,
    title: 'Lancement',
    icon: '🚀',
    description: 'Mise en ligne et accompagnement pour un lancement réussi.',
    color: '#9B51E0',
    details: ['Déploiement', 'Formation', 'Support'],
    duration: 'Jour J'
  },
  {
    id: 6,
    title: 'Suivi & Évolution',
    icon: '📈',
    description: 'Maintenance continue et évolutions pour faire grandir votre projet.',
    color: '#FF00A8',
    details: ['Maintenance', 'Analytics', 'Améliorations'],
    duration: 'Continu'
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

  useEffect(() => {
    if (!isInView) return

    // Animation de la timeline centrale
    gsap.to('.timeline-line', {
      height: '100%',
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      }
    })

    // Animation des étapes
    processSteps.forEach((_, index) => {
      gsap.fromTo(`.process-step-${index}`,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          rotateY: index % 2 === 0 ? -45 : 45,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.process-step-${index}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Animation du point sur la timeline
      gsap.fromTo(`.timeline-dot-${index}`,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: `.process-step-${index}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })

    // Animation parallaxe des éléments décoratifs
    gsap.to('.process-decoration', {
      y: -100,
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    })
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="process-decoration absolute top-20 left-10 w-64 h-64 bg-bleu-neon/5 rounded-full blur-3xl" />
        <div className="process-decoration absolute bottom-20 right-10 w-96 h-96 bg-violet-electrique/5 rounded-full blur-3xl" />
        <div className="process-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-magenta/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-sm font-sora font-medium text-rose-magenta uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Notre Process
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-space font-bold mb-6">
            <span className="text-white">Une méthode </span>
            <span className="gradient-text">éprouvée</span>
          </h2>
          
          <p className="text-xl font-sora text-gray-300 max-w-3xl mx-auto">
            De l'idée à la réalisation, nous suivons un processus structuré 
            pour garantir le succès de votre projet digital
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="timeline-container relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
            <motion.div 
              className="timeline-line absolute top-0 left-0 w-full bg-gradient-neon"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Process Steps */}
          <div className="relative space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`process-step-${index} relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Step Content */}
                <motion.div
                  className="w-5/12"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className="glass rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
                    style={{
                      borderColor: `${step.color}40`,
                      borderWidth: '1px',
                    }}
                  >
                    {/* Background gradient on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${step.color}, transparent)`
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="text-5xl mb-4"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 
                      className="text-2xl font-space font-bold mb-3"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 font-sora mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {step.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-sora rounded-full border border-gray-700 text-gray-400"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" style={{ color: step.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-sora text-gray-400">
                        Durée : {step.duration}
                      </span>
                    </div>

                    {/* Hover effect corner */}
                    <div 
                      className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </motion.div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`timeline-dot-${index} relative`}
                    whileHover={{ scale: 1.5 }}
                  >
                    {/* Outer ring */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${step.color}20, transparent)`,
                        border: `2px solid ${step.color}`,
                      }}
                    >
                      {/* Inner dot */}
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: step.color }}
                      />
                    </div>
                    
                    {/* Pulse effect */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: step.color,
                        opacity: 0.2,
                      }}
                    />
                    
                    {/* Step number */}
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-xs font-space font-bold text-gray-500">
                        0{step.id}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-lg font-sora text-gray-300 mb-8">
            Prêt à démarrer votre projet avec nous ?
          </p>
          <motion.button
            className="group relative px-8 py-4 overflow-hidden rounded-full magnetic-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
            data-cursor-text="Go!"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-4 glass border border-rose-magenta/30 rounded-full">
              <span className="font-sora font-semibold text-white">
                Commençons l'aventure
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
