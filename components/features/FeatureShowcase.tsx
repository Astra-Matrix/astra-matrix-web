'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Layers, Cpu, Server } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

const ICONS = { 'full-stack': Code2, 'spatial-xr': Layers, 'creative-systems': Cpu, infrastructure: Server }

type Service = (typeof SERVICES)[number]

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-70px 0px' })

  const isLeft = index % 2 === 0
  const isCyan = service.accent === 'cyan'
  const Icon = ICONS[service.id as keyof typeof ICONS] ?? Code2

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -35 : 35 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.04 * index }}
      className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8 md:gap-16 py-16 border-b border-neonCyan/8`}
    >
      {/* Index + icon column */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <div
          className="w-14 h-14 flex items-center justify-center border"
          style={{
            borderColor: isCyan ? 'rgba(0,240,255,0.2)' : 'rgba(255,153,0,0.2)',
            background: isCyan ? 'rgba(0,240,255,0.03)' : 'rgba(255,153,0,0.03)',
          }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: isCyan ? '#00F0FF' : '#FF9900' }} />
        </div>
        <div className="w-px h-12 hidden md:block" style={{ background: isCyan ? 'rgba(0,240,255,0.08)' : 'rgba(255,153,0,0.08)' }} />
      </div>

      {/* Content column */}
      <div className="flex-1 max-w-xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.06 * index + 0.15 }}
          className="font-mono text-[9px] tracking-[0.42em] uppercase mb-3"
          style={{ color: isCyan ? 'rgba(0,240,255,0.4)' : 'rgba(255,153,0,0.4)' }}
        >
          {service.tag}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06 * index + 0.2 }}
          className="font-mono font-bold text-2xl md:text-3xl tracking-tight mb-3 leading-tight"
          style={{
            color: isCyan ? '#00F0FF' : '#FF9900',
            textShadow: isCyan ? '0 0 25px rgba(0,240,255,0.2)' : '0 0 25px rgba(255,153,0,0.2)',
          }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.06 * index + 0.28 }}
          className="font-mono text-sm text-neonCyan/70 mb-4 leading-snug"
        >
          {service.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.06 * index + 0.36 }}
          className="font-mono text-xs leading-relaxed text-neonCyan/32 mb-6"
        >
          {service.detail}
        </motion.p>

        {/* Keyword pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.06 * index + 0.44 }}
          className="flex flex-wrap gap-1.5"
        >
          {service.keywords.map((kw) => (
            <span
              key={kw}
              className="font-mono text-[8px] tracking-[0.18em] uppercase px-2 py-1 border"
              style={{
                borderColor: isCyan ? 'rgba(0,240,255,0.12)' : 'rgba(255,153,0,0.12)',
                color: isCyan ? 'rgba(0,240,255,0.38)' : 'rgba(255,153,0,0.38)',
                background: isCyan ? 'rgba(0,240,255,0.02)' : 'rgba(255,153,0,0.02)',
              }}
            >
              {kw}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Ghost index number */}
      <div className="hidden lg:flex items-center self-center flex-shrink-0">
        <span
          className="font-mono font-black select-none"
          style={{
            fontSize: '5.5rem',
            lineHeight: 1,
            color: isCyan ? 'rgba(0,240,255,0.03)' : 'rgba(255,153,0,0.03)',
          }}
        >
          {service.index}
        </span>
      </div>
    </motion.div>
  )
}

export default function FeatureShowcase() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-8 max-w-6xl mx-auto">
      {[...SERVICES].map((service, i) => (
        <ServiceRow key={service.id} service={service as unknown as Service} index={i} />
      ))}
    </section>
  )
}
