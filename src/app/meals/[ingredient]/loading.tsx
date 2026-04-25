export default function MealsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {}
      <div className="mb-8 h-4 w-24 animate-pulse rounded bg-orange-100" />
      <div className="mb-3 h-10 w-56 animate-pulse rounded-xl bg-orange-100" />
      <div className="mb-10 h-4 w-72 animate-pulse rounded bg-orange-100" />
      <div className="mb-8 h-12 w-80 animate-pulse rounded-xl bg-orange-100" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-orange-100">
            <div className="aspect-square bg-orange-200" />
            <div className="p-3">
              <div className="h-3 w-3/4 rounded bg-orange-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
