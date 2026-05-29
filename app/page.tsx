import dynamic from 'next/dynamic'
import Navigation from '@/components/ui/Navigation'
import HeroOverlay from '@/components/ui/HeroOverlay'

// Three.js / WebGL requires the browser DOM — SSR disabled for the canvas layer.
const SpatialCanvas = dynamic(() => import('@/components/xr/SpatialCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-obsidian">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border border-neonCyan/30 rotate-45 animate-spin" style={{ animationDuration: '3s' }} />
        <span className="font-mono text-[10px] tracking-[0.45em] text-neonCyan/30 uppercase animate-pulse">
          INITIALIZING SPATIAL SANDBOX
        </span>
      </div>
    </div>
  ),
})

export default function HomePage() {
  return (
    <main className="relative w-full h-full overflow-hidden bg-obsidian">
      {/* z-0 — full interactive VR sandbox: drag to orbit, hover/grab shards, Enter VR */}
      <SpatialCanvas sandbox enableZoom />

      {/* z-30 — top banner: spinning sigil + neon wordart links */}
      <Navigation />

      {/* z-10 — glass hero overlay (mostly pointer-events-none so the sandbox stays interactive) */}
      <HeroOverlay />
    </main>
  )
}
