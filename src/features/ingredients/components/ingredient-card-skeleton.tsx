'use client'

export function IngredientCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-100" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-4/5 rounded bg-slate-100" />
      </div>
      <div className="h-4 w-4 shrink-0 rounded bg-slate-100" />
    </div>
  )
}
