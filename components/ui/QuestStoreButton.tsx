'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Headphones, ChevronRight } from 'lucide-react'
import { LINKS } from '@/lib/constants'

export default function QuestStoreButton() {
  const ref = useRef<HTMLAnchorElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springCfg = { damping: 22, stiffness: 280 }
  const springX = useSpring(mouseX, springCfg)
  const springY = useSpring(mouseY, springCfg)

  const rotateX = useTransform(springY, [-50, 50], [8, -8])
  const rotateY = useTransform(springX, [-120, 120], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={LINKS.questStore}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center gap-4 px-7 py-4 border border-neonCyan/50 bg-neonCyan/[0.04] hover:bg-neonCyan/[0.09] transition-colors duration-300 cursor-pointer select-none"
    >
      {/* Corner bracket decorators */}
      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-neonCyan pointer-events-none" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-neonCyan pointer-events-none" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-neonCyan pointer-events-none" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-neonCyan pointer-events-none" />

      {/* Radial hover glow */}
      <motion.span
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.07) 0%, transparent 70%)',
        }}
      />

      <Headphones size={17} className="text-neonCyan relative z-10 flex-shrink-0" strokeWidth={1.5} />

      <div className="relative z-10 flex flex-col leading-none gap-0.5">
        <span className="font-mono text-[8px] tracking-[0.38em] text-neonCyan/45 uppercase">
          META QUEST 3
        </span>
        <span className="font-mono text-[13px] tracking-[0.22em] text-neonCyan font-bold uppercase">
          DOWNLOAD NOW
        </span>
      </div>

      <ChevronRight
        size={15}
        strokeWidth={1.5}
        className="text-neonCyan/50 group-hover:text-neonCyan group-hover:translate-x-1 transition-all duration-200 relative z-10 flex-shrink-0"
      />
    </motion.a>
  )
}
