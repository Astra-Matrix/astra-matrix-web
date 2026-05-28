import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Astra Matrix | Vectra XR — Spatial Computing Platform',
  description:
    'The Native Spatial Supply Chain & Hardware Diagnostics Visor for Horizon OS. Built for Meta Quest 3 by Astra Matrix.',
  keywords: [
    'spatial computing',
    'Meta Quest 3',
    'WebXR',
    'supply chain',
    'Vectra XR',
    'Astra Matrix',
    'Horizon OS',
    'hardware diagnostics',
  ],
  openGraph: {
    title: 'Astra Matrix | Vectra XR',
    description:
      'The Native Spatial Supply Chain & Hardware Diagnostics Visor for Horizon OS.',
    type: 'website',
    siteName: 'Astra Matrix',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#121214',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className="h-full overflow-hidden bg-obsidian scanlines">{children}</body>
    </html>
  )
}
