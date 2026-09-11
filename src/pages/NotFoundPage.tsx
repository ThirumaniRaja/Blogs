import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-4xl font-semibold text-gray-100">404</h1>
      <p className="text-gray-400">This page doesn&apos;t exist.</p>
      <Link to="/" className="text-sm text-brand-400 hover:underline">
        Go back home
      </Link>
    </div>
  )
}
