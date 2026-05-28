'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  Camera,
  ScanLine,
  Cpu,
  MapPin,
  LayoutTemplate,
  Server,
  ArrowRight,
  ArrowDown,
} from 'lucide-react'

type FlowNode = {
  id: string
  icon: React.ElementType
  label: string
  sublabel: string
  accent: 'cyan' | 'amber' | 'dim'
}

const FLOW: FlowNode[] = [
  {
    id: 'physical-scan',
    icon: Camera,
    label: 'Physical Scan',
    sublabel: 'QR / Barcode on hardware asset',
    accent: 'dim',
  },
  {
    id: 'camerax',
    icon: ScanLine,
    label: 'CameraX Analyzer',
    sublabel: 'YUV_420_888 frame pipeline at 30fps',
    accent: 'cyan',
  },
  {
    id: 'mlkit',
    icon: Cpu,
    label: 'ML Kit Barcode Engine',
    sublabel: 'On-device decode · < 80ms · no network',
    accent: 'amber',
  },
  {
    id: 'viewmodel',
    icon: Cpu,
    label: 'ViewModel State',
    sublabel: 'Kotlin StateFlow · ECS component write',
    accent: 'cyan',
  },
  {
    id: 'spatial-anchor',
    icon: MapPin,
    label: 'Spatial Anchor',
    sublabel: 'Meta Scene API · sub-centimeter persistence',
    accent: 'amber',
  },
  {
    id: 'compose-ui',
    icon: LayoutTemplate,
    label: 'Compose XR Panel',
    sublabel: 'Jetpack Compose XR · Compositor layer',
    accent: 'cyan',
  },
  {
    id: 'backend',
    icon: Server,
    label: 'Astra Matrix Backend',
    sublabel: 'Metastrate Substrate · WebSocket sync',
    accent: 'dim',
  },
]

const ACCENT_STYLES: Record<FlowNode['accent'], { border: string; text: string; bg: string }> = {
  cyan:  { border: 'rgba(0,240,255,0.22)', text: '#00F0FF', bg: 'rgba(0,240,255,0.04)' },
  amber: { border: 'rgba(255,153,0,0.22)', text: '#FF9900', bg: 'rgba(255,153,0,0.04)' },
  dim:   { border: 'rgba(0,240,255,0.08)', text: 'rgba(0,240,255,0.4)', bg: 'transparent' },
}

export default function SystemArchitecture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="my-10">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[9px] tracking-[0.35em] text-industrialAmber/50 uppercase mb-6"
      >
        DATA FLOW · VECTRA XR PIPELINE
      </motion.p>

      {/* Desktop: horizontal flow with arrows */}
      <div className="hidden lg:flex items-stretch gap-0 overflow-x-auto pb-2">
        {FLOW.map((node, i) => {
          const styles = ACCENT_STYLES[node.accent]
          const isLast = i === FLOW.length - 1
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="flex items-center"
            >
              {/* Node card */}
              <div
                className="flex flex-col items-center gap-2 px-3 py-4 border w-[120px] flex-shrink-0 text-center"
                style={{ borderColor: styles.border, background: styles.bg }}
              >
                <node.icon size={16} strokeWidth={1.5} style={{ color: styles.text }} />
                <span
                  className="font-mono text-[9px] tracking-[0.1em] font-bold leading-tight uppercase"
                  style={{ color: styles.text }}
                >
                  {node.label}
                </span>
                <span className="font-mono text-[7px] tracking-[0.08em] text-neonCyan/25 leading-snug">
                  {node.sublabel}
                </span>
              </div>

              {/* Arrow connector */}
              {!isLast && (
                <div className="flex items-center flex-shrink-0 px-1">
                  <ArrowRight size={12} strokeWidth={1.5} style={{ color: 'rgba(0,240,255,0.2)' }} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="lg:hidden flex flex-col gap-0">
        {FLOW.map((node, i) => {
          const styles = ACCENT_STYLES[node.accent]
          const isLast = i === FLOW.length - 1
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex flex-col"
            >
              <div
                className="flex items-center gap-3 px-4 py-3 border"
                style={{ borderColor: styles.border, background: styles.bg }}
              >
                <node.icon size={14} strokeWidth={1.5} style={{ color: styles.text, flexShrink: 0 }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.15em] font-bold uppercase" style={{ color: styles.text }}>
                    {node.label}
                  </p>
                  <p className="font-mono text-[8px] tracking-[0.08em] text-neonCyan/25 mt-0.5">
                    {node.sublabel}
                  </p>
                </div>
                <span
                  className="ml-auto font-mono text-[8px] text-neonCyan/20"
                  style={{ flexShrink: 0 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {!isLast && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown size={10} strokeWidth={1.5} style={{ color: 'rgba(0,240,255,0.15)' }} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Latency summary strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
      >
        {[
          { label: 'FRAME → DECODE', value: '< 80ms' },
          { label: 'DECODE → ANCHOR', value: '< 20ms' },
          { label: 'ANCHOR → COMPOSE', value: '< 8ms' },
          { label: 'COMPOSE → SUBSTRATE', value: '< 120ms' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="h-px w-4 bg-industrialAmber/30" />
            <span className="font-mono text-[8px] tracking-[0.18em] text-neonCyan/25 uppercase">
              {label}:
            </span>
            <span className="font-mono text-[8px] tracking-[0.1em] text-industrialAmber/60 font-bold">
              {value}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
