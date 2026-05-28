'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SCENE_CONFIG, PALETTE } from '@/lib/constants'

type OrbitalNode = {
  radius: number
  theta: number
  phi: number
  speed: number
  phaseOffset: number
  scale: number
}

export default function FloatingDataGrid() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)

  const { nodeCount } = SCENE_CONFIG

  // Pre-computed orbital parameters — stable across re-renders
  const orbitals = useMemo<OrbitalNode[]>(() => {
    return Array.from({ length: nodeCount }, () => ({
      radius: 4 + Math.random() * 13,
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI,
      speed: (0.04 + Math.random() * 0.14) * (Math.random() > 0.5 ? 1 : -1),
      phaseOffset: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.075,
    }))
  }, [nodeCount])

  // Reusable transform — avoids GC pressure inside useFrame
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorCyan = useMemo(() => new THREE.Color(PALETTE.neonCyan), [])
  const colorAmber = useMemo(() => new THREE.Color(PALETTE.industrialAmber), [])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = clock.getElapsedTime()

    for (let i = 0; i < nodeCount; i++) {
      const node = orbitals[i]
      const theta = node.theta + t * node.speed
      const phi = node.phi + t * node.speed * 0.28

      dummy.position.set(
        node.radius * Math.sin(phi) * Math.cos(theta),
        node.radius * Math.cos(phi) * 0.45,
        node.radius * Math.sin(phi) * Math.sin(theta),
      )

      // Pulse scale with a unique phase per node
      const pulse = 0.5 + 0.5 * Math.sin(t * SCENE_CONFIG.pulseFrequency + node.phaseOffset)
      dummy.scale.setScalar(node.scale * (0.75 + 0.5 * pulse))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // Every 5th node is amber; rest are cyan
      mesh.setColorAt(i, i % 5 === 0 ? colorAmber : colorCyan)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // Rotate decorative rings at different speeds and axes
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.035
      outerRingRef.current.rotation.x = t * 0.018
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = t * 0.055
      innerRingRef.current.rotation.x = -t * 0.022
    }
  })

  return (
    <group>
      {/* Instanced octahedral data nodes */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, nodeCount]}
        frustumCulled={false}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0.65}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Outer decorative orbital ring — neon cyan, very faint */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[13, 0.014, 8, 128]} />
        <meshBasicMaterial
          color={PALETTE.neonCyan}
          transparent
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Inner tilted ring — industrial amber, even fainter */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 5, Math.PI / 3, 0]}>
        <torusGeometry args={[7.5, 0.01, 8, 80]} />
        <meshBasicMaterial
          color={PALETTE.industrialAmber}
          transparent
          opacity={0.07}
          toneMapped={false}
        />
      </mesh>

      {/* Central axis marker — tiny fixed sphere at origin */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  )
}
