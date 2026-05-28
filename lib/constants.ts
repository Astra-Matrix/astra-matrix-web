export const BRAND = {
  company: 'ASTRA MATRIX',
  product: 'VECTRA XR',
  tagline: 'The Native Spatial Supply Chain & Hardware Diagnostics Visor for Horizon OS.',
  version: 'v2.4.1-BUILD',
  buildHash: 'XR-0xFF3A9C',
} as const

export const PALETTE = {
  obsidian: '#121214',
  slate: '#1A1A1E',
  neonCyan: '#00F0FF',
  industrialAmber: '#FF9900',
  dimCyan: 'rgba(0, 240, 255, 0.2)',
  dimAmber: 'rgba(255, 153, 0, 0.2)',
} as const

export const LINKS = {
  questStore: '#quest-store-pending',
  github: 'https://github.com/Alaustrup',
  docs: '#docs-pending',
  privacy: '#privacy-pending',
  enterprise: '#enterprise-pending',
} as const

export const TELEMETRY_LABELS = [
  'SPATIAL_ANCHORS',
  'PASS-THROUGH_API',
  'MESH_COLLISION',
  'EYE_TRACKING',
  'HAND_TRACKING',
  'SCENE_UNDERSTAND',
  'GUARDIAN_SYS',
  'COMPOSITOR_LAY',
] as const

export const NAV_ITEMS = [
  { label: 'PRODUCT', href: '#product' },
  { label: 'FEATURES', href: '#features' },
  { label: 'ENTERPRISE', href: LINKS.enterprise },
  { label: 'DOCS', href: LINKS.docs },
] as const

export const FEATURE_NODES = [
  {
    label: 'REAL-TIME ASSET TRACKING',
    value: '< 2ms LATENCY',
    metric: 'lucide:Activity',
  },
  {
    label: 'HORIZON OS NATIVE',
    value: 'API LEVEL 63',
    metric: 'lucide:Shield',
  },
  {
    label: 'SPATIAL COMPUTE UNITS',
    value: '4x XR2 GEN 3',
    metric: 'lucide:Zap',
  },
] as const

export const SCENE_CONFIG = {
  fogColor: '#121214',
  fogNear: 10,
  fogFar: 50,
  nodeCount: 80,
  gridSize: 20,
  orbitSpeed: 0.0003,
  pulseFrequency: 0.8,
  cameraFov: 70,
  cameraPosition: [0, 0, 12] as [number, number, number],
} as const
