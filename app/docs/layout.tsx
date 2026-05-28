import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Docs | Vectra XR — Astra Matrix',
  description:
    'Technical documentation for the Vectra XR spatial SDK. Architecture guides, Kotlin code samples, and CameraX / ML Kit integration tutorials.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    // Docs page takes full viewport and manages its own scroll internally.
    // The body has overflow:hidden globally; the scroll happens inside the content column.
    <div className="fixed inset-0 flex bg-obsidian">
      {children}
    </div>
  )
}
