import { Search } from 'lucide-react'
import type { Difficulty } from '@/types'

const difficulties: Array<Difficulty | 'All'> = ['All', 'Easy', 'Medium', 'Hard']

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  difficulty: Difficulty | 'All'
  onDifficultyChange: (value: Difficulty | 'All') => void
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
}

export function FilterBar({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  category,
  onCategoryChange,
  categories,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-surface p-4">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search questions, tags, or categories..."
          className="w-full rounded-lg border border-border-subtle bg-black/20 py-2.5 pr-4 pl-10 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-brand-500"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border-subtle bg-black/20 p-1">
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDifficultyChange(d)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                difficulty === d ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-lg border border-border-subtle bg-black/20 px-3 py-2 text-sm text-gray-200 outline-none focus:border-brand-500 sm:w-auto"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
