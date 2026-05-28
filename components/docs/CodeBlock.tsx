'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import type { CodeSnippet } from '@/lib/docsContent'

const LANGUAGE_LABELS: Record<CodeSnippet['language'], string> = {
  kotlin:     'KOTLIN',
  typescript: 'TYPESCRIPT',
  bash:       'BASH',
  json:       'JSON',
  yaml:       'XML / YAML',
}

const KEYWORD_COLORS: Record<CodeSnippet['language'], { keywords: string[]; color: string }[]> = {
  kotlin: [
    {
      keywords: ['fun', 'val', 'var', 'class', 'data', 'object', 'interface', 'sealed',
                 'override', 'suspend', 'private', 'internal', 'companion', 'when',
                 'if', 'else', 'for', 'while', 'return', 'null', 'true', 'false',
                 'this', 'super', 'init', 'by', 'lazy', 'in', 'is', 'as', 'import',
                 'package', 'enum', 'abstract', 'open', 'final', 'lateinit'],
      color: '#00F0FF',
    },
    { keywords: ['String', 'Int', 'Long', 'Float', 'Boolean', 'Unit', 'Any', 'List',
                 'Map', 'Set', 'MutableList', 'StateFlow', 'SharedFlow', 'Flow', 'UUID',
                 'ByteArray', 'Context', 'LifecycleOwner'],
      color: '#FF9900' },
  ],
  typescript: [
    {
      keywords: ['const', 'let', 'var', 'function', 'return', 'export', 'default',
                 'import', 'from', 'type', 'interface', 'class', 'extends', 'implements',
                 'async', 'await', 'if', 'else', 'for', 'while', 'null', 'undefined',
                 'true', 'false', 'new', 'this', 'typeof', 'keyof', 'readonly'],
      color: '#00F0FF',
    },
    { keywords: ['string', 'number', 'boolean', 'void', 'never', 'unknown', 'any',
                 'React', 'ReactNode', 'FC', 'Ref', 'useState', 'useRef', 'useEffect',
                 'useCallback', 'useMemo'],
      color: '#FF9900' },
  ],
  bash: [
    { keywords: ['git', 'npm', 'npx', 'cd', 'ls', 'mkdir', 'echo', 'export', 'source',
                 'chmod', 'curl', 'wget', 'sudo', 'apt', 'adb', 'java', './gradlew'],
      color: '#00F0FF' },
  ],
  json: [
    { keywords: ['true', 'false', 'null'], color: '#FF9900' },
  ],
  yaml: [
    { keywords: ['xmlns', 'android', 'uses-permission', 'uses-feature', 'application',
                 'activity', 'intent-filter', 'action', 'category', 'manifest',
                 'android:name', 'android:required', 'android:exported'],
      color: '#00F0FF' },
  ],
}

function tokenize(code: string, language: CodeSnippet['language']): string {
  const rules = KEYWORD_COLORS[language] ?? []

  // Escape HTML first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Highlight strings
  escaped = escaped.replace(
    /(&quot;|&#039;|`)(.*?)(\1)/g,
    '<span style="color:rgba(0,240,255,0.55)">$1$2$3</span>',
  )

  // Highlight comments
  escaped = escaped.replace(
    /(\/\/.*$)/gm,
    '<span style="color:rgba(0,240,255,0.25);font-style:italic">$1</span>',
  )
  escaped = escaped.replace(
    /(#.*$)/gm,
    '<span style="color:rgba(0,240,255,0.25);font-style:italic">$1</span>',
  )

  // Highlight keywords
  for (const { keywords, color } of rules) {
    for (const kw of keywords) {
      const re = new RegExp(`\\b(${kw.replace('.', '\\.')})\\b`, 'g')
      escaped = escaped.replace(re, `<span style="color:${color};font-weight:600">$1</span>`)
    }
  }

  return escaped
}

export default function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may be restricted in XR browser
    }
  }, [snippet.code])

  const highlighted = tokenize(snippet.code, snippet.language)
  const lines = highlighted.split('\n')

  return (
    <div className="border border-neonCyan/12 overflow-hidden my-6">
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-neonCyan/10"
        style={{ background: '#0D0D0F' }}
      >
        <div className="flex items-center gap-2.5">
          <Terminal size={11} className="text-neonCyan/40" strokeWidth={1.5} />
          <span className="font-mono text-[9px] tracking-[0.25em] text-neonCyan/40 uppercase">
            {snippet.filename}
          </span>
          <span className="h-px w-4 bg-neonCyan/10" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-industrialAmber/40 uppercase">
            {LANGUAGE_LABELS[snippet.language]}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 border transition-all duration-200"
          style={{
            borderColor: copied ? 'rgba(0,240,255,0.5)' : 'rgba(0,240,255,0.15)',
            background: copied ? 'rgba(0,240,255,0.08)' : 'transparent',
            boxShadow: copied ? '0 0 10px rgba(0,240,255,0.2)' : 'none',
          }}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check size={10} style={{ color: '#00F0FF' }} strokeWidth={2} />
          ) : (
            <Copy size={10} style={{ color: 'rgba(0,240,255,0.4)' }} strokeWidth={1.5} />
          )}
          <span
            className="font-mono text-[8px] tracking-[0.2em] uppercase transition-colors duration-200"
            style={{ color: copied ? '#00F0FF' : 'rgba(0,240,255,0.35)' }}
          >
            {copied ? 'COPIED' : 'COPY'}
          </span>
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto" style={{ background: '#0A0A0C' }}>
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="group">
                {/* Line number gutter */}
                <td
                  className="select-none text-right pr-4 pl-3 py-0 font-mono text-[10px] leading-6 align-top border-r border-neonCyan/5 w-10"
                  style={{ color: 'rgba(0,240,255,0.15)' }}
                >
                  {i + 1}
                </td>
                {/* Code line */}
                <td className="pl-4 pr-6 py-0 font-mono text-[11px] leading-6 align-top whitespace-pre">
                  <span
                    style={{ color: 'rgba(0,240,255,0.75)' }}
                    dangerouslySetInnerHTML={{ __html: line || ' ' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
