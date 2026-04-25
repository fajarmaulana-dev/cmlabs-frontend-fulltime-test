export default function MealDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 h-4 w-32 animate-pulse rounded bg-orange-100" />
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-3xl bg-orange-100" />
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-orange-100" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-orange-100" />
          </div>
          <div className="h-10 w-3/4 animate-pulse rounded-xl bg-orange-100" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-orange-50" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-9 animate-pulse rounded-lg bg-orange-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
