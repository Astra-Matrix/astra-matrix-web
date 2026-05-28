import dynamic from 'next/dynamic'
import Navigation from '@/components/ui/Navigation'
import HeroOverlay from '@/components/ui/HeroOverlay'

// Three.js / WebGL requires the browser DOM — SSR must be disabled for the canvas layer.
const SpatialCanvas = dynamic(() => import('@/components/xr/SpatialCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-obsidian">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="h-1 w-8 bg-neonCyan/20 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.45em] text-neonCyan/30 uppercase animate-pulse">
          INITIALIZING SPATIAL RENDERER
        </span>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="h-1 w-8 bg-neonCyan/20 animate-pulse"
              style={{ animationDelay: `${i * 0.15 + 0.45}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
})

export default function HomePage() {
  return (
    <main className="relative w-full h-full overflow-hidden bg-obsidian">
      {/* z-0 — Three.js WebXR canvas fills entire viewport */}
      <SpatialCanvas />

      {/* z-10 — Navigation bar: pointer events active for links */}
      <Navigation />

      {/* z-10 — Hero copy & CTA overlay: pointer-events-none by default,
          re-enabled specifically on interactive children */}
      <HeroOverlay />
    </main>
  )
}
