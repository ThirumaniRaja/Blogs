import { ArrowRight, BookMarked, Code2, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useProgress } from '@/context/ProgressContext'
import { questions, categories } from '@/data/questions'
import { StatCard } from '@/components/ui/StatCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

export function HomePage() {
  const { completed, bookmarked } = useProgress()

  const difficultyCounts = useMemo(
    () => ({
      Easy: questions.filter((q) => q.difficulty === 'Easy').length,
      Medium: questions.filter((q) => q.difficulty === 'Medium').length,
      Hard: questions.filter((q) => q.difficulty === 'Hard').length,
    }),
    [],
  )

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border-subtle bg-gradient-to-br from-surface to-surface-2 p-8 sm:p-12">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
          <Sparkles size={14} />
          {questions.length}+ curated interview questions
        </span>
        <h1 className="max-w-2xl text-3xl font-semibold text-gray-50 sm:text-4xl">
          Master JavaScript interviews with real, practical questions.
        </h1>
        <p className="mt-4 max-w-2xl text-gray-400">
          Browse explanations, run through code examples, track your progress, and quiz yourself —
          all in one focused practice platform for developers of every level.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/questions"
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            Browse questions <ArrowRight size={16} />
          </Link>
          <Link
            to="/quiz"
            className="flex items-center gap-2 rounded-lg border border-border-subtle px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/5"
          >
            Start a quiz <Sparkles size={16} />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Code2} label="Total questions" value={questions.length} />
        <StatCard icon={Target} label="Completed" value={completed.length} accent="text-emerald-400" />
        <StatCard icon={BookMarked} label="Bookmarked" value={bookmarked.length} accent="text-amber-400" />
        <StatCard icon={Sparkles} label="Categories" value={categories.length} accent="text-purple-400" />
      </section>

      <section className="rounded-xl border border-border-subtle bg-surface p-6">
        <h2 className="mb-4 text-sm font-medium text-gray-300">Your overall progress</h2>
        <ProgressBar value={completed.length} total={questions.length} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-100">Practice by difficulty</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
            <Link
              key={level}
              to={`/questions?difficulty=${level}`}
              className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface p-5 transition hover:border-brand-500/40 hover:bg-surface-2"
            >
              <DifficultyBadge difficulty={level} />
              <p className="text-2xl font-semibold text-gray-100">{difficultyCounts[level]} questions</p>
              <span className="flex items-center gap-1 text-sm text-brand-400">
                Practice now <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-100">Explore by category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/questions?category=${encodeURIComponent(category)}`}
              className="rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm text-gray-300 transition hover:border-brand-500/40 hover:text-brand-400"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
