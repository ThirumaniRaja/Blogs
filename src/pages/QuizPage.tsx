import { PartyPopper, RotateCcw, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useProgress } from '@/context/ProgressContext'
import { questions } from '@/data/questions'
import type { Difficulty, Question } from '@/types'
import { QuizRunner } from '@/components/quiz/QuizRunner'

const difficulties: Array<Difficulty | 'All'> = ['All', 'Easy', 'Medium', 'Hard']
const sizeOptions = [5, 10, 15]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

type Stage = 'setup' | 'active' | 'results'

export function QuizPage() {
  const { recordQuizAttempt } = useProgress()
  const [stage, setStage] = useState<Stage>('setup')
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')
  const [size, setSize] = useState(10)
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<number | null>>([])

  const pool = useMemo(
    () =>
      questions.filter((q) => q.quiz && (difficulty === 'All' || q.difficulty === difficulty)),
    [difficulty],
  )

  const startQuiz = () => {
    const picked = shuffle(pool).slice(0, Math.min(size, pool.length))
    setQuizQuestions(picked)
    setCurrentIndex(0)
    setAnswers(new Array(picked.length).fill(null))
    setStage('active')
  }

  const handleSelect = (index: number) => {
    if (answers[currentIndex] !== null) return
    setAnswers((prev) => prev.map((a, i) => (i === currentIndex ? index : a)))
  }

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((i) => i + 1)
    } else {
      const correct = answers.filter(
        (answer, i) => answer !== null && answer === quizQuestions[i].quiz?.correctIndex,
      ).length
      recordQuizAttempt({ total: quizQuestions.length, correct, difficulty })
      setStage('results')
    }
  }

  const correctCount = answers.filter(
    (answer, i) => answer !== null && answer === quizQuestions[i]?.quiz?.correctIndex,
  ).length

  if (stage === 'setup') {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Take a quiz</h1>
          <p className="mt-1 text-sm text-gray-400">
            Test yourself with a randomized set of multiple-choice questions.
          </p>
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Difficulty</label>
          <div className="mb-6 flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  difficulty === d
                    ? 'bg-brand-500 text-white'
                    : 'border border-border-subtle text-gray-300 hover:bg-white/5'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-300">Number of questions</label>
          <div className="mb-6 flex flex-wrap gap-2">
            {sizeOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  size === s
                    ? 'bg-brand-500 text-white'
                    : 'border border-border-subtle text-gray-300 hover:bg-white/5'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="mb-4 text-xs text-gray-500">{pool.length} questions available in this pool.</p>

          <button
            type="button"
            disabled={pool.length === 0}
            onClick={startQuiz}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Sparkles size={16} /> Start quiz
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'active') {
    const question = quizQuestions[currentIndex]
    return (
      <div className="mx-auto max-w-2xl">
        <QuizRunner
          question={question}
          index={currentIndex}
          total={quizQuestions.length}
          selectedIndex={answers[currentIndex]}
          onSelect={handleSelect}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    )
  }

  const pct = quizQuestions.length > 0 ? Math.round((correctCount / quizQuestions.length) * 100) : 0

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-xl border border-border-subtle bg-surface p-10 text-center">
      <PartyPopper size={40} className="text-brand-400" />
      <div>
        <h1 className="text-2xl font-semibold text-gray-100">Quiz complete!</h1>
        <p className="mt-2 text-gray-400">
          You scored {correctCount} out of {quizQuestions.length} ({pct}%)
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStage('setup')}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          <RotateCcw size={16} /> Try another quiz
        </button>
      </div>
    </div>
  )
}
