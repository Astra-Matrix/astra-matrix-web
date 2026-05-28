'use client'

import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from '@react-three/drei'
import { XR, VRButton } from '@react-three/xr'
import EnvironmentNodes from './EnvironmentNodes'
import FloatingDataGrid from './FloatingDataGrid'
import { SCENE_CONFIG } from '@/lib/constants'

export default function SpatialCanvas() {
  return (
    <>
      {/*
        VRButton renders a native "Enter VR" button injected into <body>.
        It is visible only when the runtime advertises WebXR support (e.g. Meta Quest Browser).
        On desktop it remains hidden — no UI pollution.
      */}
      <VRButton />

      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        camera={{
          position: SCENE_CONFIG.cameraPosition,
          fov: SCENE_CONFIG.cameraFov,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          /*
            NoToneMapping (0) preserves the raw emissive/neon colors.
            Default ACESFilmic would desaturate the cyan/amber palette.
          */
          toneMapping: 0,
        }}
        // Allow device pixel ratio between 1x and 1.5x — AdaptiveDpr can lower it further
        dpr={[1, 1.5]}
        shadows={false}
      >
        {/*
          <XR> provides the WebXR session layer.
          When running inside Meta Quest Browser the user can click VRButton
          to enter an immersive-vr session and the scene occupies the full headset FOV.
        */}
        <XR>
          <EnvironmentNodes />
          <FloatingDataGrid />

          {/*
            OrbitControls — desktop drag-to-rotate experience.
            autoRotate keeps the scene alive when idle.
            Zoom + pan disabled: the scene is purely atmospheric.
          */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.35}
            maxPolarAngle={Math.PI / 1.65}
            minPolarAngle={Math.PI / 3.2}
          />

          {/* Automatically reduces DPR under GPU load to maintain 60 fps */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </XR>
      </Canvas>
    </>
  )
}
