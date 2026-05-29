'use client'

import { Stars, Grid, Cloud, Clouds } from '@react-three/drei'
import * as THREE from 'three'
import { SCENE_CONFIG, PALETTE } from '@/lib/constants'

export default function EnvironmentNodes() {
  return (
    <>
      {/* Atmospheric depth fog — matches obsidian background */}
      <fog attach="fog" args={[SCENE_CONFIG.fogColor, SCENE_CONFIG.fogNear, SCENE_CONFIG.fogFar]} />

      {/* Ambient base — cold cyan */}
      <ambientLight intensity={0.06} color={PALETTE.neonCyan} />

      {/* Overhead key light */}
      <pointLight position={[0, 12, 0]} intensity={0.45} color={PALETTE.neonCyan} distance={40} decay={2} />

      {/* Warm amber rim from below-left */}
      <pointLight position={[-14, -6, -16]} intensity={0.22} color={PALETTE.industrialAmber} distance={30} decay={2} />

      {/* Magenta accent fill from the right for color variety */}
      <pointLight position={[16, 4, -8]} intensity={0.16} color={'#b450ff'} distance={30} decay={2} />

      {/* Moving spotlight to animate highlights across geometry */}
      <spotLight
        position={[0, 8, 10]}
        angle={0.6}
        penumbra={1}
        intensity={0.4}
        color={PALETTE.neonCyan}
        distance={50}
      />

      {/* Deep-space star field */}
      <Stars radius={100} depth={70} count={3500} factor={2.6} saturation={0} fade speed={0.3} />

      {/* Volumetric neon nebula clouds for depth */}
      <Clouds material={THREE.MeshBasicMaterial} limit={40}>
        <Cloud
          seed={1}
          segments={22}
          bounds={[26, 8, 26]}
          volume={9}
          color={PALETTE.neonCyan}
          opacity={0.05}
          fade={60}
          position={[0, -3, -14]}
        />
        <Cloud
          seed={2}
          segments={18}
          bounds={[22, 6, 22]}
          volume={7}
          color={'#b450ff'}
          opacity={0.035}
          fade={50}
          position={[8, 2, -18]}
        />
      </Clouds>

      {/* Floor coordinate grid */}
      <Grid
        position={[0, -5, 0]}
        args={[SCENE_CONFIG.gridSize, SCENE_CONFIG.gridSize]}
        cellSize={1}
        cellThickness={0.4}
        cellColor={PALETTE.neonCyan}
        sectionSize={5}
        sectionThickness={0.9}
        sectionColor={PALETTE.neonCyan}
        fadeDistance={34}
        fadeStrength={2.5}
        followCamera={false}
        infiniteGrid
      />

      {/* Ceiling coordinate grid — mirrored, fainter, completes the "chamber" */}
      <Grid
        position={[0, 9, 0]}
        args={[SCENE_CONFIG.gridSize, SCENE_CONFIG.gridSize]}
        cellSize={2}
        cellThickness={0.3}
        cellColor={PALETTE.industrialAmber}
        sectionSize={10}
        sectionThickness={0.6}
        sectionColor={PALETTE.industrialAmber}
        fadeDistance={30}
        fadeStrength={3}
        followCamera={false}
        infiniteGrid
      />
    </>
  )
}
