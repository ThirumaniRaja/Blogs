import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, Circle } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { questions } from '@/data/questions'
import { useProgress } from '@/context/ProgressContext'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { CodeBlock } from '@/components/ui/CodeBlock'

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isCompleted, isBookmarked, toggleCompleted, toggleBookmarked } = useProgress()

  const index = questions.findIndex((q) => q.id === id)
  const question = questions[index]

  if (!question) {
    return <Navigate to="/questions" replace />
  }

  const prev = questions[index - 1]
  const next = questions[index + 1]
  const completed = isCompleted(question.id)
  const bookmarked = isBookmarked(question.id)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to="/questions" className="flex w-fit items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200">
        <ArrowLeft size={16} /> Back to all questions
      </Link>

      <div className="rounded-xl border border-border-subtle bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="rounded-full border border-border-subtle px-2.5 py-0.5 text-xs text-gray-400">
            {question.category}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-semibold break-words text-gray-50">{question.title}</h1>
        <p className="mt-3 break-words text-gray-300">{question.question}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {question.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-400">
              #{tag}
            </span>
          ))}
        </div>

        {question.codeExample && (
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-medium text-gray-300">Code example</h2>
            <CodeBlock code={question.codeExample} />
          </div>
        )}

        {question.expectedOutput && (
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-medium text-gray-300">Expected output</h2>
            <CodeBlock code={question.expectedOutput} label="Output" />
          </div>
        )}

        <div className="mt-6">
          <h2 className="mb-2 text-sm font-medium text-gray-300">Explanation</h2>
          <p className="leading-relaxed break-words text-gray-400">{question.explanation}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border-subtle pt-6">
          <button
            type="button"
            onClick={() => toggleCompleted(question.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              completed
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'border border-border-subtle text-gray-300 hover:bg-white/5'
            }`}
          >
            {completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {completed ? 'Completed' : 'Mark as completed'}
          </button>

          <button
            type="button"
            onClick={() => toggleBookmarked(question.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              bookmarked
                ? 'bg-amber-500/15 text-amber-400'
                : 'border border-border-subtle text-gray-300 hover:bg-white/5'
            }`}
          >
            {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {prev ? (
          <Link
            to={`/questions/${prev.id}`}
            className="flex items-center gap-1.5 rounded-lg border border-border-subtle px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            <ArrowLeft size={16} /> Previous
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/questions/${next.id}`}
            className="flex items-center gap-1.5 rounded-lg border border-border-subtle px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Next <ArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
