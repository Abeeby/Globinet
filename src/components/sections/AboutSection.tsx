'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const keywords = [
  { text: 'Créativité', color: '#00F5FF', delay: 0 },
  { text: 'Innovation', color: '#9B51E0', delay: 0.2 },
  { text: 'Performance', color: '#FF00A8', delay: 0.4 },
  { text: 'Excellence', color: '#00F5FF', delay: 0.6 },
]

const services = [
  {
    icon: '🚀',
    title: 'Développement Web',
    description: 'Applications web modernes et performantes avec les dernières technologies',
    features: ['React/Next.js', 'Node.js', 'WebGL/Three.js']
  },
  {
    icon: '🎨',
    title: 'Design & UX/UI',
    description: 'Interfaces élégantes et expériences utilisateur mémorables',
    features: ['Motion Design', 'Prototypage', 'Design System']
  },
  {
    icon: '📱',
    title: 'Applications Mobiles',
    description: 'Solutions mobiles natives et cross-platform innovantes',
    features: ['React Native', 'Flutter', 'Progressive Web Apps']
  },
  {
    icon: '⚡',
    title: 'Solutions Cloud',
    description: 'Infrastructure scalable et solutions cloud optimisées',
    features: ['AWS/Azure', 'DevOps', 'Microservices']
  }
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])

  useEffect(() => {
    if (!isInView) return

    // Animation des mots-clés flottants
    gsap.to('.floating-keyword', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      rotation: 'random(-5, 5)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    })

    // Animation des cartes de service
    gsap.fromTo('.service-card',
      { 
        opacity: 0,
        y: 50,
        rotateY: -30
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
        }
      }
    )
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      id="about"
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
          <motion.span 
            className="inline-block text-sm font-sora font-medium text-bleu-neon uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Notre ADN
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-space font-bold mb-6">
            <span className="gradient-text">Redéfinir</span>
            <br />
            <span className="text-white">le digital</span>
          </h2>
          
          <p className="text-xl font-sora text-gray-300 max-w-3xl mx-auto">
            Nous sommes une agence digitale nouvelle génération, spécialisée dans la création 
            d'expériences web immersives et innovantes qui propulsent votre marque vers de nouveaux sommets.
          </p>
        </motion.div>

        {/* Mots-clés flottants en 3D */}
        <motion.div
          className="relative h-64 mb-32 perspective-1000"
          style={{ y, rotateX }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {keywords.map((keyword, index) => (
              <motion.div
                key={keyword.text}
                className="floating-keyword absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + keyword.delay, duration: 0.8, type: 'spring' }}
                style={{
                  left: `${25 + index * 15}%`,
                  top: `${30 + (index % 2) * 30}%`,
                }}
              >
                <div 
                  className="glass px-8 py-4 rounded-2xl transform hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    boxShadow: `0 0 30px ${keyword.color}40`,
                    border: `1px solid ${keyword.color}40`,
                  }}
                >
                  <span 
                    className="text-2xl font-space font-bold"
                    style={{ color: keyword.color }}
                  >
                    {keyword.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lignes de connexion animées */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 100 100 Q 300 50 500 100 T 700 100"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 2, delay: 1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="50%" stopColor="#9B51E0" />
                <stop offset="100%" stopColor="#FF00A8" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-full glass rounded-3xl p-8 overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-space font-bold text-white mb-4 group-hover:text-bleu-neon transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 font-sora mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-sora border border-bleu-neon/30 rounded-full text-bleu-neon"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover effect corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-neon opacity-20 blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-lg font-sora text-gray-300 mb-8">
            Prêt à transformer votre vision en réalité digitale ?
          </p>
          <motion.button
            className="group relative px-8 py-4 overflow-hidden rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-4 glass border border-bleu-neon/30 rounded-full">
              <span className="font-sora font-semibold text-white">
                Discutons de votre projet
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-bleu-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-electrique/5 rounded-full blur-3xl" />
    </section>
  )
}
