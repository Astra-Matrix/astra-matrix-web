'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ArrowUpRight, Star } from 'lucide-react'
import { GITHUB_PROJECTS } from '@/lib/constants'

function ProjectCard({ project, index }: { project: (typeof GITHUB_PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const isAmber = project.accent === 'amber'

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative glass glass-edge p-6 flex flex-col cursor-pointer overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="font-mono text-[8px] tracking-[0.26em] uppercase px-2 py-1 border"
          style={{
            borderColor: isAmber ? 'rgba(255,153,0,0.25)' : 'rgba(0,240,255,0.2)',
            color: isAmber ? 'rgba(255,153,0,0.7)' : 'rgba(0,240,255,0.7)',
          }}
        >
          {project.tag}
        </span>
        <Github size={15} className="text-neonCyan/40 group-hover:text-neonCyan transition-colors" strokeWidth={1.5} />
      </div>

      {/* Name */}
      <h3
        className={`font-mono font-black text-xl tracking-tight mb-3 ${isAmber ? 'neon-wordart-amber' : 'neon-wordart'}`}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p className="font-mono text-[11px] glass-text-dim leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neonCyan/8">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ background: isAmber ? '#FF9900' : '#00F0FF' }}
          />
          <span className="font-mono text-[9px] tracking-[0.15em] glass-text-dim uppercase">
            {project.language}
          </span>
        </div>
        <ArrowUpRight
          size={14}
          className="text-neonCyan/40 group-hover:text-neonCyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          strokeWidth={1.5}
        />
      </div>

      {/* Hover glow */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isAmber
            ? 'radial-gradient(circle at 50% 0%, rgba(255,153,0,0.07), transparent 60%)'
            : 'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.07), transparent 60%)',
        }}
      />
    </motion.a>
  )
}

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {GITHUB_PROJECTS.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </div>
  )
}
