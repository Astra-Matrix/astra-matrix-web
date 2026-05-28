'use client'

import { motion } from 'framer-motion'
import { Activity, Shield, Zap } from 'lucide-react'
import QuestStoreButton from './QuestStoreButton'
import { BRAND, TELEMETRY_LABELS } from '@/lib/constants'

const FEATURE_NODES = [
  { Icon: Activity, label: 'REAL-TIME ASSET TRACKING', value: '< 2ms LATENCY' },
  { Icon: Shield, label: 'HORIZON OS NATIVE', value: 'API LEVEL 63' },
  { Icon: Zap, label: 'SPATIAL COMPUTE', value: '4x XR2 GEN 3' },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.25 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function HeroOverlay() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      {/* Left-side system telemetry strip — desktop only */}
      <motion.div
        variants={item}
        className="absolute top-20 left-6 md:left-16 hidden xl:flex flex-col gap-1.5"
      >
        {TELEMETRY_LABELS.slice(0, 4).map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="h-px w-5 flex-shrink-0"
              style={{
                background: i % 2 === 0 ? '#00F0FF' : '#FF9900',
                opacity: 0.35 + i * 0.08,
              }}
            />
            <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/25 uppercase">
              {label}
            </span>
            <span
              className="font-mono text-[8px] tracking-[0.1em] uppercase"
              style={{ color: i % 2 === 0 ? 'rgba(0,240,255,0.45)' : 'rgba(255,153,0,0.45)' }}
            >
              ONLINE
            </span>
          </div>
        ))}
      </motion.div>

      {/* Right-side telemetry strip — desktop only */}
      <motion.div
        variants={item}
        className="absolute top-20 right-6 md:right-16 hidden xl:flex flex-col gap-1.5 items-end"
      >
        {TELEMETRY_LABELS.slice(4).map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/25 uppercase">
              {label}
            </span>
            <span
              className="h-px w-5 flex-shrink-0"
              style={{ background: '#FF9900', opacity: 0.3 + i * 0.1 }}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Main hero block ── */}
      <div className="max-w-5xl">
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="font-mono text-[10px] md:text-xs tracking-[0.55em] text-neonCyan/45 uppercase mb-5"
        >
          {BRAND.company} PRESENTS
        </motion.p>

        {/* Primary mark */}
        <motion.h1
          variants={item}
          className="font-mono font-black leading-none mb-6 select-none"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
            color: '#00F0FF',
            textShadow:
              '0 0 60px rgba(0,240,255,0.38), 0 0 120px rgba(0,240,255,0.13)',
            letterSpacing: '-0.02em',
          }}
        >
          {BRAND.product}
        </motion.h1>

        {/* Category rule */}
        <motion.div variants={item} className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-industrialAmber/55 flex-shrink-0" />
          <p className="font-mono text-[10px] md:text-xs tracking-[0.18em] text-industrialAmber/75 uppercase">
            HORIZON OS · SPATIAL COMPUTING · ENTERPRISE GRADE
          </p>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="font-mono text-sm md:text-[15px] tracking-[0.04em] text-neonCyan/55 leading-relaxed max-w-xl mb-9"
        >
          {BRAND.tagline}
        </motion.p>

        {/* Feature stat cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-9 max-w-lg"
        >
          {FEATURE_NODES.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="border border-neonCyan/10 bg-slate/40 backdrop-blur-sm p-3 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-1.5">
                <Icon size={11} className="text-industrialAmber/80 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-mono text-[8px] tracking-[0.25em] text-neonCyan/35 uppercase leading-tight">
                  {label}
                </span>
              </div>
              <span className="font-mono text-[11px] tracking-[0.1em] text-neonCyan/80 font-bold">
                {value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA — pointer events re-enabled for this subtree */}
        <motion.div variants={item} className="pointer-events-auto">
          <QuestStoreButton />
        </motion.div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        variants={item}
        className="absolute bottom-5 left-6 right-6 md:left-16 md:right-16 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/25 uppercase">
            SYS:{BRAND.buildHash}
          </span>
          <span className="h-px w-10 bg-neonCyan/10" />
          <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/25 uppercase hidden sm:block">
            RENDERER:WEBXR/GL2
          </span>
        </div>
        <span className="font-mono text-[8px] tracking-[0.22em] text-industrialAmber/35 uppercase hidden md:block">
          OPTIMIZED · META QUEST 3 BROWSER
        </span>
      </motion.div>
    </motion.div>
  )
}
