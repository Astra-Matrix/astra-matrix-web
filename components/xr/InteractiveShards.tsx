'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RayGrab } from '@react-three/xr'
import * as THREE from 'three'
import { PALETTE } from '@/lib/constants'

type ShardConfig = {
  position: [number, number, number]
  scale: number
  geometry: 'ico' | 'oct' | 'box' | 'tetra'
  color: string
  bobSpeed: number
  bobAmp: number
  spinSpeed: number
}

const COLORS = [PALETTE.neonCyan, PALETTE.industrialAmber, '#b450ff', '#00ff9d']

function makeShards(count: number): ShardConfig[] {
  const geos: ShardConfig['geometry'][] = ['ico', 'oct', 'box', 'tetra']
  const out: ShardConfig[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 5.5 + (i % 3) * 2.4
    out.push({
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * radius - 2,
      ],
      scale: 0.45 + Math.random() * 0.5,
      geometry: geos[i % geos.length],
      color: COLORS[i % COLORS.length],
      bobSpeed: 0.4 + Math.random() * 0.6,
      bobAmp: 0.3 + Math.random() * 0.5,
      spinSpeed: 0.2 + Math.random() * 0.5,
    })
  }
  return out
}

function ShardGeometry({ type }: { type: ShardConfig['geometry'] }) {
  switch (type) {
    case 'oct':
      return <octahedronGeometry args={[1, 0]} />
    case 'box':
      return <boxGeometry args={[1.3, 1.3, 1.3]} />
    case 'tetra':
      return <tetrahedronGeometry args={[1.2, 0]} />
    case 'ico':
    default:
      return <icosahedronGeometry args={[1, 0]} />
  }
}

function Shard({ config }: { config: ShardConfig }) {
  const group = useRef<THREE.Group>(null)
  const solid = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)

  // Hover/active stored in refs to avoid React re-renders
  const hovered = useRef(false)
  const targetScale = useRef(config.scale)
  const baseY = config.position[1]

  const colorObj = useMemo(() => new THREE.Color(config.color), [config.color])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const g = group.current
    if (!g) return

    // Bob + spin
    g.position.y = baseY + Math.sin(t * config.bobSpeed) * config.bobAmp
    g.rotation.x = t * config.spinSpeed * 0.5
    g.rotation.y = t * config.spinSpeed

    // Smoothly lerp scale toward target (hover grows it)
    const desired = hovered.current ? config.scale * 1.45 : config.scale
    targetScale.current = THREE.MathUtils.lerp(targetScale.current, desired, 0.12)
    g.scale.setScalar(targetScale.current)

    // Emissive intensity responds to hover
    if (mat.current) {
      const target = hovered.current ? 2.4 : 0.8
      mat.current.emissiveIntensity = THREE.MathUtils.lerp(
        mat.current.emissiveIntensity,
        target,
        0.12,
      )
    }
  })

  return (
    <RayGrab>
      <group
        ref={group}
        position={config.position}
        onPointerOver={(e) => {
          e.stopPropagation()
          hovered.current = true
          document.body.style.cursor = 'grab'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          hovered.current = false
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Glassy emissive solid */}
        <mesh ref={solid}>
          <ShardGeometry type={config.geometry} />
          <meshStandardMaterial
            ref={mat}
            color={'#1a1a1e'}
            emissive={colorObj}
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.15}
            transparent
            opacity={0.55}
            toneMapped={false}
          />
        </mesh>

        {/* Neon wireframe shell */}
        <mesh scale={1.02}>
          <ShardGeometry type={config.geometry} />
          <meshBasicMaterial color={config.color} wireframe transparent opacity={0.85} toneMapped={false} />
        </mesh>
      </group>
    </RayGrab>
  )
}

export default function InteractiveShards({ count = 14 }: { count?: number }) {
  const shards = useMemo(() => makeShards(count), [count])
  return (
    <group>
      {shards.map((config, i) => (
        <Shard key={i} config={config} />
      ))}
    </group>
  )
}
