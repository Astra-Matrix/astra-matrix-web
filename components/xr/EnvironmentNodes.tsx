'use client'

import { Stars, Grid } from '@react-three/drei'
import { SCENE_CONFIG, PALETTE } from '@/lib/constants'

export default function EnvironmentNodes() {
  return (
    <>
      {/* Atmospheric depth fog — matches obsidian background */}
      <fog attach="fog" args={[SCENE_CONFIG.fogColor, SCENE_CONFIG.fogNear, SCENE_CONFIG.fogFar]} />

      {/* Very dim cyan ambient to keep scene readable without washing it out */}
      <ambientLight intensity={0.04} color={PALETTE.neonCyan} />

      {/* Key fill from above — simulates cold overhead industrial lighting */}
      <pointLight
        position={[0, 10, 0]}
        intensity={0.35}
        color={PALETTE.neonCyan}
        distance={35}
        decay={2}
      />

      {/* Rim accent from lower-left — warm amber counterbalance */}
      <pointLight
        position={[-12, -6, -14]}
        intensity={0.18}
        color={PALETTE.industrialAmber}
        distance={25}
        decay={2}
      />

      {/* Deep-space star field backdrop */}
      <Stars
        radius={90}
        depth={60}
        count={2500}
        factor={2.2}
        saturation={0}
        fade
        speed={0.25}
      />

      {/* Horizontal coordinate grid at floor level */}
      <Grid
        position={[0, -4.5, 0]}
        args={[SCENE_CONFIG.gridSize, SCENE_CONFIG.gridSize]}
        cellSize={1}
        cellThickness={0.4}
        cellColor={PALETTE.neonCyan}
        sectionSize={5}
        sectionThickness={0.9}
        sectionColor={PALETTE.neonCyan}
        fadeDistance={28}
        fadeStrength={2.5}
        followCamera={false}
        infiniteGrid
      />
    </>
  )
}
