'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    // Initialiser Lenis avec des paramètres optimisés
    const lenis = new Lenis({
      duration: 1.2, // Durée du smooth scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing personnalisé
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Synchroniser Lenis avec GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Animation frame pour Lenis
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Smooth scroll pour les ancres
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement
      
      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute('href')
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId) as HTMLElement | null
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -100, // Offset pour la navigation sticky
              duration: 2,
              easing: (t) => 1 - Math.pow(1 - t, 4), // Easing smooth
            })
          }
        }
      }
    }

    // Effet de parallaxe sur les éléments avec data-speed
    const initParallax = () => {
      const parallaxElements = document.querySelectorAll('[data-speed]')
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '1')
        
        gsap.to(element, {
          yPercent: -100 * (speed - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      })
    }

    // Effet de reveal sur les éléments avec data-reveal
    const initReveal = () => {
      const revealElements = document.querySelectorAll('[data-reveal]')
      
      revealElements.forEach((element) => {
        const direction = element.getAttribute('data-reveal') || 'up'
        
        let fromVars: any = { opacity: 0 }
        switch (direction) {
          case 'up':
            fromVars.y = 50
            break
          case 'down':
            fromVars.y = -50
            break
          case 'left':
            fromVars.x = 50
            break
          case 'right':
            fromVars.x = -50
            break
          case 'scale':
            fromVars.scale = 0.8
            break
        }
        
        gsap.fromTo(element, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        })
      })
    }

    // Effet de progression sur les barres de compétence
    const initProgress = () => {
      const progressBars = document.querySelectorAll('[data-progress]')
      
      progressBars.forEach((bar) => {
        const progress = bar.getAttribute('data-progress') || '100'
        
        gsap.fromTo(bar, 
          { width: '0%' },
          {
            width: `${progress}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }

    // Effet de compteur pour les statistiques
    const initCounters = () => {
      const counters = document.querySelectorAll('[data-counter]')
      
      counters.forEach((counter) => {
        const endValue = parseInt(counter.getAttribute('data-counter') || '0')
        const duration = parseFloat(counter.getAttribute('data-duration') || '2')
        
        const obj = { value: 0 }
        
        gsap.to(obj, {
          value: endValue,
          duration: duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            counter.textContent = Math.round(obj.value).toString()
          }
        })
      })
    }

    // Initialiser tous les effets après un court délai
    setTimeout(() => {
      initParallax()
      initReveal()
      initProgress()
      initCounters()
    }, 100)

    // Event listeners
    document.addEventListener('click', handleAnchorClick)

    // Gestion de la molette de la souris pour un scroll plus réactif
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // Ignorer le zoom
      
      const direction = e.deltaY > 0 ? 1 : -1
      const speed = Math.abs(e.deltaY) > 100 ? 1.5 : 1
      
      lenis.scrollTo(window.scrollY + (direction * 100 * speed), {
        duration: 0.5,
      })
    }

    // Smooth scroll pour les touches de navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault()
          lenis.scrollTo(window.scrollY - 100)
          break
        case 'ArrowDown':
          e.preventDefault()
          lenis.scrollTo(window.scrollY + 100)
          break
        case 'PageUp':
          e.preventDefault()
          lenis.scrollTo(window.scrollY - window.innerHeight * 0.8)
          break
        case 'PageDown':
          e.preventDefault()
          lenis.scrollTo(window.scrollY + window.innerHeight * 0.8)
          break
        case 'Home':
          e.preventDefault()
          lenis.scrollTo(0)
          break
        case 'End':
          e.preventDefault()
          lenis.scrollTo(document.documentElement.scrollHeight)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false })

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('keydown', handleKeyDown)
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Méthode pour scroller programmatiquement
  useEffect(() => {
    (window as any).scrollToSection = (target: string | HTMLElement, options?: any) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options)
      }
    }
  }, [])

  return (
    <div className="smooth-scroll-container">
      {children}
      
      {/* Indicateur de progression du scroll */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <div 
          className="h-full bg-gradient-neon transition-transform origin-left"
          style={{
            transform: 'scaleX(var(--scroll-progress, 0))',
          }}
        />
      </div>
      
      <style jsx global>{`
        html {
          scroll-behavior: auto !important;
        }
        
        .smooth-scroll-container {
          will-change: transform;
        }
        
        /* Optimisations pour les animations */
        [data-speed],
        [data-reveal],
        [data-progress],
        [data-counter] {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  )
}

// Typage pour l'extension window
declare global {
  interface Window {
    scrollToSection: (target: string | HTMLElement, options?: any) => void
  }
}
