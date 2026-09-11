import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, questions } from '@/data/questions'
import type { Difficulty } from '@/types'
import { FilterBar } from '@/components/questions/FilterBar'
import { QuestionCard } from '@/components/questions/QuestionCard'

export function QuestionsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')

  const difficulty =
    (searchParams.get('difficulty') as Difficulty | null) ?? 'All'
  const category = searchParams.get('category') ?? 'All'

  const setDifficulty = (value: Difficulty | 'All') => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      if (value === 'All') {
        next.delete('difficulty')
      } else {
        next.set('difficulty', value)
      }

      return next
    })
  }

  const setCategory = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      if (value === 'All') {
        next.delete('category')
      } else {
        next.set('category', value)
      }

      return next
    })
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()

    return questions.filter((q) => {
      const matchesDifficulty =
        difficulty === 'All' || q.difficulty === difficulty

      const matchesCategory =
        category === 'All' || q.category === category

      const matchesSearch =
        term === '' ||
        q.title.toLowerCase().includes(term) ||
        q.question.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term) ||
        q.tags.some((tag) => tag.toLowerCase().includes(term))

      return matchesDifficulty && matchesCategory && matchesSearch
    })
  }, [search, difficulty, category])

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      {/* Page Header */}
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold text-gray-100">
          Interview Questions
        </h1>

        <p className="mt-1 text-sm text-gray-400 break-words">
          Browse, filter, and search {questions.length} JavaScript interview
          questions.
        </p>
      </div>

      {/* Filters */}
      <div className="min-w-0 w-full max-w-full">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
      </div>

      {/* Result Count */}
      <p className="text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
      </p>

      {/* Questions */}
      {filtered.length > 0 ? (
        <div className="grid min-w-0 w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((question) => (
            <div key={question.id} className="min-w-0 w-full max-w-full">
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-full rounded-xl border border-dashed border-border-subtle p-6 text-center text-gray-500 sm:p-10">
          No questions match your filters. Try adjusting the search or
          difficulty.
        </div>
      )}
    </div>
  )
}