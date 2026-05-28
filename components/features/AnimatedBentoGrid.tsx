'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  ScanLine,
  Thermometer,
  Shield,
  Zap,
  Timer,
  Database,
  Hand,
  Wifi,
  Package,
} from 'lucide-react'

type BentoCell = {
  id: string
  icon: React.ElementType
  label: string
  value: string
  unit?: string
  status: 'nominal' | 'warning' | 'critical' | 'active'
  span?: 'col-2' | 'row-2' | 'default'
  detail?: string
}

const CELLS: BentoCell[] = [
  {
    id: 'spatial-anchors',
    icon: MapPin,
    label: 'SPATIAL ANCHORS',
    value: '247',
    unit: 'ACTIVE',
    status: 'nominal',
    span: 'col-2',
    detail: 'Persistent across 14 facility zones',
  },
  {
    id: 'scan-rate',
    icon: ScanLine,
    label: 'SCANS / SEC',
    value: '28.4',
    unit: 'fps',
    status: 'nominal',
  },
  {
    id: 'temperature',
    icon: Thermometer,
    label: 'CELL TEMP',
    value: '38.2',
    unit: '°C',
    status: 'warning',
  },
  {
    id: 'guardian',
    icon: Shield,
    label: 'GUARDIAN SYS',
    value: 'ARMED',
    status: 'active',
  },
  {
    id: 'voltage',
    icon: Zap,
    label: 'VOLTAGE',
    value: '3.87',
    unit: 'V',
    status: 'nominal',
  },
  {
    id: 'latency',
    icon: Timer,
    label: 'WS LATENCY',
    value: '< 2',
    unit: 'ms',
    status: 'nominal',
  },
  {
    id: 'ledger',
    icon: Database,
    label: 'LEDGER SYNC',
    value: '14,882',
    unit: 'TX',
    status: 'active',
    span: 'col-2',
    detail: 'Last block: 4.2s ago · Hash: 0xF3A9…C441',
  },
  {
    id: 'hand-tracking',
    icon: Hand,
    label: 'HAND TRACK',
    value: 'ONLINE',
    status: 'nominal',
  },
  {
    id: 'wifi',
    icon: Wifi,
    label: 'WI-FI 6E',
    value: '-41',
    unit: 'dBm',
    status: 'nominal',
  },
  {
    id: 'assets-scanned',
    icon: Package,
    label: 'ASSETS TODAY',
    value: '1,429',
    unit: 'SCANNED',
    status: 'active',
  },
]

const STATUS_COLORS: Record<BentoCell['status'], { text: string; border: string; bg: string; dot: string }> = {
  nominal:  { text: '#00F0FF',  border: 'rgba(0,240,255,0.18)',  bg: 'rgba(0,240,255,0.03)',  dot: '#00F0FF' },
  warning:  { text: '#FF9900',  border: 'rgba(255,153,0,0.25)',  bg: 'rgba(255,153,0,0.04)',  dot: '#FF9900' },
  critical: { text: '#FF4040',  border: 'rgba(255,64,64,0.3)',   bg: 'rgba(255,64,64,0.04)',  dot: '#FF4040' },
  active:   { text: '#00F0FF',  border: 'rgba(0,240,255,0.30)',  bg: 'rgba(0,240,255,0.05)',  dot: '#00F0FF' },
}

function BentoCard({ cell, index }: { cell: BentoCell; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const colors = STATUS_COLORS[cell.status]

  const isDoubleCol = cell.span === 'col-2'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col justify-between p-4 border transition-all duration-300 cursor-default select-none ${
        isDoubleCol ? 'col-span-2' : 'col-span-1'
      }`}
      style={{
        borderColor: hovered ? colors.border.replace('0.18', '0.55').replace('0.25', '0.65').replace('0.30', '0.70') : colors.border,
        background: hovered ? colors.bg.replace('0.03', '0.08').replace('0.04', '0.1').replace('0.05', '0.1') : colors.bg,
        boxShadow: hovered ? `0 0 20px ${colors.text}18` : 'none',
      }}
    >
      {/* Top row: label + status dot */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <cell.icon size={11} strokeWidth={1.5} style={{ color: colors.text, opacity: 0.7 }} />
          <span className="font-mono text-[8px] tracking-[0.28em] uppercase" style={{ color: `${colors.text}80` }}>
            {cell.label}
          </span>
        </div>
        <span
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor: colors.dot,
            boxShadow: hovered ? `0 0 6px ${colors.dot}` : 'none',
            animation: cell.status === 'active' ? 'pulse 2s infinite' : 'none',
          }}
        />
      </div>

      {/* Main value */}
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-mono font-black leading-none"
          style={{
            fontSize: isDoubleCol ? '2.2rem' : '1.6rem',
            color: colors.text,
            textShadow: hovered ? `0 0 20px ${colors.text}50` : 'none',
          }}
        >
          {cell.value}
        </span>
        {cell.unit && (
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: `${colors.text}50` }}>
            {cell.unit}
          </span>
        )}
      </div>

      {/* Detail line (double-width cards only) */}
      <AnimatePresence>
        {cell.detail && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-mono text-[8px] tracking-[0.15em] mt-2 uppercase"
            style={{ color: `${colors.text}35` }}
          >
            {cell.detail}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Corner bracket on hover */}
      {hovered && (
        <>
          <span className="absolute top-0 left-0 h-2 w-2 border-t border-l" style={{ borderColor: colors.text }} />
          <span className="absolute top-0 right-0 h-2 w-2 border-t border-r" style={{ borderColor: colors.text }} />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l" style={{ borderColor: colors.text }} />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r" style={{ borderColor: colors.text }} />
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
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="h-px w-8 bg-industrialAmber/50 flex-shrink-0" />
        <p className="font-mono text-[10px] tracking-[0.4em] text-industrialAmber/60 uppercase">
          LIVE SYSTEM METRICS · VECTRA XR RUNTIME
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="font-mono text-2xl md:text-3xl font-bold text-neonCyan mb-10 tracking-tight max-w-lg"
        style={{ textShadow: '0 0 30px rgba(0,240,255,0.2)' }}
      >
        Command-center visibility across every tracked asset.
      </motion.p>

      {/* Bento grid — 4-col on desktop, 2-col on tablet, 1-col on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CELLS.map((cell, i) => (
          <BentoCard key={cell.id} cell={cell} index={i} />
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="font-mono text-[8px] tracking-[0.2em] text-neonCyan/20 uppercase mt-4 text-right"
      >
        SIMULATED DEMO DATA · CONNECT HEADSET FOR LIVE STREAM
      </motion.p>
    </section>
  )
}
