export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface QuizChoice {
  options: string[]
  correctIndex: number
}

export interface Question {
  id: string
  title: string
  difficulty: Difficulty
  category: string
  tags: string[]
  question: string
  explanation: string
  codeExample?: string
  expectedOutput?: string
  quiz?: QuizChoice
}

export interface ProgressState {
  completed: string[]
  bookmarked: string[]
  quizHistory: QuizAttempt[]
}

export interface QuizAttempt {
  id: string
  date: string
  total: number
  correct: number
  difficulty: Difficulty | 'All'
}
