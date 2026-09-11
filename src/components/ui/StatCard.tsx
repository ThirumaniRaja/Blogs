import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  accent?: string
}

export function StatCard({ icon: Icon, label, value, accent = 'text-brand-400' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-surface p-5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5 ${accent}`}>
        <Icon size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-semibold text-gray-100">{value}</p>
        <p className="truncate text-sm text-gray-400">{label}</p>
      </div>
    </div>
  )
}
