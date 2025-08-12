'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ContactSection from '@/components/sections/ContactSection'
import Navigation from '@/components/Navigation'
import ParticlesBackground from '@/components/ParticlesBackground'

// Dynamic import pour optimisation
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-noir-profond" />
})

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-noir-profond overflow-hidden">
      {/* Background 3D */}
      <ThreeBackground />
      
      {/* Particules flottantes */}
      <ParticlesBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Portfolio Section */}
      <PortfolioSection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Noise texture overlay */}
      <div className="noise fixed inset-0 pointer-events-none z-50" />
    </main>
  )
}
