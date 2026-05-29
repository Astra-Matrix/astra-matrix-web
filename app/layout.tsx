import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Astra Matrix — We don\'t build software. We open gates.',
  description:
    'Astra Matrix is a next-generation software engineering and creative studio. Full-stack systems, spatial computing, creative engineering, and infrastructure — assembled, not hired.',
  keywords: [
    'software engineering',
    'creative studio',
    'spatial computing',
    'WebXR',
    'Meta Quest',
    'full-stack',
    'Astra Matrix',
    'Godmode',
    'Vectra XR',
  ],
  openGraph: {
    title: 'Astra Matrix — We don\'t build software. We open gates.',
    description:
      'A next-generation software engineering and creative studio. Not a company. A convergence.',
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
