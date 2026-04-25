import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-8xl font-black text-orange-100">404</div>
      <div className="text-5xl">🍳</div>
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="max-w-md text-slate-500">
        Looks like this page got burned. Let&apos;s get you back to the kitchen.
      </p>
      <Link
        className="mt-4 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
        href="/"
      >
        Back to Ingredients
      </Link>
    </div>
  )
}
