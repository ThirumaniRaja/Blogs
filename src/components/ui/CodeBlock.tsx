import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-black/40">
      <div className="flex items-center justify-between border-b border-border-subtle bg-white/5 px-3 py-1.5">
        <span className="font-mono text-xs text-gray-400">{label ?? 'JavaScript'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 transition hover:bg-white/10 hover:text-gray-200"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-gray-200">{code}</code>
      </pre>
    </div>
  )
}
