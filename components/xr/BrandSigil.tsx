'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/constants'

/* ──────────────────────────────────────────────────────────────────────────────
   Sigil — an intricate rotating brand emblem composed of nested wireframe
   geometry, orbiting rune nodes, and concentric rings. All animation is driven
   by a single useFrame loop mutating refs — no React re-renders.
   ────────────────────────────────────────────────────────────────────────────── */

function Sigil() {
  const root = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const ringC = useRef<THREE.Mesh>(null)
  const runesRef = useRef<THREE.InstancedMesh>(null)

  const RUNE_COUNT = 12

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cyan = useMemo(() => new THREE.Color(PALETTE.neonCyan), [])
  const amber = useMemo(() => new THREE.Color(PALETTE.industrialAmber), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Whole emblem slowly spins on Y, with a gentle nod on X
    if (root.current) {
      root.current.rotation.y = t * 0.35
      root.current.rotation.x = Math.sin(t * 0.3) * 0.18
    }

    // Core icosahedron counter-rotates and pulses
    if (coreRef.current) {
      coreRef.current.rotation.x = -t * 0.6
      coreRef.current.rotation.z = t * 0.4
      const s = 0.62 + Math.sin(t * 1.4) * 0.04
      coreRef.current.scale.setScalar(s)
    }

    // Concentric rings on independent axes
    if (ringA.current) ringA.current.rotation.z = t * 0.9
    if (ringB.current) {
      ringB.current.rotation.x = t * 0.7
      ringB.current.rotation.y = t * 0.5
    }
    if (ringC.current) ringC.current.rotation.y = -t * 1.1

    // Orbiting rune nodes
    const runes = runesRef.current
    if (runes) {
      for (let i = 0; i < RUNE_COUNT; i++) {
        const angle = (i / RUNE_COUNT) * Math.PI * 2 + t * 0.5
        const r = 1.55
        dummy.position.set(Math.cos(angle) * r, Math.sin(angle * 2) * 0.25, Math.sin(angle) * r)
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i)
        dummy.scale.setScalar(0.06 + pulse * 0.05)
        dummy.rotation.set(t + i, t * 0.5, 0)
        dummy.updateMatrix()
        runes.setMatrixAt(i, dummy.matrix)
        runes.setColorAt(i, i % 3 === 0 ? amber : cyan)
      }
      runes.instanceMatrix.needsUpdate = true
      if (runes.instanceColor) runes.instanceColor.needsUpdate = true
    }
  })

  return (
    <group ref={root}>
      {/* Core wireframe icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={PALETTE.neonCyan} wireframe transparent opacity={0.9} toneMapped={false} />
      </mesh>

      {/* Solid inner glow core */}
      <mesh scale={0.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.25} toneMapped={false} />
      </mesh>

      {/* Ring A — cyan, flat */}
      <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.02, 8, 96]} />
        <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.85} toneMapped={false} />
      </mesh>

      {/* Ring B — amber, tilted */}
      <mesh ref={ringB} rotation={[Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[1.45, 0.015, 8, 96]} />
        <meshBasicMaterial color={PALETTE.industrialAmber} transparent opacity={0.7} toneMapped={false} />
      </mesh>

      {/* Ring C — cyan, larger */}
      <mesh ref={ringC} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.7, 0.01, 8, 96]} />
        <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Orbiting rune nodes */}
      <instancedMesh ref={runesRef} args={[undefined, undefined, RUNE_COUNT]} frustumCulled={false}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial vertexColors transparent opacity={0.95} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

export default function BrandSigil() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: 0 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <Sigil />
    </Canvas>
  )
}
