'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BRAND } from '@/lib/constants'

// The sigil is a self-contained R3F canvas — must be client-only.
const BrandSigil = dynamic(() => import('@/components/xr/BrandSigil'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 border border-neonCyan/30 rotate-45 animate-pulse" />
    </div>
  ),
})

type Props = {
  /** Pixel size of the spinning emblem. */
  size?: number
  /** Show the ASTRA MATRIX wordmark beside the emblem. */
  showWordmark?: boolean
}

export default function TopBanner({ size = 64, showWordmark = true }: Props) {
  return (
    <Link href="/" className="group flex items-center gap-3 pointer-events-auto select-none">
      {/* 3D slowly spinning brand sigil */}
      <div
        className="relative flex-shrink-0"
        style={{ width: size, height: size }}
        aria-label="Astra Matrix emblem"
      >
        <BrandSigil />
        {/* Soft radial backlight behind the emblem */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none gap-1">
          <span className="font-mono text-[8px] tracking-[0.42em] text-neonCyan/45 uppercase">
            {BRAND.company.split(' ')[0]}
          </span>
          <span
            className="font-mono text-base tracking-[0.18em] font-black uppercase neon-wordart"
            style={{ fontSize: size > 56 ? '1.05rem' : '0.85rem' }}
          >
            MATRIX
          </span>
        </div>
      )}
    </Link>
  )
}
