'use client'

import { ChefHat } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo } from 'react'

import { SearchInput } from '@/components/search-input'
import { CLOUDINARY_BASE } from '@/constants/env'
import { INGREDIENT_BATCH_SIZE } from '@/features/ingredients/constants'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { useSearchQuery } from '@/hooks/use-search-query'

import IngredientCard from './ingredient-card'
import { IngredientCardSkeleton } from './ingredient-card-skeleton'

interface Props {
  ingredients: Ingredient[]
}

export function Page({ ingredients }: Props) {
  const { search, debouncedSearch, handleSearchChange, clearSearch } = useSearchQuery()

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return ingredients
    const q = debouncedSearch.toLowerCase()
    return ingredients.filter(i => i.strIngredient.toLowerCase().includes(q))
  }, [debouncedSearch, ingredients])

  const { visibleCount, sentinelRef, hasMore, reset } = useInfiniteScroll({
    total: filtered.length,
    initialCount: INGREDIENT_BATCH_SIZE,
    step: INGREDIENT_BATCH_SIZE,
  })

  useEffect(() => {
    reset()
  }, [debouncedSearch, reset])

  const visible = filtered.slice(0, visibleCount)
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col-reverse items-center justify-between overflow-hidden rounded-3xl bg-orange-50 sm:flex-row">
        <div className="flex-1 p-6 sm:p-10">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">Find Ingredients</h1>
          <p className="text-slate-600">Discover ingredients and get inspired to cook something amazing!</p>
        </div>
        <div className="flex w-full justify-center sm:w-1/2 sm:justify-end lg:w-2/5">
          <Image
            priority
            alt="Ingredients"
            className="xs:h-48 xs:w-auto h-auto w-3/5 rounded-t-3xl sm:h-auto sm:w-full sm:rounded-l-none sm:rounded-r-3xl"
            fetchPriority="high"
            height={400}
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 50vw, 400px"
            src={`${CLOUDINARY_BASE}/ingredients_yhv3zr.avif`}
            width={400}
          />
        </div>
      </div>
      <div className="-mx-mobile px-mobile md:-mx-desktop md:px-desktop sticky top-0 z-40 mb-4 bg-white py-4 sm:top-16 2xl:-mx-4 2xl:px-4">
        <SearchInput
          className="max-w-xl shadow-sm"
          placeholder="Search ingredient by name..."
          value={search}
          onChange={handleSearchChange}
          onClear={clearSearch}
        />
      </div>
      <p className="mb-6 text-sm font-medium text-slate-500">
        Total Ingredients{' '}
        <span className="ml-2 inline-flex items-center rounded-md bg-orange-500 px-2 py-1 text-xs font-bold text-white">
          {filtered.length}
        </span>
      </p>
      {filtered.length === 0 ? (
        <EmptyState query={debouncedSearch} />
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map(ingredient => (
              <li key={ingredient.idIngredient}>
                <IngredientCard ingredient={ingredient} />
              </li>
            ))}
          </ul>
          {hasMore && (
            <>
              <div ref={sentinelRef} aria-hidden="true" className="h-px" />
              <ul
                aria-label="Loading more ingredients"
                className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <li key={i}>
                    <IngredientCardSkeleton />
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <ChefHat className="text-slate-400" size={48} />
      <h2 className="text-xl font-semibold text-slate-700">Ingredient not found</h2>
      <p className="max-w-sm text-slate-500">No ingredients match &ldquo;{query}&rdquo;. Try a different name.</p>
    </div>
  )
}
