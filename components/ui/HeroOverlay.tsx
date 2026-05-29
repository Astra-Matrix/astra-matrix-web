'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND, NARRATIVE, TELEMETRY_LABELS, STUDIO_METRICS } from '@/lib/constants'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function HeroOverlay() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      {/* Left telemetry column */}
      <motion.div
        variants={item}
        className="absolute top-20 left-6 md:left-16 hidden xl:flex flex-col gap-1.5"
      >
        {TELEMETRY_LABELS.slice(0, 4).map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="h-px w-5 flex-shrink-0"
              style={{ background: i % 2 === 0 ? '#00F0FF' : '#FF9900', opacity: 0.3 + i * 0.06 }}
            />
            <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/22 uppercase">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Right telemetry column */}
      <motion.div
        variants={item}
        className="absolute top-20 right-6 md:right-16 hidden xl:flex flex-col gap-1.5 items-end"
      >
        {TELEMETRY_LABELS.slice(4).map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/22 uppercase">
              {label}
            </span>
            <span
              className="h-px w-5 flex-shrink-0"
              style={{ background: '#FF9900', opacity: 0.25 + i * 0.08 }}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Main hero block ── */}
      <div className="max-w-5xl">
        {/* Pre-label */}
        <motion.p
          variants={item}
          className="font-mono text-[9px] tracking-[0.55em] text-neonCyan/35 uppercase mb-6"
        >
          {BRAND.company} / ESTABLISHED IN THE THRESHOLD
        </motion.p>

        {/* Primary wordmark — split on newline for dramatic layout */}
        <motion.h1 variants={item} className="mb-8 select-none">
          {NARRATIVE.headline.split('\n').map((line, i) => (
            <div key={i}>
              <span
                className="font-mono font-black block leading-none"
                style={{
                  fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
                  color: i === 0 ? '#00F0FF' : 'rgba(0,240,255,0.28)',
                  textShadow: i === 0 ? '0 0 60px rgba(0,240,255,0.3)' : 'none',
                  letterSpacing: '-0.02em',
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </motion.h1>

        {/* Category rule */}
        <motion.div variants={item} className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-industrialAmber/50 flex-shrink-0" />
          <p className="font-mono text-[10px] tracking-[0.22em] text-industrialAmber/65 uppercase">
            SOFTWARE ENGINEERING · CREATIVE SYSTEMS · SPATIAL COMPUTING
          </p>
        </motion.div>

        {/* Opening line */}
        <motion.p
          variants={item}
          className="font-mono text-sm md:text-base text-neonCyan/50 leading-relaxed max-w-2xl mb-10"
        >
          {BRAND.tagline}
        </motion.p>

        {/* Manifesto lines */}
        <motion.div variants={item} className="flex flex-col gap-2 mb-10">
          {NARRATIVE.manifesto.map((line) => (
            <div key={line} className="flex items-center gap-3">
              <span className="h-px w-4 bg-neonCyan/20 flex-shrink-0" />
              <p className="font-mono text-[11px] tracking-[0.06em] text-neonCyan/30">{line}</p>
            </div>
          ))}
        </motion.div>

        {/* Studio metrics strip */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-neonCyan/8 mb-10 max-w-2xl"
          style={{ background: 'rgba(0,240,255,0.04)' }}
        >
          {STUDIO_METRICS.map(({ label, value, unit }) => (
            <div
              key={label}
              className="flex flex-col gap-1 p-4"
              style={{ background: '#121214' }}
            >
              <span
                className="font-mono font-black leading-none"
                style={{ fontSize: '1.6rem', color: '#00F0FF', textShadow: '0 0 20px rgba(0,240,255,0.25)' }}
              >
                {value}
              </span>
              <span className="font-mono text-[7px] tracking-[0.25em] text-neonCyan/30 uppercase">
                {unit}
              </span>
              <span className="font-mono text-[7px] tracking-[0.18em] text-neonCyan/18 uppercase">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs — pointer-events re-enabled */}
        <motion.div variants={item} className="pointer-events-auto flex flex-wrap items-center gap-4">
          <Link
            href="/features"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-neonCyan/50 bg-neonCyan/[0.04] hover:bg-neonCyan/[0.09] transition-colors duration-300 font-mono text-[11px] tracking-[0.25em] text-neonCyan uppercase"
          >
            SEE OUR WORK
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-neonCyan/35 hover:text-neonCyan/65 uppercase transition-colors duration-200"
          >
            DEVELOPER DOCS
          </Link>
        </motion.div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        variants={item}
        className="absolute bottom-5 left-6 right-6 md:left-16 md:right-16 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-neonCyan animate-pulse flex-shrink-0" />
          <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/22 uppercase">
            SYSTEMS NOMINAL · {BRAND.buildHash}
          </span>
        </div>
        <span className="font-mono text-[8px] tracking-[0.22em] text-industrialAmber/30 uppercase hidden sm:block">
          GODMODE ONLINE
        </span>
      </motion.div>
    </motion.div>
  )
}
