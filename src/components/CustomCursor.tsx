'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const checkPointer = () => {
      const target = document.elementFromPoint(cursorX.get() + 16, cursorY.get() + 16)
      const isClickable = target?.tagName === 'A' || 
                         target?.tagName === 'BUTTON' ||
                         target?.closest('button') !== null ||
                         target?.closest('a') !== null ||
                         target?.classList.contains('cursor-pointer')
      
      setIsPointer(!!isClickable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', checkPointer)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousemove', checkPointer)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full border-2 border-bleu-neon rounded-full"
          animate={{
            scale: isPointer ? 1.5 : 1,
            backgroundColor: isPointer ? '#00F5FF' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 7,
          translateY: 7,
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
    </>
  )
}
