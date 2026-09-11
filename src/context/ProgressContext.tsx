import { createContext, type ReactNode, useContext, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { ProgressState, QuizAttempt } from '@/types'

interface ProgressContextValue {
  completed: string[]
  bookmarked: string[]
  quizHistory: QuizAttempt[]
  isCompleted: (id: string) => boolean
  isBookmarked: (id: string) => boolean
  toggleCompleted: (id: string) => void
  toggleBookmarked: (id: string) => void
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => void
  resetProgress: () => void
}

const defaultState: ProgressState = {
  completed: [],
  bookmarked: [],
  quizHistory: [],
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<ProgressState>('js-interview-progress', defaultState)

  const value = useMemo<ProgressContextValue>(
    () => ({
      completed: state.completed,
      bookmarked: state.bookmarked,
      quizHistory: state.quizHistory,
      isCompleted: (id: string) => state.completed.includes(id),
      isBookmarked: (id: string) => state.bookmarked.includes(id),
      toggleCompleted: (id: string) => {
        setState((prev) => ({
          ...prev,
          completed: prev.completed.includes(id)
            ? prev.completed.filter((c) => c !== id)
            : [...prev.completed, id],
        }))
      },
      toggleBookmarked: (id: string) => {
        setState((prev) => ({
          ...prev,
          bookmarked: prev.bookmarked.includes(id)
            ? prev.bookmarked.filter((b) => b !== id)
            : [...prev.bookmarked, id],
        }))
      },
      recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => {
        setState((prev) => ({
          ...prev,
          quizHistory: [
            {
              ...attempt,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
            ...prev.quizHistory,
          ].slice(0, 20),
        }))
      },
      resetProgress: () => setState(defaultState),
    }),
    [state, setState],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
