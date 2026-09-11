import { Bookmark, BookmarkCheck, CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProgress } from '@/context/ProgressContext'
import type { Question } from '@/types'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

export function QuestionCard({ question }: { question: Question }) {
  const { isCompleted, isBookmarked, toggleCompleted, toggleBookmarked } = useProgress()
  const completed = isCompleted(question.id)
  const bookmarked = isBookmarked(question.id)

  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface p-4 transition hover:border-brand-500/40 hover:bg-surface-2">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/questions/${question.id}`} className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-gray-100 group-hover:text-brand-400">
            {question.title}
          </h3>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => toggleBookmarked(question.id)}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            className="rounded p-1 text-gray-400 hover:bg-white/5 hover:text-amber-400"
          >
            {bookmarked ? <BookmarkCheck size={18} className="text-amber-400" /> : <Bookmark size={18} />}
          </button>
          <button
            type="button"
            onClick={() => toggleCompleted(question.id)}
            aria-label={completed ? 'Mark as not completed' : 'Mark as completed'}
            className="rounded p-1 text-gray-400 hover:bg-white/5 hover:text-emerald-400"
          >
            {completed ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} />}
          </button>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-gray-400">{question.question}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="rounded-full border border-border-subtle px-2.5 py-0.5 text-xs text-gray-400">
          {question.category}
        </span>
      </div>
    </div>
  )
}
