import { BookMarked } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProgress } from '@/context/ProgressContext'
import { questions } from '@/data/questions'
import { QuestionCard } from '@/components/questions/QuestionCard'

export function BookmarksPage() {
  const { bookmarked } = useProgress()
  const bookmarkedQuestions = questions.filter((q) =>
    bookmarked.includes(q.id),
  )

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      {/* Page Header */}
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold text-gray-100">
          Bookmarked Questions
        </h1>

        <p className="mt-1 break-words text-sm text-gray-400">
          Questions you saved to revisit later.
        </p>
      </div>

      {bookmarkedQuestions.length > 0 ? (
        <div className="grid min-w-0 w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {bookmarkedQuestions.map((question) => (
            <div
              key={question.id}
              className="min-w-0 w-full max-w-full"
            >
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full max-w-full flex-col items-center gap-3 rounded-xl border border-dashed border-border-subtle p-6 text-center sm:p-12">
          <BookMarked
            size={32}
            className="shrink-0 text-gray-600"
          />

          <p className="max-w-full break-words text-gray-400">
            You haven&apos;t bookmarked any questions yet.
          </p>

          <Link
            to="/questions"
            className="shrink-0 text-sm text-brand-400 hover:underline"
          >
            Browse questions
          </Link>
        </div>
      )}
    </div>
  )
}