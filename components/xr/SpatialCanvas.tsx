'use client'

import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from '@react-three/drei'
import { XR, VRButton, Controllers, Hands } from '@react-three/xr'
import EnvironmentNodes from './EnvironmentNodes'
import FloatingDataGrid from './FloatingDataGrid'
import InteractiveShards from './InteractiveShards'
import { SCENE_CONFIG } from '@/lib/constants'

type Props = {
  /** Render the full interactable shard sandbox (landing page). */
  sandbox?: boolean
  /** Allow scroll-wheel dolly zoom. */
  enableZoom?: boolean
}

export default function SpatialCanvas({ sandbox = false, enableZoom = false }: Props) {
  return (
    <>
      {/* Native "Enter VR" button — visible only in WebXR-capable browsers (Quest). */}
      <VRButton />

      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        camera={{
          position: SCENE_CONFIG.cameraPosition,
          fov: SCENE_CONFIG.cameraFov,
          near: 0.1,
          far: 120,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: 0,
        }}
        dpr={[1, 1.5]}
        shadows={false}
      >
        <XR>
          {/* VR input — controllers + articulated hand tracking on Quest */}
          <Controllers />
          <Hands />

          <EnvironmentNodes />
          <FloatingDataGrid />

          {/* Interactive grabbable shards — the VR "sandbox" layer */}
          {sandbox && <InteractiveShards count={14} />}

          {/*
            OrbitControls — desktop drag-to-rotate. autoRotate keeps the scene
            alive when idle; rotateSpeed tuned for a tactile feel.
          */}
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={false}
            autoRotate
            autoRotateSpeed={sandbox ? 0.25 : 0.35}
            rotateSpeed={0.6}
            zoomSpeed={0.5}
            minDistance={5}
            maxDistance={24}
            maxPolarAngle={Math.PI / 1.55}
            minPolarAngle={Math.PI / 3.4}
            makeDefault
          />

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </XR>
      </Canvas>
    </>
  )
}
