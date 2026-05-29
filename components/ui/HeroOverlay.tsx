'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MousePointer2, Hand, Box, ArrowRight } from 'lucide-react'
import { BRAND, NARRATIVE } from '@/lib/constants'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const HINTS = [
  { icon: MousePointer2, label: 'DRAG TO ORBIT' },
  { icon: Box, label: 'HOVER THE SHARDS' },
  { icon: Hand, label: 'ENTER VR TO GRAB' },
]

export default function HeroOverlay() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      {/* Centered glass hero card */}
      <motion.div
        variants={item}
        className="pointer-events-none relative glass glass-edge max-w-2xl w-full px-8 md:px-14 py-12 md:py-16 text-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-[9px] md:text-[10px] tracking-[0.55em] text-neonCyan/55 uppercase mb-6"
        >
          {BRAND.company} · SPATIAL STUDIO
        </motion.p>

        {/* Massive neon wordart title */}
        <motion.h1 variants={item} className="mb-6 select-none">
          <span
            className="block font-mono font-black leading-[0.9] neon-wordart neon-flicker"
            style={{ fontSize: 'clamp(3rem, 12vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            ASTRA
          </span>
          <span
            className="block font-mono font-black leading-[0.9] neon-wordart-amber"
            style={{ fontSize: 'clamp(3rem, 12vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            MATRIX
          </span>
        </motion.h1>

        <motion.p variants={item} className="font-mono text-sm md:text-base glass-text leading-relaxed mb-3">
          {BRAND.tagline}
        </motion.p>
        <motion.p variants={item} className="font-mono text-xs glass-text-dim leading-relaxed max-w-lg mx-auto mb-9">
          {NARRATIVE.opening}
        </motion.p>

        {/* CTAs — pointer events re-enabled */}
        <motion.div variants={item} className="pointer-events-auto flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/software"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-neonCyan/50 hover:border-neonCyan bg-neonCyan/[0.05] hover:bg-neonCyan/[0.12] transition-all duration-300 font-mono text-[11px] tracking-[0.25em] uppercase neon-wordart"
          >
            EXPLORE SOFTWARE
            <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/visions"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-industrialAmber/40 hover:border-industrialAmber bg-industrialAmber/[0.04] hover:bg-industrialAmber/[0.1] transition-all duration-300 font-mono text-[11px] tracking-[0.25em] uppercase neon-wordart-amber"
          >
            SEE OUR VISIONS
            <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Interaction hint bar */}
      <motion.div
        variants={item}
        className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
      >
        {HINTS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon size={12} className="text-neonCyan/50" strokeWidth={1.5} />
            <span className="font-mono text-[8px] tracking-[0.28em] text-neonCyan/40 uppercase">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Minimal site copyright strip */}
      <motion.div
        variants={item}
        className="pointer-events-none absolute bottom-5 left-0 right-0 flex items-center justify-center"
      >
        <span className="font-mono text-[8px] tracking-[0.25em] text-neonCyan/22 uppercase">
          © {new Date().getFullYear()} ASTRA MATRIX, INC.
        </span>
      </motion.div>
    </motion.div>
  )
}
