'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, BookOpen, Box, ArrowUpRight, Check } from 'lucide-react'
import { VECTRA_PRODUCT } from '@/lib/constants'

export default function VectraProduct() {
  const [open, setOpen] = useState(false)

  // Lock background scroll while the overlay is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* ── Product box (clickable) ── */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ y: -6 }}
        className="group relative glass glass-edge w-full max-w-md text-left p-8 cursor-pointer overflow-hidden"
      >
        {/* Status pill */}
        <div className="flex items-center justify-between mb-8">
          <span className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.28em] text-neonCyan/70 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-neonCyan animate-pulse" />
            {VECTRA_PRODUCT.status}
          </span>
          <span className="font-mono text-[8px] tracking-[0.22em] text-industrialAmber/55 uppercase">
            {VECTRA_PRODUCT.version}
          </span>
        </div>

        {/* Icon glyph */}
        <div className="w-16 h-16 flex items-center justify-center border border-neonCyan/25 bg-neonCyan/[0.04] mb-7">
          <Box size={26} className="text-neonCyan" strokeWidth={1.3} />
        </div>

        {/* Title */}
        <h2
          className="font-mono font-black text-3xl tracking-tight mb-2 neon-wordart"
          style={{ letterSpacing: '-0.01em' }}
        >
          {VECTRA_PRODUCT.name}
        </h2>
        <p className="font-mono text-[9px] tracking-[0.25em] text-industrialAmber/55 uppercase mb-5">
          {VECTRA_PRODUCT.platform}
        </p>

        <p className="font-mono text-xs glass-text-dim leading-relaxed mb-8">
          {VECTRA_PRODUCT.tagline}
        </p>

        {/* CTA hint */}
        <div className="flex items-center justify-between pt-5 border-t border-neonCyan/10">
          <span className="font-mono text-[10px] tracking-[0.22em] glass-text uppercase group-hover:text-neonCyan transition-colors">
            VIEW DETAILS
          </span>
          <ArrowUpRight
            size={16}
            className="text-neonCyan/50 group-hover:text-neonCyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            strokeWidth={1.5}
          />
        </div>

        {/* Hover glow sweep */}
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.08), transparent 60%)' }}
        />
      </motion.button>

      {/* ── Detail overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(10,10,12,0.78)', backdropFilter: 'blur(10px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="glass glass-edge relative w-full max-w-3xl max-h-[88vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="sticky top-4 left-full -ml-12 z-10 flex items-center justify-center w-9 h-9 border border-neonCyan/30 bg-obsidian/70 hover:border-neonCyan/60 transition-colors"
                aria-label="Close"
              >
                <X size={15} className="text-neonCyan" strokeWidth={1.5} />
              </button>

              <div className="px-7 md:px-12 pb-12 -mt-4">
                {/* Header */}
                <p className="font-mono text-[9px] tracking-[0.4em] text-industrialAmber/55 uppercase mb-3">
                  {VECTRA_PRODUCT.codename} · {VECTRA_PRODUCT.status}
                </p>
                <h2 className="font-mono font-black text-4xl md:text-5xl tracking-tight mb-3 neon-wordart">
                  {VECTRA_PRODUCT.name}
                </h2>
                <p className="font-mono text-sm glass-text mb-6">{VECTRA_PRODUCT.tagline}</p>
                <div className="h-px w-full bg-neonCyan/10 mb-6" />

                <p className="font-mono text-[13px] glass-text-dim leading-7 mb-9">
                  {VECTRA_PRODUCT.summary}
                </p>

                {/* Highlights */}
                <p className="font-mono text-[9px] tracking-[0.35em] text-neonCyan/45 uppercase mb-4">
                  CAPABILITIES
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
                  {VECTRA_PRODUCT.highlights.map((h) => (
                    <div key={h.title} className="border border-neonCyan/10 bg-neonCyan/[0.02] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check size={12} className="text-neonCyan flex-shrink-0" strokeWidth={2} />
                        <span className="font-mono text-[11px] tracking-[0.06em] glass-text font-bold">
                          {h.title}
                        </span>
                      </div>
                      <p className="font-mono text-[10px] glass-text-dim leading-relaxed">{h.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <p className="font-mono text-[9px] tracking-[0.35em] text-neonCyan/45 uppercase mb-4">
                  SPECIFICATIONS
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-neonCyan/8 border border-neonCyan/8 mb-10">
                  {VECTRA_PRODUCT.specs.map((s) => (
                    <div key={s.label} className="bg-obsidian p-4 flex flex-col gap-1">
                      <span className="font-mono text-[7px] tracking-[0.25em] text-neonCyan/35 uppercase">
                        {s.label}
                      </span>
                      <span className="font-mono text-[11px] glass-text tracking-[0.04em]">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Download / links */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={VECTRA_PRODUCT.links.questStore}
                    className="group flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 border border-neonCyan/50 hover:border-neonCyan bg-neonCyan/[0.05] hover:bg-neonCyan/[0.12] transition-all duration-300 font-mono text-[11px] tracking-[0.22em] uppercase neon-wordart"
                  >
                    <Download size={14} strokeWidth={1.5} />
                    DOWNLOAD FOR QUEST 3
                  </a>
                  <a
                    href={VECTRA_PRODUCT.links.docs}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-neonCyan/15 hover:border-neonCyan/40 transition-colors duration-200 font-mono text-[10px] tracking-[0.22em] glass-text-dim hover:text-neonCyan uppercase"
                  >
                    <BookOpen size={13} strokeWidth={1.5} />
                    DOCS
                  </a>
                  <a
                    href={VECTRA_PRODUCT.links.sideload}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-neonCyan/15 hover:border-neonCyan/40 transition-colors duration-200 font-mono text-[10px] tracking-[0.22em] glass-text-dim hover:text-neonCyan uppercase"
                  >
                    SIDELOAD APK
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
