import { BookMarked } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProgress } from '@/context/ProgressContext'
import { questions } from '@/data/questions'
import { QuestionCard } from '@/components/questions/QuestionCard'

export function BookmarksPage() {
  const { bookmarked } = useProgress()
  const bookmarkedQuestions = questions.filter((q) => bookmarked.includes(q.id))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-100">Bookmarked Questions</h1>
        <p className="mt-1 text-sm text-gray-400">Questions you saved to revisit later.</p>
      </div>

      {bookmarkedQuestions.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {bookmarkedQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-subtle p-12 text-center">
          <BookMarked size={32} className="text-gray-600" />
          <p className="text-gray-400">You haven&apos;t bookmarked any questions yet.</p>
          <Link to="/questions" className="text-sm text-brand-400 hover:underline">
            Browse questions
          </Link>
        </div>
      )}
    </div>
  )
}
