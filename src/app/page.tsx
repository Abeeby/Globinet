'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ContactSection from '@/components/sections/ContactSection'
import Navigation from '@/components/Navigation'
import ParticlesBackground from '@/components/ParticlesBackground'
import LoadingScreen from '@/components/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

// Dynamic imports pour optimisation
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-noir-profond" />
})

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Attendre que tout soit chargé
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setTimeout(() => setShowContent(true), 1500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showContent) {
      // Animations de révélation des sections
      gsap.fromTo('.section-reveal',
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-reveal',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Animation de parallaxe pour les effets de fond
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }
  }, [showContent])

  return (
    <>
      {/* Loading Screen */}
      {!isLoaded && <LoadingScreen />}
      
      {/* Curseur personnalisé */}
      <CustomCursor />
      
      {/* Smooth Scroll Container */}
      <SmoothScroll>
        <AnimatePresence>
          {showContent && (
            <motion.main 
              className="relative min-h-screen bg-noir-profond overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Background 3D */}
              <div className="parallax-bg">
                <ThreeBackground />
              </div>
              
              {/* Particules flottantes */}
              <ParticlesBackground />
              
              {/* Navigation */}
              <Navigation />
              
              {/* Hero Section avec animation d'entrée */}
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <HeroSection />
              </motion.div>
              
              {/* About Section */}
              <div className="section-reveal">
                <AboutSection />
              </div>
              
              {/* Portfolio Section */}
              <div className="section-reveal">
                <PortfolioSection />
              </div>
              
              {/* Process Section */}
              <div className="section-reveal">
                <ProcessSection />
              </div>
              
              {/* Contact Section */}
              <div className="section-reveal">
                <ContactSection />
              </div>
              
              {/* Effets visuels globaux */}
              <div className="fixed inset-0 pointer-events-none">
                {/* Vignette effect */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.4) 100%)'
                  }}
                />
                
                {/* Grain/Noise texture */}
                <div className="noise absolute inset-0 opacity-[0.02]" />
                
                {/* Scan lines effect */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
                    animation: 'scan 8s linear infinite'
                  }}
                />
              </div>
              
              {/* Lueurs dynamiques */}
              <motion.div
                className="fixed top-0 left-1/4 w-96 h-96 bg-bleu-neon/10 rounded-full blur-3xl pointer-events-none"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
              />
              <motion.div
                className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-electrique/10 rounded-full blur-3xl pointer-events-none"
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
              />
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-magenta/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.main>
          )}
        </AnimatePresence>
      </SmoothScroll>
      
      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }
        
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </>
  )
}
