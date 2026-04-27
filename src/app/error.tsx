'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { useToastStore } from '@/stores/toast-store'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const showToast = useToastStore(state => state.showToast)

  useEffect(() => {
    showToast(error.message || 'An unexpected error occurred', 'error')
  }, [error, showToast])
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-5xl">⚠️</div>
      <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
      <p className="max-w-md text-slate-500">An unexpected error occurred. Please try again or return home.</p>
      <div className="mt-4 flex gap-3">
        <button
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          onClick={reset}
        >
          Try again
        </button>
        <Link
          className="rounded-xl bg-orange-500 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-orange-600"
          href="/"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
