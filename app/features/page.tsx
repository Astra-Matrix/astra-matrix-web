'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navigation from '@/components/ui/Navigation'
import FeatureShowcase from '@/components/features/FeatureShowcase'
import AnimatedBentoGrid from '@/components/features/AnimatedBentoGrid'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { BRAND } from '@/lib/constants'

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center min-h-screen px-6 md:px-16 lg:px-24 pt-24 pb-16"
    >
      {/* Subtle background grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] tracking-[0.5em] text-industrialAmber/60 uppercase mb-5"
        >
          {BRAND.company} · PLATFORM CAPABILITIES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-mono font-black tracking-tight leading-none mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            color: '#00F0FF',
            textShadow: '0 0 50px rgba(0,240,255,0.3)',
          }}
        >
          FEATURE MATRIX
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="h-px w-8 bg-industrialAmber/50" />
          <p className="font-mono text-xs tracking-[0.18em] text-industrialAmber/70 uppercase">
            SPATIAL COMPUTING · HORIZON OS · XR2 GEN 3
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-mono text-sm md:text-base text-neonCyan/50 leading-relaxed max-w-2xl mb-10"
        >
          {BRAND.product} integrates four core technical modules into a single coherent
          spatial interface. Each module operates independently and communicates over
          the Astra Matrix internal event bus — giving field engineers a unified,
          always-on diagnostics layer with zero context switching.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex items-center gap-6"
        >
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-neonCyan/60 hover:text-neonCyan uppercase transition-colors duration-200 border border-neonCyan/20 hover:border-neonCyan/50 px-5 py-3"
          >
            VIEW DOCS
            <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <span className="font-mono text-[9px] tracking-[0.2em] text-neonCyan/20 uppercase hidden sm:block">
            {BRAND.version} · {BRAND.buildHash}
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[8px] tracking-[0.3em] text-neonCyan/20 uppercase">SCROLL</span>
        <ChevronDown size={14} className="text-neonCyan/20 animate-bounce" strokeWidth={1.5} />
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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="origin-left px-6 md:px-16 lg:px-24 py-8"
    >
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neonCyan/8" />
        <span className="font-mono text-[8px] tracking-[0.4em] text-neonCyan/25 uppercase flex-shrink-0">
          {label}
        </span>
        <div className="h-px w-8 bg-neonCyan/8" />
      </div>
    </motion.div>
  )
}

export default function FeaturesPage() {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-obsidian">
      <Navigation />
      <HeroSection />
      <SectionDivider label="CORE MODULES" />
      <FeatureShowcase />
      <SectionDivider label="LIVE SYSTEM METRICS" />
      <AnimatedBentoGrid />

      {/* CTA footer */}
      <section className="px-6 md:px-16 lg:px-24 py-24 max-w-6xl mx-auto">
        <div className="border border-neonCyan/10 bg-slate/30 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[9px] tracking-[0.4em] text-neonCyan/35 uppercase mb-3">
              READY TO INTEGRATE
            </p>
            <h2 className="font-mono font-bold text-2xl md:text-3xl text-neonCyan tracking-tight mb-2"
              style={{ textShadow: '0 0 30px rgba(0,240,255,0.2)' }}
            >
              Start building with Vectra XR.
            </h2>
            <p className="font-mono text-xs text-neonCyan/40 leading-relaxed max-w-md">
              Full SDK documentation, architecture guides, and Kotlin code samples are
              available in the developer portal.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-3 px-7 py-4 border border-neonCyan/50 bg-neonCyan/5 hover:bg-neonCyan/10 transition-colors duration-300 font-mono text-sm tracking-[0.2em] text-neonCyan uppercase"
            >
              OPEN DEVELOPER DOCS
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="#quest-store-pending"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-neonCyan/15 font-mono text-xs tracking-[0.2em] text-neonCyan/40 hover:text-neonCyan/70 transition-colors duration-200 uppercase"
            >
              DOWNLOAD FOR META QUEST 3
            </a>
          </div>
        </div>
      </section>

      {/* Bottom status bar */}
      <div className="sticky bottom-0 border-t border-neonCyan/8 bg-obsidian/95 backdrop-blur-sm px-6 md:px-16 py-2.5 flex items-center justify-between">
        <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/20 uppercase">
          {BRAND.buildHash} · FEATURES
        </span>
        <span className="font-mono text-[8px] tracking-[0.22em] text-industrialAmber/30 uppercase">
          VECTRA XR {BRAND.version}
        </span>
      </div>
    </div>
  )
}
