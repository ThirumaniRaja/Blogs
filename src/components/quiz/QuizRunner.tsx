import { CheckCircle2, XCircle } from 'lucide-react'
import type { Question } from '@/types'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

interface QuizRunnerProps {
  question: Question
  index: number
  total: number
  selectedIndex: number | null
  onSelect: (index: number) => void
  onPrevious: () => void
  onNext: () => void
}

export function QuizRunner({
  question,
  index,
  total,
  selectedIndex,
  onSelect,
  onPrevious,
  onNext,
}: QuizRunnerProps) {
  const quiz = question.quiz
  if (!quiz) return null

  const hasAnswered = selectedIndex !== null

  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-6 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">
          Question {index + 1} of {total}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      <h2 className="text-lg font-medium break-words text-gray-100">{question.title}</h2>
      <p className="mt-2 text-sm break-words text-gray-400">{question.question}</p>

      <div className="mt-5 flex flex-col gap-2.5">
        {quiz.options.map((option, i) => {
          const isCorrect = i === quiz.correctIndex
          const isSelected = i === selectedIndex

          let stateClasses = 'border-border-subtle hover:border-brand-500/40 hover:bg-white/5'
          if (hasAnswered) {
            if (isCorrect) stateClasses = 'border-emerald-500/50 bg-emerald-500/10'
            else if (isSelected) stateClasses = 'border-red-500/50 bg-red-500/10'
            else stateClasses = 'border-border-subtle opacity-60'
          }

          return (
            <button
              key={option}
              type="button"
              disabled={hasAnswered}
              onClick={() => onSelect(i)}
              className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm text-gray-200 transition ${stateClasses}`}
            >
              <span className="break-words">{option}</span>
              {hasAnswered && isCorrect && <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />}
              {hasAnswered && isSelected && !isCorrect && <XCircle size={18} className="shrink-0 text-red-400" />}
            </button>
          )
        })}
      </div>

      {hasAnswered && (
        <div className="mt-5 rounded-lg bg-white/5 p-4 text-sm break-words text-gray-400">
          <p className="mb-1 font-medium text-gray-300">Explanation</p>
          {question.explanation}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          disabled={index === 0}
          onClick={onPrevious}
          className="rounded-lg border border-border-subtle px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!hasAnswered}
          onClick={onNext}
          className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index + 1 === total ? 'See results' : 'Next question'}
        </button>
      </div>
    </div>
  )
}
