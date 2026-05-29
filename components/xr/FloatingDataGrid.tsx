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
  const coreRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)

  const { nodeCount } = SCENE_CONFIG

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

  // Floating particle dust field
  const particles = useMemo(() => {
    const COUNT = 1400
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 6 + Math.random() * 22
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return positions
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorCyan = useMemo(() => new THREE.Color(PALETTE.neonCyan), [])
  const colorAmber = useMemo(() => new THREE.Color(PALETTE.industrialAmber), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    const mesh = meshRef.current
    if (mesh) {
      for (let i = 0; i < nodeCount; i++) {
        const node = orbitals[i]
        const theta = node.theta + t * node.speed
        const phi = node.phi + t * node.speed * 0.28
        dummy.position.set(
          node.radius * Math.sin(phi) * Math.cos(theta),
          node.radius * Math.cos(phi) * 0.45,
          node.radius * Math.sin(phi) * Math.sin(theta),
        )
        const pulse = 0.5 + 0.5 * Math.sin(t * SCENE_CONFIG.pulseFrequency + node.phaseOffset)
        dummy.scale.setScalar(node.scale * (0.75 + 0.5 * pulse))
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.setColorAt(i, i % 5 === 0 ? colorAmber : colorCyan)
      }
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.035
      outerRingRef.current.rotation.x = t * 0.018
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = t * 0.055
      innerRingRef.current.rotation.x = -t * 0.022
    }

    // Central megastructure — slow multi-axis rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.08
      coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.2
    }

    // Drift the particle field
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.012
    }
  })

  return (
    <group>
      {/* Central wireframe megastructure */}
      <group ref={coreRef}>
        <mesh>
          <dodecahedronGeometry args={[2.6, 0]} />
          <meshBasicMaterial color={PALETTE.neonCyan} wireframe transparent opacity={0.18} toneMapped={false} />
        </mesh>
        <mesh rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[1.7, 0]} />
          <meshBasicMaterial color={PALETTE.industrialAmber} wireframe transparent opacity={0.22} toneMapped={false} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.35} toneMapped={false} />
        </mesh>
      </group>

      {/* Instanced orbital data nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]} frustumCulled={false}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial vertexColors transparent opacity={0.65} toneMapped={false} />
      </instancedMesh>

      {/* Outer cyan ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[13, 0.014, 8, 128]} />
        <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.1} toneMapped={false} />
      </mesh>

      {/* Inner amber ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 5, Math.PI / 3, 0]}>
        <torusGeometry args={[7.5, 0.01, 8, 80]} />
        <meshBasicMaterial color={PALETTE.industrialAmber} transparent opacity={0.07} toneMapped={false} />
      </mesh>

      {/* Drifting particle dust field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={PALETTE.neonCyan}
          transparent
          opacity={0.4}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
    </group>
  )
}
