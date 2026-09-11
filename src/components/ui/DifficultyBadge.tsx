import type { Difficulty } from '@/types'

const styles: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Hard: 'bg-red-500/10 text-red-400 border-red-500/30',
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  )
}
