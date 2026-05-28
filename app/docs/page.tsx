'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SidebarNav from '@/components/docs/SidebarNav'
import CodeBlock from '@/components/docs/CodeBlock'
import SystemArchitecture from '@/components/docs/SystemArchitecture'
import { DOC_SECTIONS } from '@/lib/docsContent'
import type { DocSection, DocSubsection } from '@/lib/docsContent'
import { ExternalLink } from 'lucide-react'

// ── Section renderer ──────────────────────────────────────────────────────────

function SubsectionBlock({ sub }: { sub: DocSubsection }) {
  return (
    <div className="mt-8 pl-4 border-l border-neonCyan/10">
      <h3 className="font-mono text-sm font-bold tracking-[0.1em] text-neonCyan/70 uppercase mb-4">
        {sub.title}
      </h3>
      {sub.content.map((para, i) => (
        <p key={i} className="font-mono text-xs leading-7 text-neonCyan/35 mb-3">
          {para}
        </p>
      ))}
      {sub.codeSnippets?.map((snippet) => (
        <CodeBlock key={snippet.filename} snippet={snippet} />
      ))}
    </div>
  )
}

function SectionBlock({ section }: { section: DocSection }) {
  const showArch = section.id === 'architecture'

  return (
    <article
      id={section.id}
      className="py-14 border-b border-neonCyan/6 scroll-mt-8"
    >
      {/* Section header */}
      <div className="mb-8">
        <p className="font-mono text-[9px] tracking-[0.4em] text-industrialAmber/50 uppercase mb-3">
          {section.navTitle}
        </p>
        <h2
          className="font-mono font-black text-2xl md:text-3xl tracking-tight leading-tight mb-3"
          style={{
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}
        >
          {section.title}
        </h2>
        <p className="font-mono text-xs tracking-[0.08em] text-neonCyan/40 mb-6">
          {section.subtitle}
        </p>
        <div className="h-px w-12 bg-neonCyan/15" />
      </div>

      {/* Architecture diagram — rendered once before the architecture content */}
      {showArch && <SystemArchitecture />}

      {/* Body paragraphs */}
      {section.content.map((para, i) => (
        <p key={i} className="font-mono text-[13px] leading-8 text-neonCyan/40 mb-5 max-w-3xl">
          {para}
        </p>
      ))}

      {/* Primary code snippets */}
      {section.codeSnippets?.map((snippet) => (
        <CodeBlock key={snippet.filename} snippet={snippet} />
      ))}

      {/* Subsections */}
      {section.subsections?.map((sub) => (
        <SubsectionBlock key={sub.id} sub={sub} />
      ))}
    </article>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeId, setActiveId] = useState(DOC_SECTIONS[0].id)
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll spy — update active section based on scroll position
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const onScroll = () => {
      const scrollY = container.scrollTop
      for (let i = DOC_SECTIONS.length - 1; i >= 0; i--) {
        const el = container.querySelector(`#${DOC_SECTIONS[i].id}`) as HTMLElement | null
        if (el && el.offsetTop - 80 <= scrollY) {
          setActiveId(DOC_SECTIONS[i].id)
          return
        }
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // Sidebar nav click — scroll to section
  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
    const container = contentRef.current
    if (!container) return
    const el = container.querySelector(`#${id}`) as HTMLElement | null
    if (el) container.scrollTo({ top: el.offsetTop - 32, behavior: 'smooth' })
  }, [])

  return (
    <>
      <SidebarNav activeId={activeId} onSelect={handleSelect} />

      {/* Main scrollable content column */}
      <main
        ref={contentRef}
        className="flex-1 overflow-y-auto h-full"
        style={{ background: '#121214' }}
      >
        {/* Top breadcrumb bar */}
        <div className="sticky top-0 z-10 border-b border-neonCyan/8 bg-obsidian/95 backdrop-blur-sm px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] tracking-[0.28em] text-neonCyan/25 uppercase">
              VECTRA XR
            </span>
            <span className="text-neonCyan/15">/</span>
            <span className="font-mono text-[8px] tracking-[0.28em] text-neonCyan/50 uppercase">
              {DOC_SECTIONS.find((s) => s.id === activeId)?.navTitle ?? 'DOCS'}
            </span>
          </div>
          <a
            href="https://github.com/Astra-Matrix/astra-matrix-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.22em] text-neonCyan/25 hover:text-neonCyan/60 uppercase transition-colors duration-200"
          >
            GITHUB
            <ExternalLink size={9} strokeWidth={1.5} />
          </a>
        </div>

        {/* Doc content */}
        <div className="px-6 md:px-12 lg:px-16 max-w-4xl">
          {/* Page hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="pt-12 pb-6 border-b border-neonCyan/6 mb-2"
          >
            <p className="font-mono text-[9px] tracking-[0.45em] text-industrialAmber/50 uppercase mb-4">
              DEVELOPER DOCUMENTATION
            </p>
            <h1
              className="font-mono font-black tracking-tight leading-none mb-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#00F0FF',
                textShadow: '0 0 40px rgba(0,240,255,0.2)',
              }}
            >
              VECTRA XR SDK
            </h1>
            <p className="font-mono text-sm text-neonCyan/40 leading-relaxed max-w-2xl">
              Architecture guides, Kotlin code samples, and integration tutorials for
              building on the Meta Spatial SDK with Jetpack Compose XR, CameraX, ML Kit,
              and the Metastrate Substrate.
            </p>

            {/* Quick-start badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                'Meta Spatial SDK 0.5+',
                'Kotlin 1.9',
                'Compose XR 1.0-alpha',
                'Android API 32+',
                'Quest 3 Only',
              ].map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-[8px] tracking-[0.18em] text-neonCyan/40 uppercase px-2.5 py-1 border border-neonCyan/12"
                  style={{ background: 'rgba(0,240,255,0.03)' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* All doc sections */}
          {DOC_SECTIONS.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          {/* Footer */}
          <footer className="py-16 flex flex-col gap-3">
            <div className="h-px w-full bg-neonCyan/6" />
            <div className="flex items-center justify-between pt-2">
              <p className="font-mono text-[8px] tracking-[0.2em] text-neonCyan/20 uppercase">
                ASTRA MATRIX · VECTRA XR SDK DOCS
              </p>
              <p className="font-mono text-[8px] tracking-[0.2em] text-industrialAmber/25 uppercase">
                LAST UPDATED: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
