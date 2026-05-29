'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TEAM } from '@/lib/constants'

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="px-6 md:px-16 lg:px-24 py-24 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="mb-14"
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="h-px w-8 bg-industrialAmber/50 flex-shrink-0" />
          <p className="font-mono text-[9px] tracking-[0.4em] text-industrialAmber/55 uppercase">
            THE ARCHITECTS
          </p>
        </div>
        <h2
          className="font-mono font-black text-3xl md:text-4xl tracking-tight leading-tight mb-4"
          style={{ color: '#fff', letterSpacing: '-0.02em' }}
        >
          Assembled, not hired.
        </h2>
        <p className="font-mono text-xs text-neonCyan/35 leading-relaxed max-w-xl">
          They work under names that carry no resumes and no LinkedIn profiles. They were
          found because of the signal, not the CV — the particular frequency that serious
          builders emit when they've outgrown every system they've ever worked inside.
        </p>
      </motion.div>

      {/* Godmode — lead card, full-width treatment */}
      {(() => {
        const lead = TEAM.find((m) => m.isLead)!
        return (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative border border-industrialAmber/25 bg-industrialAmber/[0.03] p-6 md:p-8 mb-3 group hover:border-industrialAmber/50 transition-colors duration-300"
          >
            {/* Corner marks */}
            <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-industrialAmber/60" />
            <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-industrialAmber/60" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-industrialAmber/60" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-industrialAmber/60" />

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar glyph */}
                <div
                  className="w-14 h-14 flex items-center justify-center border border-industrialAmber/40 flex-shrink-0"
                  style={{ background: 'rgba(255,153,0,0.06)' }}
                >
                  <span
                    className="font-mono font-black text-lg"
                    style={{
                      color: '#FF9900',
                      textShadow: '0 0 16px rgba(255,153,0,0.7)',
                    }}
                  >
                    G
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-mono font-bold text-xl tracking-tight"
                      style={{ color: '#FF9900', textShadow: '0 0 20px rgba(255,153,0,0.4)' }}
                    >
                      {lead.handle}
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.3em] text-industrialAmber/50 uppercase px-2 py-0.5 border border-industrialAmber/20">
                      {lead.status}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-industrialAmber/50 uppercase">
                    {lead.role}
                  </p>
                </div>
              </div>
              <p className="font-mono text-xs text-neonCyan/40 leading-relaxed md:max-w-lg md:ml-auto">
                {lead.descriptor}
              </p>
            </div>
          </motion.div>
        )
      })()}

      {/* Remaining architects — grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: 'rgba(0,240,255,0.04)' }}
      >
        {TEAM.filter((m) => !m.isLead).map((member, i) => (
          <motion.div
            key={member.handle}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}
            className="relative flex flex-col p-5 group hover:bg-neonCyan/[0.03] transition-colors duration-300 cursor-default"
            style={{ background: '#121214' }}
          >
            {/* Handle */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="font-mono font-bold text-sm tracking-tight group-hover:text-neonCyan transition-colors duration-200"
                style={{ color: 'rgba(0,240,255,0.7)' }}
              >
                {member.handle}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ background: '#00F0FF', opacity: 0.4 }}
              />
            </div>

            {/* Role */}
            <p className="font-mono text-[8px] tracking-[0.25em] text-neonCyan/30 uppercase mb-3">
              {member.role}
            </p>

            {/* Descriptor */}
            <p className="font-mono text-[10px] leading-relaxed text-neonCyan/25 mt-auto">
              {member.descriptor}
            </p>

            {/* Hover bottom accent */}
            <span className="absolute bottom-0 left-0 right-0 h-px bg-neonCyan/0 group-hover:bg-neonCyan/15 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="font-mono text-[8px] tracking-[0.2em] text-neonCyan/15 uppercase mt-5 text-right"
      >
        ALL HANDLES ARE OPERATIONAL IDENTIFIERS · NO OTHER DOCUMENTATION EXISTS
      </motion.p>
    </section>
  )
}
