// ── Brand identity ────────────────────────────────────────────────────────────

export const BRAND = {
  company: 'ASTRA MATRIX',
  product: 'VECTRA XR',
  tagline: 'We don\'t build software. We open gates.',
  sub: 'A next-generation software engineering and creative studio.',
  version: 'v2.4.1-BUILD',
  buildHash: 'XR-0xFF3A9C',
} as const

// ── Palette ───────────────────────────────────────────────────────────────────

export const PALETTE = {
  obsidian: '#121214',
  slate: '#1A1A1E',
  neonCyan: '#00F0FF',
  industrialAmber: '#FF9900',
  dimCyan: 'rgba(0, 240, 255, 0.2)',
  dimAmber: 'rgba(255, 153, 0, 0.2)',
} as const

// ── Navigation ────────────────────────────────────────────────────────────────

export const LINKS = {
  questStore: '#quest-store-pending',
  github: 'https://github.com/Astra-Matrix',
  docs: '/docs',
  enterprise: '#contact-pending',
} as const

export const NAV_ITEMS = [
  { label: 'SOFTWARE', href: '/software' },
  { label: 'VISIONS', href: '/visions' },
  { label: 'DOCS', href: '/docs' },
] as const

// ── Narrative ─────────────────────────────────────────────────────────────────

export const NARRATIVE = {
  headline: 'Not a company.\nA convergence.',

  opening:
    'There are things that get built, and then there are things that get manifested. Astra Matrix exists at the threshold — where engineering stops being a discipline and starts being a philosophy. Where the question isn\'t "can we build this?" but "should this have existed already?"',

  body:
    'We are engineers who think like artists. Architects who design like theorists. Systems thinkers who ship like they\'re running out of time — which, in this industry, we always are. We don\'t have a vertical. We have a direction: forward, and inward, and into whatever territory has been left unmapped because everyone else decided it wasn\'t worth the risk.',

  closing:
    'The entity known only as Godmode convened this collective not by posting a job listing, but by recognizing a signal — the particular frequency that serious builders emit when they\'ve outgrown every system they\'ve ever worked inside. One by one, the architects arrived.',

  manifesto: [
    'We ship what others theorize.',
    'We operate without permission or precedent.',
    'We build at the edge of the possible, then push past it.',
    'We are the space between the signal and the silence.',
  ],
} as const

// ── Services ──────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    id: 'full-stack',
    index: '01',
    tag: 'ENGINEERING',
    title: 'Full-Stack Systems',
    description: 'End-to-end architecture from bare metal to browser. We build systems that don\'t just function — they endure.',
    detail:
      'From distributed backends that hold under impossible load to frontend surfaces that feel like they were designed by something that understands human attention better than humans do. We don\'t scaffold. We architect. Every layer is intentional, every dependency is earned.',
    keywords: ['Next.js', 'Node', 'Rust', 'PostgreSQL', 'Redis', 'Docker', 'K8s'],
    accent: 'cyan',
  },
  {
    id: 'spatial-xr',
    index: '02',
    tag: 'SPATIAL COMPUTING',
    title: 'Spatial & XR Engineering',
    description: 'Native applications for headsets, mixed-reality overlays, and spatial interfaces that occupy physical space.',
    detail:
      'We build directly on Horizon OS with the Meta Spatial SDK — bypassing game engines entirely to achieve the frame-perfect responsiveness that platform-native code demands. Our spatial work is not a curiosity or a demo; it is production-grade, enterprise-deployed, and used by humans doing real work in the field.',
    keywords: ['Meta Spatial SDK', 'WebXR', 'React Three Fiber', 'Three.js', 'Kotlin', 'Compose XR'],
    accent: 'amber',
  },
  {
    id: 'creative-systems',
    index: '03',
    tag: 'CREATIVE SYSTEMS',
    title: 'Creative Engineering',
    description: 'Interactive experiences, generative systems, and digital artifacts that exist at the intersection of art and code.',
    detail:
      'Not decoration. Not marketing. Genuine creative engineering — systems that generate, evolve, and surprise. We\'ve built generative visual identities, interactive data sculptures, procedural audio-visual environments, and interfaces that have no precedent in any UI library. We don\'t follow design trends. We leave fossils for them.',
    keywords: ['WebGL', 'GLSL', 'Framer Motion', 'p5.js', 'Tone.js', 'Canvas API', 'WASM'],
    accent: 'cyan',
  },
  {
    id: 'infrastructure',
    index: '04',
    tag: 'INFRASTRUCTURE',
    title: 'Infrastructure & DevOps',
    description: 'Production infrastructure designed as if uptime is a moral obligation — because for the systems we run, it is.',
    detail:
      'Zero-downtime deployment pipelines. Observability stacks that surface the right signal before it becomes a problem. Containerized, horizontally scalable architectures that cost less than they should. We don\'t run infrastructure that we\'d be ashamed to explain. Every system is documented, monitored, and owned.',
    keywords: ['Docker', 'Kubernetes', 'Terraform', 'Datadog', 'GitHub Actions', 'Vercel', 'AWS'],
    accent: 'amber',
  },
] as const

// ── Team ──────────────────────────────────────────────────────────────────────

export const TEAM = [
  {
    handle: 'Godmode',
    role: 'Lead Architect',
    descriptor: 'Origin: undocumented. Output: everything. Knows what needs to exist before it\'s been imagined.',
    status: 'ACTIVE',
    accent: 'amber',
    isLead: true,
  },
  {
    handle: 'null.void',
    role: 'Systems Design',
    descriptor: 'Sees the shape of absence. Designs around what a system should never do.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
  {
    handle: '0x.Wraith',
    role: 'Spatial & Frontend',
    descriptor: 'Makes the invisible visible. Builds interfaces that occupy space before you\'ve realized you\'re inside them.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
  {
    handle: 'hex.daemon',
    role: 'Backend Infrastructure',
    descriptor: 'Runs systems on timelines that haven\'t happened yet. Failure is not in the vocabulary.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
  {
    handle: 'mirror.root',
    role: 'Creative Direction',
    descriptor: 'Reflects what hasn\'t been designed. Finds the form before the function is agreed upon.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
  {
    handle: 'spectral.key',
    role: 'Security & Cryptography',
    descriptor: 'Protects the work in dimensions you didn\'t account for. Locks doors in rooms that don\'t appear on the blueprint.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
  {
    handle: 'w1ld.arc',
    role: 'Mobile & XR',
    descriptor: 'Builds interfaces for realities without names. Platform-native, frame-perfect, and intentional.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
  {
    handle: 'ash.protocol',
    role: 'Data Architecture',
    descriptor: 'Finds the pattern in the static. Turns noise into models and models into decisions.',
    status: 'ACTIVE',
    accent: 'cyan',
    isLead: false,
  },
] as const

// ── Telemetry labels (3D canvas decoration) ───────────────────────────────────

export const TELEMETRY_LABELS = [
  'SIGNAL_LOCK',
  'CONVERGENCE',
  'LAYER_DEPTH',
  'ANCHOR_STATE',
  'THRESHOLD_API',
  'VOID_CHANNEL',
  'MATRIX_SYNC',
  'OUTPUT_FLUX',
] as const

// ── Scene config ──────────────────────────────────────────────────────────────

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

// ── Studio metrics ────────────────────────────────────────────────────────────

export const STUDIO_METRICS = [
  { label: 'SYSTEMS DEPLOYED', value: '200+', unit: 'PRODUCTION' },
  { label: 'UPTIME AVERAGE', value: '99.97', unit: '%' },
  { label: 'ENGINEERS', value: '8', unit: 'ARCHITECTS' },
  { label: 'YEARS OPERATING', value: '6+', unit: 'IN THE FIELD' },
] as const

// ── Flagship product: Vectra XR ────────────────────────────────────────────────

export const VECTRA_PRODUCT = {
  name: 'VECTRA XR',
  codename: 'PROJECT THRESHOLD',
  status: 'AVAILABLE NOW',
  platform: 'META QUEST 3 · HORIZON OS',
  version: 'v2.4.1',
  tagline: 'The Native Spatial Supply Chain & Hardware Diagnostics Visor.',
  summary:
    'Vectra XR is our debut commercial release — a fully native spatial computing application engineered directly on the Meta Spatial SDK. It transforms the physical-to-digital workflow into a single immersive layer: scan hardware with passthrough cameras, pin live telemetry dashboards into 3D space, and synchronize everything to an immutable decentralized ledger. No game engine. No compromise. Production-grade.',
  highlights: [
    {
      title: 'Spatial Anchoring',
      detail: 'Pin telemetry dashboards directly to physical hardware with sub-centimeter persistence across sessions.',
    },
    {
      title: 'ML Vision Pipeline',
      detail: 'On-device QR and barcode decoding through passthrough cameras in under 80ms — zero network dependency.',
    },
    {
      title: 'Live Diagnostics',
      detail: 'Real-time voltage, temperature, and maintenance state streamed over BLE from embedded telemetry modules.',
    },
    {
      title: 'Metastrate Ledger',
      detail: 'Every scan and state change written as a signed, tamper-evident transaction to the decentralized substrate.',
    },
  ],
  specs: [
    { label: 'PLATFORM', value: 'Meta Quest 3' },
    { label: 'RUNTIME', value: 'Horizon OS · API 63' },
    { label: 'ENGINE', value: 'Meta Spatial SDK 0.5' },
    { label: 'LATENCY', value: '< 2ms telemetry' },
    { label: 'SIZE', value: '184 MB' },
    { label: 'PRICE', value: 'Enterprise license' },
  ],
  links: {
    questStore: '#quest-store-pending',
    docs: '/docs',
    sideload: '#sideload-pending',
  },
} as const

// ── GitHub showcase (Visions page) ─────────────────────────────────────────────

export const GITHUB_PROJECTS = [
  {
    name: 'VYB',
    description:
      'The next-generation game creation environment for designers, developers, artists, worldbuilders, and AI-assisted creators.',
    language: 'TypeScript',
    url: 'https://github.com/Astra-Matrix/VYB',
    tag: 'CREATIVE ENGINE',
    accent: 'cyan',
  },
  {
    name: 'DEMIURGE-PROTOCOL',
    description:
      'A Gnostic-inspired L1 gamified blockchain ecosystem with a next-generation Creator God Token (CGT) wallet — mining made fun.',
    language: 'TypeScript',
    url: 'https://github.com/Astra-Matrix/DEMIURGE-PROTOCOL',
    tag: 'BLOCKCHAIN',
    accent: 'amber',
  },
  {
    name: 'DS-AgentFoundry',
    description: 'Digital Sovereign Society — a decentralized agent economy framework.',
    language: 'HTML',
    url: 'https://github.com/Astra-Matrix/DS-AgentFoundry',
    tag: 'AGENT ECONOMY',
    accent: 'cyan',
  },
  {
    name: 'arqyv',
    description: 'The ultimate data tool — high-throughput ingestion, transformation, and archival.',
    language: 'Python',
    url: 'https://github.com/Astra-Matrix/arqyv',
    tag: 'DATA SYSTEMS',
    accent: 'cyan',
  },
  {
    name: 'spark',
    description: 'A cyberpunk dating app built with Next.js 15 — connection at the edge of the grid.',
    language: 'TypeScript',
    url: 'https://github.com/Astra-Matrix/spark',
    tag: 'CONSUMER APP',
    accent: 'amber',
  },
  {
    name: 'SuperHDE',
    description:
      'Mologie Detours — a cross-platform x86 / x86-64 hacker disassembly engine. MIT licensed.',
    language: 'C++',
    url: 'https://github.com/Astra-Matrix/SuperHDE',
    tag: 'LOW-LEVEL',
    accent: 'cyan',
  },
  {
    name: 'killnode',
    description: 'A precision tooling experiment for runtime process control and orchestration.',
    language: 'TypeScript',
    url: 'https://github.com/Astra-Matrix/killnode',
    tag: 'INFRASTRUCTURE',
    accent: 'cyan',
  },
  {
    name: 'astra-matrix-web',
    description:
      'This portal. A WebXR-immersive corporate site built with Next.js, React Three Fiber, and @react-three/xr.',
    language: 'TypeScript',
    url: 'https://github.com/Astra-Matrix/astra-matrix-web',
    tag: 'WEBXR',
    accent: 'amber',
  },
] as const

// ── Footer: virtual company formation, policies, links ─────────────────────────

export const FOOTER = {
  formation: [
    { label: 'Entity', value: 'Astra Matrix, Inc.' },
    { label: 'Jurisdiction', value: 'Delaware C-Corp' },
    { label: 'Founded', value: '2020 — Distributed' },
    { label: 'Registry', value: 'EIN ██-███████' },
  ],
  columns: [
    {
      heading: 'STUDIO',
      links: [
        { label: 'Software', href: '/software' },
        { label: 'Visions', href: '/visions' },
        { label: 'Developer Docs', href: '/docs' },
        { label: 'The Architects', href: '/features' },
      ],
    },
    {
      heading: 'LEGAL',
      links: [
        { label: 'Terms of Service', href: '#terms-pending' },
        { label: 'Privacy Policy', href: '#privacy-pending' },
        { label: 'Acceptable Use', href: '#aup-pending' },
        { label: 'Data Processing', href: '#dpa-pending' },
      ],
    },
    {
      heading: 'GOVERNANCE',
      links: [
        { label: 'Security Disclosure', href: '#security-pending' },
        { label: 'Open Source Licenses', href: '#licenses-pending' },
        { label: 'Code of Conduct', href: '#coc-pending' },
        { label: 'Accessibility', href: '#a11y-pending' },
      ],
    },
    {
      heading: 'CONNECT',
      links: [
        { label: 'GitHub', href: 'https://github.com/Astra-Matrix' },
        { label: 'Developer Program', href: '/visions' },
        { label: 'Open a Channel', href: 'mailto:contact@astramatrix.io' },
        { label: 'Status', href: '#status-pending' },
      ],
    },
  ],
} as const

export const DEV_PROGRAM_DOC = '/astra-matrix-developer-program.md'
