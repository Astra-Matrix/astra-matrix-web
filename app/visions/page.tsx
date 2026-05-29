import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import ProjectGrid from '@/components/visions/ProjectGrid'
import { FileText, Download, Github, ArrowUpRight } from 'lucide-react'
import { DEV_PROGRAM_DOC, LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Visions | Astra Matrix',
  description:
    'Open-source projects, experiments, and the Astra Matrix Developer Partnership Program. See what we build in the open.',
}

const SpatialCanvas = dynamic(() => import('@/components/xr/SpatialCanvas'), {
  ssr: false,
})

export default function VisionsPage() {
  return (
    <div className="page-scroll bg-obsidian scanlines">
      {/* Ambient 3D backdrop */}
      <SpatialCanvas />

      <Navigation />

      <div className="relative z-10 pt-32 pb-10 px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-[10px] tracking-[0.5em] text-industrialAmber/55 uppercase mb-5">
            ASTRA MATRIX · VISIONS
          </p>
          <h1
            className="font-mono font-black tracking-tight leading-none mb-6 neon-wordart"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}
          >
            IN THE OPEN
          </h1>
          <p className="font-mono text-sm glass-text-dim leading-relaxed max-w-xl">
            A window into what we build when no one&apos;s watching — experiments, engines,
            protocols, and tools. Some of these became products. Some became philosophies.
            All of them are real.
          </p>
        </div>

        {/* GitHub project grid */}
        <div className="flex items-center gap-4 mb-6">
          <Github size={14} className="text-neonCyan/50" strokeWidth={1.5} />
          <span className="font-mono text-[9px] tracking-[0.35em] text-neonCyan/45 uppercase">
            SELECTED REPOSITORIES
          </span>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.2em] text-neonCyan/35 hover:text-neonCyan uppercase transition-colors ml-auto"
          >
            VIEW ALL ON GITHUB
            <ArrowUpRight size={10} strokeWidth={1.5} />
          </a>
        </div>

        <ProjectGrid />

        {/* Developer program download */}
        <div className="mt-20">
          <div className="relative glass glass-edge p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-10">
            <div className="flex-1">
              <p className="font-mono text-[9px] tracking-[0.4em] text-industrialAmber/55 uppercase mb-4">
                DEVELOPER PARTNERSHIP PROGRAM
              </p>
              <h2 className="font-mono font-black text-2xl md:text-3xl tracking-tight mb-4 neon-wordart">
                Want to develop with us?
              </h2>
              <p className="font-mono text-xs glass-text-dim leading-relaxed max-w-lg">
                We don&apos;t onboard developers — we recognize them. Download the official
                partnership document: engagement models, technical standards, IP terms, and
                exactly how to reach the threshold. No application form. Just a signal.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
                {['Engagement Models', 'Technical Standards', 'IP & Confidentiality', 'How to Reach Us'].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-px w-3 bg-industrialAmber/40" />
                      <span className="font-mono text-[8px] tracking-[0.18em] glass-text-dim uppercase">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Document icon + download */}
            <div className="flex flex-col items-stretch gap-3 w-full lg:w-auto flex-shrink-0">
              <div className="hidden lg:flex items-center justify-center w-full mb-2">
                <div className="w-16 h-16 flex items-center justify-center border border-neonCyan/25 bg-neonCyan/[0.04]">
                  <FileText size={26} className="text-neonCyan" strokeWidth={1.3} />
                </div>
              </div>
              <a
                href={DEV_PROGRAM_DOC}
                download
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 border border-neonCyan/50 hover:border-neonCyan bg-neonCyan/[0.05] hover:bg-neonCyan/[0.12] transition-all duration-300 font-mono text-[11px] tracking-[0.22em] uppercase neon-wordart"
              >
                <Download size={14} strokeWidth={1.5} />
                DOWNLOAD THE DEAL
              </a>
              <a
                href={DEV_PROGRAM_DOC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-neonCyan/15 hover:border-neonCyan/40 transition-colors duration-200 font-mono text-[9px] tracking-[0.22em] glass-text-dim hover:text-neonCyan uppercase"
              >
                READ IN BROWSER
                <ArrowUpRight size={11} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
