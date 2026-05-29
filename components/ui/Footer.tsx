'use client'

import Link from 'next/link'
import { Github, ArrowUpRight } from 'lucide-react'
import { FOOTER, BRAND, LINKS } from '@/lib/constants'

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto')
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-neonCyan/10 mt-10">
      {/* Glass backdrop */}
      <div className="relative glass glass-edge rounded-none border-x-0 border-b-0">
        <div className="relative px-6 md:px-12 lg:px-16 py-14 max-w-7xl mx-auto">
          {/* Top: brand statement + formation */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 border-b border-neonCyan/8">
            <div className="max-w-sm">
              <span className="font-mono font-black text-xl tracking-[0.18em] uppercase neon-wordart">
                ASTRA MATRIX
              </span>
              <p className="font-mono text-xs glass-text-dim leading-relaxed mt-4">
                {BRAND.sub} We don&apos;t build software — we open gates. Operating from the
                threshold since 2020, distributed across every timezone that matters.
              </p>

              {/* Company formation block */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6">
                {FOOTER.formation.map((row) => (
                  <div key={row.label} className="flex flex-col">
                    <span className="font-mono text-[7px] tracking-[0.28em] text-neonCyan/30 uppercase">
                      {row.label}
                    </span>
                    <span className="font-mono text-[10px] glass-text tracking-[0.06em]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
              {FOOTER.columns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-3">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-industrialAmber/55 uppercase">
                    {col.heading}
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {isExternal(link.href) ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 font-mono text-[10px] glass-text-dim hover:text-neonCyan tracking-[0.08em] uppercase transition-colors duration-200"
                          >
                            {link.label}
                            <ArrowUpRight
                              size={9}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              strokeWidth={1.5}
                            />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="font-mono text-[10px] glass-text-dim hover:text-neonCyan tracking-[0.08em] uppercase transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: GitHub callout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-b border-neonCyan/8">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-5 py-3 border border-neonCyan/20 hover:border-neonCyan/55 transition-colors duration-200"
            >
              <Github size={16} className="text-neonCyan/70 group-hover:text-neonCyan transition-colors" strokeWidth={1.5} />
              <span className="font-mono text-[10px] tracking-[0.22em] glass-text uppercase">
                github.com/Astra-Matrix
              </span>
              <ArrowUpRight size={12} className="text-neonCyan/40 group-hover:text-neonCyan transition-colors" strokeWidth={1.5} />
            </a>

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-neonCyan animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.25em] text-neonCyan/35 uppercase">
                ALL SYSTEMS OPERATIONAL · GODMODE ONLINE
              </span>
            </div>
          </div>

          {/* Bottom: copyright + legal microcopy */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
            <p className="font-mono text-[9px] tracking-[0.18em] glass-text-dim uppercase">
              © {year} Astra Matrix, Inc. All rights reserved.
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] text-neonCyan/25 uppercase">
              {BRAND.buildHash} · Engineered in the threshold
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
