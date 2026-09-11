import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-border-subtle py-6 text-center text-xs text-gray-500">
        Built for developers preparing for JavaScript interviews. Progress is saved locally in your browser.
      </footer>
    </>
  )
}
