'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, ScanLine, Activity, Database } from 'lucide-react'

type FeatureEntry = {
  id: string
  icon: React.ElementType
  tag: string
  title: string
  description: string
  detail: string
  accent: 'cyan' | 'amber'
  align: 'left' | 'right'
}

const FEATURES: FeatureEntry[] = [
  {
    id: 'spatial-anchoring',
    icon: MapPin,
    tag: 'MODULE 01 · SPATIAL',
    title: 'Spatial Anchoring',
    description: 'Pin telemetry dashboards directly to physical hardware and battery modules.',
    detail:
      'Vectra XR uses the Meta Scene API to persist anchor UUIDs against asset IDs in the Metastrate ledger. When a technician re-enters the same physical environment, dashboards re-materialize at sub-centimeter accuracy above the exact hardware they belong to — regardless of device reboot or session change.',
    accent: 'cyan',
    align: 'left',
  },
  {
    id: 'ml-vision',
    icon: ScanLine,
    tag: 'MODULE 02 · VISION',
    title: 'ML Kit Vision Pipeline',
    description: 'Instant QR and barcode parsing via passthrough cameras.',
    detail:
      'On-device ML Kit Barcode Scanning processes raw YUV_420_888 frames from the Quest 3 passthrough cameras at up to 30fps. Code 128, QR, and Data Matrix formats are decoded in under 80ms on the XR2 Gen 3 SOC with zero network dependency. Results are piped directly into the ECS via a lock-free queue.',
    accent: 'amber',
    align: 'right',
  },
  {
    id: 'real-time-diagnostics',
    icon: Activity,
    tag: 'MODULE 03 · TELEMETRY',
    title: 'Real-Time Diagnostics',
    description: 'Live voltage, temperature, and maintenance state streams.',
    detail:
      'After asset identification, Vectra XR connects to the embedded Nordic nRF52840 telemetry board via BLE GATT. Voltage, cell temperature, and maintenance flags are broadcast at 20Hz over custom service UUID 0x4153 and displayed on a Jetpack Compose XR panel anchored in 3D space above the physical unit.',
    accent: 'cyan',
    align: 'left',
  },
  {
    id: 'metastrate-ledger',
    icon: Database,
    tag: 'MODULE 04 · LEDGER',
    title: 'Metastrate Ledger Sync',
    description: 'Immutable, decentralized asset history tracking.',
    detail:
      'Every scan, diagnostics update, and maintenance flag change is written as a signed transaction to the Metastrate Substrate — a permissioned Merkle-chain ledger. Each state hash is derived from its predecessor, producing a cryptographically tamper-evident audit trail accessible to fleet managers across the organization.',
    accent: 'amber',
    align: 'right',
  },
]

type Props = { index: number; feature: FeatureEntry }

function FeatureRow({ feature, index }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  const isLeft = feature.align === 'left'
  const isCyan = feature.accent === 'cyan'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 * index }}
      className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8 md:gap-16 py-16 border-b border-neonCyan/8`}
    >
      {/* Icon column */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <div
          className="w-14 h-14 flex items-center justify-center border"
          style={{
            borderColor: isCyan ? 'rgba(0,240,255,0.25)' : 'rgba(255,153,0,0.25)',
            background: isCyan ? 'rgba(0,240,255,0.04)' : 'rgba(255,153,0,0.04)',
          }}
        >
          <feature.icon
            size={22}
            strokeWidth={1.5}
            style={{ color: isCyan ? '#00F0FF' : '#FF9900' }}
          />
        </div>
        {/* Vertical rule connector */}
        <div
          className="w-px h-16 hidden md:block"
          style={{ background: isCyan ? 'rgba(0,240,255,0.12)' : 'rgba(255,153,0,0.12)' }}
        />
      </div>

      {/* Text column */}
      <div className="flex-1 max-w-xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 * index + 0.15, duration: 0.4 }}
          className="font-mono text-[9px] tracking-[0.4em] mb-3 uppercase"
          style={{ color: isCyan ? 'rgba(0,240,255,0.45)' : 'rgba(255,153,0,0.45)' }}
        >
          {feature.tag}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 * index + 0.2, duration: 0.5 }}
          className="font-mono font-bold text-2xl md:text-3xl tracking-tight mb-3"
          style={{
            color: isCyan ? '#00F0FF' : '#FF9900',
            textShadow: isCyan
              ? '0 0 30px rgba(0,240,255,0.25)'
              : '0 0 30px rgba(255,153,0,0.25)',
          }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
          className="font-mono text-sm md:text-base text-neonCyan/80 mb-4 leading-snug"
        >
          {feature.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 * index + 0.4, duration: 0.5 }}
          className="font-mono text-xs leading-relaxed text-neonCyan/40"
        >
          {feature.detail}
        </motion.p>
      </div>

      {/* Right-side decorative index */}
      <div className="hidden lg:flex flex-col items-end gap-1 flex-shrink-0 self-center">
        <span
          className="font-mono text-[64px] font-black leading-none select-none"
          style={{ color: isCyan ? 'rgba(0,240,255,0.04)' : 'rgba(255,153,0,0.04)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  )
}

export default function FeatureShowcase() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-8 max-w-6xl mx-auto">
      {FEATURES.map((feature, i) => (
        <FeatureRow key={feature.id} feature={feature} index={i} />
      ))}
    </section>
  )
}
