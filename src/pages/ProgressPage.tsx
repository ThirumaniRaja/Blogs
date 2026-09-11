import { BookMarked, CheckCircle2, RotateCcw, Target, Trophy } from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'
import { categories, questions } from '@/data/questions'
import { StatCard } from '@/components/ui/StatCard'
import { ProgressBar } from '@/components/ui/ProgressBar'

export function ProgressPage() {
  const { completed, bookmarked, quizHistory, resetProgress } = useProgress()

  const handleReset = () => {
    if (window.confirm('Reset all progress, bookmarks, and quiz history? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Your Progress</h1>
          <p className="mt-1 text-sm text-gray-400">Track how far you&apos;ve come in your prep.</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5"
        >
          <RotateCcw size={16} /> Reset progress
        </button>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} accent="text-emerald-400" />
        <StatCard icon={BookMarked} label="Bookmarked" value={bookmarked.length} accent="text-amber-400" />
        <StatCard icon={Trophy} label="Quizzes taken" value={quizHistory.length} accent="text-purple-400" />
        <StatCard
          icon={Target}
          label="Overall completion"
          value={`${questions.length > 0 ? Math.round((completed.length / questions.length) * 100) : 0}%`}
        />
      </section>

      <section className="rounded-xl border border-border-subtle bg-surface p-6">
        <h2 className="mb-4 text-sm font-medium text-gray-300">Progress by category</h2>
        <div className="flex flex-col gap-4">
          {categories.map((category) => {
            const categoryQuestions = questions.filter((q) => q.category === category)
            const categoryCompleted = categoryQuestions.filter((q) => completed.includes(q.id)).length
            return (
              <div key={category}>
                <p className="mb-1 text-sm text-gray-300">{category}</p>
                <ProgressBar value={categoryCompleted} total={categoryQuestions.length} />
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border-subtle bg-surface p-6">
        <h2 className="mb-4 text-sm font-medium text-gray-300">Recent quiz attempts</h2>
        {quizHistory.length > 0 ? (
          <div className="flex flex-col divide-y divide-border-subtle">
            {quizHistory.map((attempt) => (
              <div key={attempt.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="text-gray-200">
                    {attempt.correct} / {attempt.total} correct
                  </p>
                  <p className="text-xs text-gray-500">
                    {attempt.difficulty} difficulty · {new Date(attempt.date).toLocaleString()}
                  </p>
                </div>
                <span className="font-medium text-brand-400">
                  {Math.round((attempt.correct / attempt.total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No quizzes taken yet.</p>
        )}
      </section>
    </div>
  )
}
