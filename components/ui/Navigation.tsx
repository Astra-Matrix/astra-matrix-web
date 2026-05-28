'use client'

import { motion } from 'framer-motion'
import { Terminal, Cpu } from 'lucide-react'
import { NAV_ITEMS, BRAND } from '@/lib/constants'

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 md:px-12"
    >
      {/* Brand identity */}
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <Cpu size={20} className="text-neonCyan" strokeWidth={1.5} />
          <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-neonCyan animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-neonCyan" />
        </div>
        <div className="flex flex-col leading-none gap-0.5">
          <span className="font-mono text-[9px] tracking-[0.35em] text-neonCyan/50 uppercase">
            {BRAND.company}
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-neonCyan font-bold uppercase">
            {BRAND.product}
          </span>
        </div>
      </div>

      {/* Primary nav links — hidden on small screens */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
            className="font-mono text-[10px] tracking-[0.28em] text-neonCyan/45 hover:text-neonCyan transition-colors duration-200 uppercase"
          >
            {item.label}
          </motion.a>
        ))}
      </div>

      {/* Status beacon — build version + live indicator */}
      <div className="flex items-center gap-2">
        <Terminal size={13} className="text-industrialAmber/80" strokeWidth={1.5} />
        <span className="font-mono text-[9px] tracking-[0.22em] text-industrialAmber/60 uppercase hidden sm:block">
          {BRAND.version}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-industrialAmber animate-pulse ml-1" />
      </div>
    </motion.nav>
  )
}
