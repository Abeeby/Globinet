'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  
  const mouse = useRef({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0
  })

  // Spring animations pour un mouvement fluide
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      
      // Mise à jour immédiate du point central
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Animation loop pour le smooth follow
    const animate = () => {
      mouse.current.smoothX += (mouse.current.x - mouse.current.smoothX) * 0.1
      mouse.current.smoothY += (mouse.current.y - mouse.current.smoothY) * 0.1
      
      cursorX.set(mouse.current.smoothX - 20)
      cursorY.set(mouse.current.smoothY - 20)
      
      requestRef.current = requestAnimationFrame(animate)
    }

    // Détection des éléments interactifs
    const addHoverListeners = () => {
      // Boutons et liens
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor]')
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true)
          const cursorType = el.getAttribute('data-cursor')
          const cursorLabel = el.getAttribute('data-cursor-text')
          
          if (cursorType) setCursorVariant(cursorType)
          if (cursorLabel) setCursorText(cursorLabel)
          
          // Effet magnétique
          if (el.classList.contains('magnetic-button')) {
            el.addEventListener('mousemove', (e: any) => {
              const rect = el.getBoundingClientRect()
              const x = e.clientX - rect.left - rect.width / 2
              const y = e.clientY - rect.top - rect.height / 2
              
              gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3
              })
            })
          }
        })
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false)
          setCursorVariant('default')
          setCursorText('')
          
          if (el.classList.contains('magnetic-button')) {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.3
            })
          }
        })
      })

      // Images avec effet de zoom
      const images = document.querySelectorAll('img, .project-card')
      images.forEach(img => {
        img.addEventListener('mouseenter', () => {
          setCursorVariant('view')
          setCursorText('Voir')
        })
        img.addEventListener('mouseleave', () => {
          setCursorVariant('default')
          setCursorText('')
        })
      })
    }

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
      return
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    // Attendre que le DOM soit prêt
    setTimeout(addHoverListeners, 100)
    
    // Observer pour les nouveaux éléments
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  // Variantes du curseur
  const variants = {
    default: {
      width: 40,
      height: 40,
      border: '2px solid #00F5FF',
      backgroundColor: 'transparent',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 60,
      height: 60,
      border: '2px solid #FF00A8',
      backgroundColor: 'rgba(255, 0, 168, 0.1)',
      mixBlendMode: 'normal' as const,
    },
    click: {
      width: 30,
      height: 30,
      border: '2px solid #9B51E0',
      backgroundColor: 'rgba(155, 81, 224, 0.3)',
      mixBlendMode: 'normal' as const,
    },
    view: {
      width: 80,
      height: 80,
      border: '2px solid #00F5FF',
      backgroundColor: 'rgba(0, 245, 255, 0.1)',
      mixBlendMode: 'normal' as const,
    }
  }

  const currentVariant = isClicking ? 'click' : isHovering ? 'hover' : cursorVariant

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Cursor dot (centre) */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-bleu-neon rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          willChange: 'transform',
          transition: 'none',
        }}
      />
      
      {/* Cursor ring (suit avec delay) */}
      <motion.div
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={variants[currentVariant as keyof typeof variants]}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      >
        {/* Texte du curseur */}
        <AnimatePresence>
          {cursorText && (
            <motion.span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-sora text-white whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
        
        {/* Effet de particules au clic */}
        <AnimatePresence>
          {isClicking && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-gradient-to-r from-bleu-neon to-violet-electrique rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: Math.cos(i * 45 * Math.PI / 180) * 30,
                    y: Math.sin(i * 45 * Math.PI / 180) * 30,
                    opacity: 0
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

// Import pour AnimatePresence
import { AnimatePresence } from 'framer-motion'
