'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Menu, X, Cpu } from 'lucide-react'
import { SIDEBAR_SECTIONS } from '@/lib/docsContent'
import { BRAND } from '@/lib/constants'

type Props = {
  activeId: string
  onSelect: (id: string) => void
}

function NavItem({
  section,
  activeId,
  onSelect,
}: {
  section: (typeof SIDEBAR_SECTIONS)[number]
  activeId: string
  onSelect: (id: string) => void
}) {
  const isActive = activeId === section.id || section.children.some((c) => c.id === activeId)
  const [open, setOpen] = useState(isActive)

  const hasChildren = section.children.length > 0

  return (
    <div>
      <button
        onClick={() => {
          onSelect(section.id)
          if (hasChildren) setOpen((p) => !p)
        }}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-150 group"
        style={{
          background: activeId === section.id ? 'rgba(0,240,255,0.06)' : 'transparent',
          borderLeft: activeId === section.id ? '2px solid #00F0FF' : '2px solid transparent',
        }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-150"
          style={{ color: activeId === section.id ? '#00F0FF' : 'rgba(0,240,255,0.4)' }}
        >
          {section.label}
        </span>
        {hasChildren && (
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={11} strokeWidth={1.5} style={{ color: 'rgba(0,240,255,0.3)' }} />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {section.children.map((child) => (
              <button
                key={child.id}
                onClick={() => onSelect(child.id)}
                className="w-full flex items-center gap-2 px-6 py-2 text-left transition-colors duration-150"
                style={{
                  background: activeId === child.id ? 'rgba(0,240,255,0.04)' : 'transparent',
                  borderLeft: activeId === child.id ? '2px solid rgba(0,240,255,0.5)' : '2px solid transparent',
                }}
              >
                <span className="h-px w-3 flex-shrink-0" style={{ background: 'rgba(0,240,255,0.15)' }} />
                <span
                  className="font-mono text-[9px] tracking-[0.18em] uppercase transition-colors duration-150"
                  style={{ color: activeId === child.id ? 'rgba(0,240,255,0.8)' : 'rgba(0,240,255,0.28)' }}
                >
                  {child.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SidebarContent({ activeId, onSelect }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand header */}
      <div className="px-4 py-5 border-b border-neonCyan/8">
        <Link href="/" className="flex items-center gap-2.5">
          <Cpu size={16} className="text-neonCyan" strokeWidth={1.5} />
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-mono text-[8px] tracking-[0.3em] text-neonCyan/40 uppercase">
              {BRAND.company}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-neonCyan font-bold uppercase">
              {BRAND.product}
            </span>
          </div>
        </Link>
        <p className="font-mono text-[8px] tracking-[0.25em] text-industrialAmber/50 uppercase mt-3">
          DEVELOPER DOCS
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <p className="px-4 pb-2 font-mono text-[8px] tracking-[0.35em] text-neonCyan/20 uppercase">
          CONTENTS
        </p>
        {SIDEBAR_SECTIONS.map((section) => (
          <NavItem
            key={section.id}
            section={section}
            activeId={activeId}
            onSelect={onSelect}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-neonCyan/8 px-4 py-3">
        <p className="font-mono text-[8px] tracking-[0.2em] text-neonCyan/20 uppercase">
          {BRAND.version}
        </p>
        <p className="font-mono text-[8px] tracking-[0.2em] text-neonCyan/15 uppercase mt-0.5">
          {BRAND.buildHash}
        </p>
      </div>
    </div>
  )
}

export default function SidebarNav({ activeId, onSelect }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden flex items-center justify-center w-9 h-9 border border-neonCyan/25 bg-slate/80 backdrop-blur-sm"
        aria-label="Open navigation"
      >
        <Menu size={15} className="text-neonCyan/70" strokeWidth={1.5} />
      </button>

      {/* Desktop sidebar — always visible */}
      <aside
        className="hidden md:flex flex-col w-[250px] flex-shrink-0 h-full border-r border-neonCyan/8 overflow-hidden"
        style={{ background: '#1A1A1E' }}
      >
        <SidebarContent activeId={activeId} onSelect={onSelect} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-obsidian/80 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed top-0 left-0 z-40 w-[260px] h-full border-r border-neonCyan/12 md:hidden"
              style={{ background: '#1A1A1E' }}
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 border border-neonCyan/20"
                aria-label="Close navigation"
              >
                <X size={13} className="text-neonCyan/50" strokeWidth={1.5} />
              </button>

              <SidebarContent
                activeId={activeId}
                onSelect={(id) => {
                  onSelect(id)
                  setMobileOpen(false)
                }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
