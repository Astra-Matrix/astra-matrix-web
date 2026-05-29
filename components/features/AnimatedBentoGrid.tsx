'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2,
  Layers,
  Cpu,
  Server,
  GitBranch,
  Globe,
  Lock,
  Zap,
  Database,
  Package,
} from 'lucide-react'

type MetricCard = {
  id: string
  icon: React.ElementType
  label: string
  value: string
  unit?: string
  note?: string
  status: 'nominal' | 'warning' | 'active'
  span?: 'col-2'
}

const CARDS: MetricCard[] = [
  {
    id: 'systems',
    icon: Server,
    label: 'SYSTEMS DEPLOYED',
    value: '200+',
    unit: 'PRODUCTION',
    note: 'Across 14 industry verticals',
    status: 'active',
    span: 'col-2',
  },
  {
    id: 'uptime',
    icon: Zap,
    label: 'UPTIME AVERAGE',
    value: '99.97',
    unit: '%',
    status: 'nominal',
  },
  {
    id: 'engineers',
    icon: Cpu,
    label: 'ARCHITECTS',
    value: '8',
    unit: 'ACTIVE',
    status: 'active',
  },
  {
    id: 'commits',
    icon: GitBranch,
    label: 'COMMITS THIS YEAR',
    value: '14.2k',
    status: 'nominal',
  },
  {
    id: 'stacks',
    icon: Layers,
    label: 'TECH STACKS',
    value: '30+',
    unit: 'MASTERED',
    status: 'nominal',
  },
  {
    id: 'projects',
    icon: Package,
    label: 'PROJECTS SHIPPED',
    value: '340+',
    unit: 'TOTAL',
    status: 'active',
    span: 'col-2',
    note: 'From MVPs to enterprise-scale platforms',
  },
  {
    id: 'countries',
    icon: Globe,
    label: 'CLIENT COUNTRIES',
    value: '22',
    status: 'nominal',
  },
  {
    id: 'open-source',
    icon: Code2,
    label: 'OPEN SOURCE',
    value: '18',
    unit: 'REPOS',
    status: 'nominal',
  },
  {
    id: 'security',
    icon: Lock,
    label: 'CVEs FILED',
    value: '0',
    unit: 'IN PROD',
    status: 'nominal',
  },
  {
    id: 'data',
    icon: Database,
    label: 'DATA PROCESSED',
    value: '4.8TB',
    unit: '/ DAY',
    status: 'active',
  },
]

const STATUS_COLORS = {
  nominal: { text: '#00F0FF', border: 'rgba(0,240,255,0.14)', bg: 'rgba(0,240,255,0.02)', dot: '#00F0FF' },
  warning: { text: '#FF9900', border: 'rgba(255,153,0,0.22)', bg: 'rgba(255,153,0,0.03)', dot: '#FF9900' },
  active:  { text: '#00F0FF', border: 'rgba(0,240,255,0.28)', bg: 'rgba(0,240,255,0.04)', dot: '#00F0FF' },
}

function Card({ card, index }: { card: MetricCard; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const c = STATUS_COLORS[card.status]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col justify-between p-4 border transition-all duration-300 cursor-default select-none ${
        card.span === 'col-2' ? 'col-span-2' : 'col-span-1'
      }`}
      style={{
        borderColor: hovered ? c.border.replace('0.14', '0.5').replace('0.28', '0.6') : c.border,
        background: hovered ? c.bg.replace('0.02', '0.07').replace('0.04', '0.08') : c.bg,
        boxShadow: hovered ? `0 0 18px ${c.text}12` : 'none',
      }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <card.icon size={11} strokeWidth={1.5} style={{ color: `${c.text}90` }} />
          <span className="font-mono text-[8px] tracking-[0.26em] uppercase" style={{ color: `${c.text}60` }}>
            {card.label}
          </span>
        </div>
        <span
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{
            background: c.dot,
            opacity: card.status === 'active' ? 0.9 : 0.4,
            boxShadow: hovered ? `0 0 5px ${c.dot}` : 'none',
          }}
        />
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-mono font-black leading-none"
          style={{
            fontSize: card.span === 'col-2' ? '2.4rem' : '1.7rem',
            color: c.text,
            textShadow: hovered ? `0 0 20px ${c.text}45` : 'none',
          }}
        >
          {card.value}
        </span>
        {card.unit && (
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: `${c.text}45` }}>
            {card.unit}
          </span>
        )}
      </div>

      {card.note && (
        <p className="font-mono text-[7px] tracking-[0.14em] uppercase mt-2" style={{ color: `${c.text}28` }}>
          {card.note}
        </p>
      )}

      {/* Hover brackets */}
      {hovered && (
        <>
          <span className="absolute top-0 left-0 h-2 w-2 border-t border-l" style={{ borderColor: c.text }} />
          <span className="absolute top-0 right-0 h-2 w-2 border-t border-r" style={{ borderColor: c.text }} />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l" style={{ borderColor: c.text }} />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r" style={{ borderColor: c.text }} />
        </>
      )}
    </motion.div>
  )
}

export default function AnimatedBentoGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="px-6 md:px-16 lg:px-24 py-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="h-px w-8 bg-industrialAmber/45 flex-shrink-0" />
        <p className="font-mono text-[9px] tracking-[0.38em] text-industrialAmber/55 uppercase">
          STUDIO METRICS · OPERATIONAL
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
        className="font-mono text-2xl md:text-3xl font-bold text-neonCyan mb-10 tracking-tight max-w-lg"
        style={{ textShadow: '0 0 25px rgba(0,240,255,0.15)' }}
      >
        The numbers behind the threshold.
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CARDS.map((card, i) => (
          <Card key={card.id} card={card} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="font-mono text-[7px] tracking-[0.2em] text-neonCyan/15 uppercase mt-4 text-right"
      >
        FIGURES CURRENT AS OF {new Date().getFullYear()} · SOME DATA REDACTED BY REQUEST
      </motion.p>
    </section>
  )
}
