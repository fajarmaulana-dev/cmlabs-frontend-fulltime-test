import Link from 'next/link'

export default function MealNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-6xl">🍽️</div>
      <h1 className="text-3xl font-bold text-zinc-100">Recipe Not Found</h1>
      <p className="max-w-md text-zinc-400">
        We couldn&apos;t find this recipe. It may have been removed or the link is incorrect.
      </p>
      <Link
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
        href="/"
      >
        Browse Ingredients
      </Link>
    </div>
  )
}
