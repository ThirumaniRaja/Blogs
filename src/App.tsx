import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { QuestionsPage } from '@/pages/QuestionsPage'
import { QuestionDetailPage } from '@/pages/QuestionDetailPage'
import { QuizPage } from '@/pages/QuizPage'
import { BookmarksPage } from '@/pages/BookmarksPage'
import { ProgressPage } from '@/pages/ProgressPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="questions/:id" element={<QuestionDetailPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

