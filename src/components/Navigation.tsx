'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Détection de la section active
      const sections = navItems.map(item => item.href.replace('#', ''))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between glass rounded-2xl px-8 py-4 ${
            isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
          }`}>
            {/* Logo */}
            <Link href="/" className="group">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-neon rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center w-full h-full bg-noir-profond rounded-lg border border-bleu-neon">
                    <span className="text-xl font-space font-bold gradient-text">G</span>
                  </div>
                </div>
                <span className="text-xl font-space font-bold text-white">
                  GLOBINET
                </span>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm font-sora font-medium transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-bleu-neon'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-neon"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
              
              {/* CTA Button */}
              <motion.button
                className="relative px-6 py-2.5 font-sora font-semibold text-sm overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-6 py-2.5 bg-gradient-neon rounded-full">
                  <span className="text-noir-profond">Démarrer un projet</span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="flex flex-col justify-center items-center w-6">
                <motion.span
                  className="block h-0.5 w-6 bg-white mb-1.5"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-white mb-1.5"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-white"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-noir-profond lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-2xl font-sora font-medium text-white hover:text-bleu-neon transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.button
                className="relative mt-8 px-8 py-3 font-sora font-semibold overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-neon rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-8 py-3 bg-gradient-neon rounded-full">
                  <span className="text-noir-profond">Démarrer un projet</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
