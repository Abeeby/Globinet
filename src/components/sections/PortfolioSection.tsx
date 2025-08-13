'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'Neural Interface',
    category: 'Web App',
    description: 'Plateforme de visualisation de données en temps réel avec WebGL',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    color: '#00F5FF',
    tech: ['Three.js', 'React', 'Node.js'],
    link: '#'
  },
  {
    id: 2,
    title: 'Quantum Dashboard',
    category: 'SaaS Platform',
    description: 'Interface de gestion cloud avec animations 3D immersives',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    color: '#9B51E0',
    tech: ['Next.js', 'TypeScript', 'AWS'],
    link: '#'
  },
  {
    id: 3,
    title: 'Cyber Store',
    category: 'E-commerce',
    description: 'Expérience shopping futuriste avec réalité augmentée',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    color: '#FF00A8',
    tech: ['React Native', 'AR.js', 'Stripe'],
    link: '#'
  },
  {
    id: 4,
    title: 'Meta Gallery',
    category: 'NFT Platform',
    description: 'Galerie d\'art digitale avec environnement 3D interactif',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    color: '#00F5FF',
    tech: ['WebGL', 'Solidity', 'IPFS'],
    link: '#'
  },
  {
    id: 5,
    title: 'AI Assistant',
    category: 'Mobile App',
    description: 'Assistant personnel avec interface conversationnelle avancée',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    color: '#9B51E0',
    tech: ['Flutter', 'GPT-4', 'Firebase'],
    link: '#'
  },
  {
    id: 6,
    title: 'Fintech Pro',
    category: 'Finance',
    description: 'Application bancaire nouvelle génération avec analytics en temps réel',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    color: '#FF00A8',
    tech: ['Vue.js', 'Python', 'Blockchain'],
    link: '#'
  }
]

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    if (!gridRef.current) return

    // Animation 3D des cartes au scroll
    const cards = gridRef.current.querySelectorAll('.project-card')
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 100,
          rotateY: -45,
          z: -200,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          z: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      )
    })

    // Effet de parallaxe sur les cartes
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e: any) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm font-sora font-medium text-violet-electrique uppercase tracking-widest mb-4">
            Portfolio
          </span>
          
          <h2 className="text-5xl md:text-7xl font-space font-bold mb-6">
            <span className="text-white">Nos </span>
            <span className="gradient-text">Réalisations</span>
          </h2>
          
          <p className="text-xl font-sora text-gray-300 max-w-3xl mx-auto">
            Découvrez nos projets les plus innovants et immergez-vous dans des expériences digitales uniques
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card relative group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.05, z: 50 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/50 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Category Badge */}
                  <motion.span
                    className="inline-block px-3 py-1 text-xs font-sora rounded-full mb-4 w-fit"
                    style={{ 
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}40`
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={hoveredProject === project.id ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category}
                  </motion.span>

                  {/* Title */}
                  <h3 className="text-2xl font-space font-bold text-white mb-2 group-hover:text-bleu-neon transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <motion.p
                    className="text-gray-300 font-sora text-sm mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={hoveredProject === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={hoveredProject === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-sora glass rounded-md text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: `2px solid ${project.color}` }}
                  initial={{ opacity: 0 }}
                  animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: `0 0 60px ${project.color}40` }}
                  initial={{ opacity: 0 }}
                  animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.button
            className="group relative px-8 py-4 overflow-hidden rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToId('contact')}
          >
            <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-4 glass border border-violet-electrique/30 rounded-full">
              <span className="font-sora font-semibold text-white">
                Voir tous nos projets
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-noir-profond/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full glass-dark rounded-3xl overflow-hidden"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[400px]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-profond to-transparent" />
              </div>

              <div className="p-8">
                <span
                  className="inline-block px-4 py-2 text-sm font-sora rounded-full mb-4"
                  style={{ 
                    backgroundColor: `${selectedProject.color}20`,
                    color: selectedProject.color,
                    border: `1px solid ${selectedProject.color}40`
                  }}
                >
                  {selectedProject.category}
                </span>

                <h2 className="text-4xl font-space font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>

                <p className="text-gray-300 font-sora mb-6">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedProject.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 text-sm font-sora glass rounded-lg text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    className="px-6 py-3 bg-gradient-neon rounded-full font-sora font-semibold text-noir-profond"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!selectedProject) return
                      if (selectedProject.link && selectedProject.link !== '#') {
                        window.open(selectedProject.link, '_blank')
                      } else {
                        scrollToId('contact')
                      }
                    }}
                  >
                    Voir le projet
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 glass border border-white/20 rounded-full font-sora text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(null)}
                  >
                    Fermer
                  </motion.button>
                </div>
              </div>

              {/* Close button */}
              <button
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center glass rounded-full text-white hover:text-bleu-neon transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-electrique/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-magenta/10 rounded-full blur-3xl" />
    </section>
  )
}
