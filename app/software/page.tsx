import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import VectraProduct from '@/components/software/VectraProduct'

export const metadata: Metadata = {
  title: 'Software | Astra Matrix',
  description:
    'Astra Matrix software releases. Featuring Vectra XR — our debut native spatial computing application for Meta Quest 3.',
}

const SpatialCanvas = dynamic(() => import('@/components/xr/SpatialCanvas'), {
  ssr: false,
})

export default function SoftwarePage() {
  return (
    <div className="page-scroll bg-obsidian scanlines">
      {/* Faint ambient 3D backdrop (non-sandbox) */}
      <SpatialCanvas />

      <Navigation />

      {/* Content */}
      <div className="relative z-10 pt-32 pb-10 px-6 md:px-12 lg:px-16 min-h-screen flex flex-col">
        {/* Section header */}
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-[10px] tracking-[0.5em] text-industrialAmber/55 uppercase mb-5">
            ASTRA MATRIX · SOFTWARE
          </p>
          <h1
            className="font-mono font-black tracking-tight leading-none mb-6 neon-wordart"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}
          >
            RELEASES
          </h1>
          <p className="font-mono text-sm glass-text-dim leading-relaxed max-w-xl">
            Our software ships rarely and deliberately. Each release is a complete,
            production-grade system — not a prototype, not a demo. Select a product to
            review its full specifications and acquire it.
          </p>
        </div>

        {/* Product grid — currently one flagship release */}
        <div className="flex flex-wrap gap-6 items-start">
          <VectraProduct />

          {/* "More coming" placeholder tile */}
          <div className="glass max-w-md w-full md:w-auto md:flex-1 min-h-[360px] flex flex-col items-center justify-center p-8 border-dashed border-neonCyan/15">
            <span className="font-mono text-[10px] tracking-[0.3em] text-neonCyan/30 uppercase mb-2">
              MORE GATES OPENING
            </span>
            <span className="font-mono text-[8px] tracking-[0.22em] text-neonCyan/18 uppercase">
              NEXT RELEASE · CLASSIFIED
            </span>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      <Footer />
    </div>
  )
}
