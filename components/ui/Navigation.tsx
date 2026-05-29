'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import TopBanner from './TopBanner'
import { NAV_ITEMS, BRAND } from '@/lib/constants'

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-3"
      >
        {/* Glass band behind the header */}
        <div className="absolute inset-0 -z-10 glass glass-edge border-x-0 border-t-0 rounded-none" />

        {/* Brand emblem + wordmark */}
        <TopBanner size={62} />

        {/* Desktop neon wordart links */}
        <nav className="hidden md:flex items-center gap-9 pointer-events-auto">
          {NAV_ITEMS.map((item, i) => {
            const active = pathname === item.href
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i + 0.3, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={`font-mono font-bold text-sm tracking-[0.22em] uppercase transition-transform duration-200 hover:scale-105 inline-block ${
                    i % 2 === 1 ? 'neon-wordart-amber' : 'neon-wordart'
                  } ${active ? 'neon-flicker' : ''}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 border border-neonCyan/30 pointer-events-auto"
          aria-label="Open menu"
        >
          <Menu size={16} className="text-neonCyan" strokeWidth={1.5} />
        </button>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-10 glass"
            style={{ backdropFilter: 'blur(22px)' }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 border border-neonCyan/30"
              aria-label="Close menu"
            >
              <X size={16} className="text-neonCyan" strokeWidth={1.5} />
            </button>

            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-mono font-black text-3xl tracking-[0.18em] uppercase ${
                    i % 2 === 1 ? 'neon-wordart-amber' : 'neon-wordart'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <span className="absolute bottom-8 font-mono text-[8px] tracking-[0.3em] text-neonCyan/30 uppercase">
              {BRAND.company} · {BRAND.buildHash}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
