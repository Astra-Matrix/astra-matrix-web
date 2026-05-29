'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navigation from '@/components/ui/Navigation'
import FeatureShowcase from '@/components/features/FeatureShowcase'
import AnimatedBentoGrid from '@/components/features/AnimatedBentoGrid'
import TeamSection from '@/components/ui/TeamSection'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { BRAND, NARRATIVE } from '@/lib/constants'

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center min-h-screen px-6 md:px-16 lg:px-24 pt-24 pb-16"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[9px] tracking-[0.5em] text-industrialAmber/55 uppercase mb-5"
        >
          {BRAND.company} · WHAT WE BUILD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-mono font-black tracking-tight leading-none mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            color: '#00F0FF',
            textShadow: '0 0 50px rgba(0,240,255,0.28)',
            letterSpacing: '-0.02em',
          }}
        >
          THE WORK.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.22 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="h-px w-8 bg-industrialAmber/45 flex-shrink-0" />
          <p className="font-mono text-[10px] tracking-[0.2em] text-industrialAmber/65 uppercase">
            ENGINEERING · CREATIVE SYSTEMS · SPATIAL COMPUTING · INFRASTRUCTURE
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.32 }}
          className="font-mono text-sm md:text-base text-neonCyan/45 leading-relaxed max-w-2xl mb-5"
        >
          {NARRATIVE.opening}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.42 }}
          className="font-mono text-xs text-neonCyan/30 leading-relaxed max-w-xl mb-10"
        >
          {NARRATIVE.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.52 }}
          className="flex items-center gap-6"
        >
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-neonCyan/55 hover:text-neonCyan uppercase border border-neonCyan/18 hover:border-neonCyan/45 transition-all duration-200 px-5 py-3"
          >
            DEVELOPER DOCS
            <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <a
            href={BRAND.product ? '#vectra-xr' : '#'}
            className="font-mono text-[9px] tracking-[0.22em] text-neonCyan/22 hover:text-neonCyan/45 uppercase transition-colors duration-200"
          >
            VIEW VECTRA XR →
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[8px] tracking-[0.3em] text-neonCyan/18 uppercase">SCROLL</span>
        <ChevronDown size={13} className="text-neonCyan/18 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}

function SectionDivider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="origin-left px-6 md:px-16 lg:px-24 py-8"
    >
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neonCyan/6" />
        <span className="font-mono text-[7px] tracking-[0.45em] text-neonCyan/20 uppercase flex-shrink-0">
          {label}
        </span>
        <div className="h-px w-8 bg-neonCyan/6" />
      </div>
    </motion.div>
  )
}

// Vectra XR spotlight section
function VectraSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="vectra-xr"
      ref={ref}
      className="px-6 md:px-16 lg:px-24 py-20 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="border border-neonCyan/10 bg-slate/20 p-8 md:p-12 flex flex-col md:flex-row items-start gap-10"
      >
        <div className="flex-1">
          <p className="font-mono text-[8px] tracking-[0.4em] text-industrialAmber/45 uppercase mb-4">
            FLAGSHIP PRODUCT
          </p>
          <h2
            className="font-mono font-black text-4xl md:text-5xl tracking-tight mb-4"
            style={{ color: '#00F0FF', textShadow: '0 0 40px rgba(0,240,255,0.2)', letterSpacing: '-0.02em' }}
          >
            VECTRA XR
          </h2>
          <p className="font-mono text-sm text-neonCyan/50 leading-relaxed max-w-lg mb-6">
            Our native spatial computing platform for Meta Quest 3 — a real-time
            supply chain diagnostics visor running directly on Horizon OS via the
            Meta Spatial SDK. No game engine. No compromise. Shipped to production.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Meta Spatial SDK', 'Horizon OS', 'Kotlin', 'Compose XR', 'CameraX', 'ML Kit'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[7px] tracking-[0.18em] uppercase px-2 py-1 border border-neonCyan/10 text-neonCyan/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col gap-3">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-neonCyan/35 hover:border-neonCyan/65 font-mono text-[10px] tracking-[0.22em] text-neonCyan/55 hover:text-neonCyan uppercase transition-all duration-200"
          >
            READ THE DOCS
            <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#quest-store-pending"
            className="inline-flex items-center justify-center px-6 py-3 border border-neonCyan/10 font-mono text-[9px] tracking-[0.22em] text-neonCyan/25 hover:text-neonCyan/45 uppercase transition-colors duration-200"
          >
            QUEST 3 APP STORE →
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// Final CTA section
function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="px-6 md:px-16 lg:px-24 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex flex-col items-start gap-6"
      >
        <p className="font-mono text-[9px] tracking-[0.45em] text-neonCyan/25 uppercase">
          THE SIGNAL IS OPEN
        </p>
        <h2
          className="font-mono font-black text-3xl md:text-5xl tracking-tight leading-tight"
          style={{ color: '#fff', letterSpacing: '-0.02em', maxWidth: '20ch' }}
        >
          If you've outgrown every system you've ever worked inside —
        </h2>
        <p
          className="font-mono font-bold text-2xl md:text-4xl"
          style={{ color: '#00F0FF', textShadow: '0 0 30px rgba(0,240,255,0.25)' }}
        >
          you'll know how to find us.
        </p>
        <a
          href="mailto:contact@astramatrix.io"
          className="group mt-4 inline-flex items-center gap-3 px-8 py-4 border border-neonCyan/45 hover:border-neonCyan font-mono text-sm tracking-[0.22em] text-neonCyan uppercase transition-all duration-300"
        >
          OPEN A CHANNEL
          <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </motion.div>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-obsidian">
      <Navigation />
      <HeroSection />
      <SectionDivider label="CAPABILITIES" />
      <FeatureShowcase />
      <SectionDivider label="STUDIO METRICS" />
      <AnimatedBentoGrid />
      <SectionDivider label="THE ARCHITECTS" />
      <TeamSection />
      <SectionDivider label="FLAGSHIP PRODUCT" />
      <VectraSpotlight />
      <SectionDivider label="CONTACT" />
      <CtaSection />

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 border-t border-neonCyan/6 bg-obsidian/95 backdrop-blur-sm px-6 md:px-16 py-2.5 flex items-center justify-between">
        <span className="font-mono text-[7px] tracking-[0.22em] text-neonCyan/18 uppercase">
          ASTRA MATRIX · {BRAND.buildHash}
        </span>
        <span className="font-mono text-[7px] tracking-[0.22em] text-industrialAmber/28 uppercase">
          GODMODE ONLINE
        </span>
      </div>
    </div>
  )
}
