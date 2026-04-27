'use client'

import { ChevronLeft } from 'lucide-react'
import { UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import { ConfirmModal } from '@/components/confirm-modal'
import { SearchInput } from '@/components/search-input'
import { useFavoriteToggle } from '@/features/favorites/hooks/use-favorite-toggle'
import { INGREDIENT_IMAGE_BASE } from '@/features/ingredients/constants'
import { useSearchQuery } from '@/hooks/use-search-query'

import MealCard from './meal-card'

interface Props {
  meals: MealSummary[] | null
  ingredientName: string
  ingredientSlug: string
}

export function Page({ meals, ingredientName, ingredientSlug }: Props) {
  const { search, debouncedSearch, handleSearchChange, clearSearch } = useSearchQuery()
  const { isFavorite, toggleFavorite, isModalOpen, confirmRemove, cancelRemove, pendingRemoveId } = useFavoriteToggle()

  const pendingMealName = useMemo(
    () => meals?.find(m => m.idMeal === pendingRemoveId)?.strMeal ?? 'this meal',
    [meals, pendingRemoveId],
  )

  const filtered = useMemo(() => {
    if (!meals) return []
    if (!debouncedSearch.trim()) return meals
    const q = debouncedSearch.toLowerCase()
    return meals.filter(m => m.strMeal.toLowerCase().includes(q))
  }, [meals, debouncedSearch])

  const showEmpty = !meals || filtered.length === 0

  return (
    <div className="py-4">
      <div className="-mx-mobile px-mobile md:-mx-desktop md:px-desktop sticky top-0 z-50 mb-3 flex h-12 items-center bg-white/90 backdrop-blur-md sm:top-16 2xl:-mx-4 2xl:px-4">
        <Link
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-orange-500"
          href="/"
        >
          <ChevronLeft size={16} />
          Ingredients
        </Link>
      </div>
      <div className="mb-8 flex flex-col-reverse items-center justify-between overflow-hidden rounded-3xl bg-orange-50 sm:flex-row">
        <div className="flex flex-1 items-center gap-4 p-6 sm:p-10">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-white p-2 shadow-sm">
            <Image
              alt={ingredientName}
              className="h-full w-full object-contain"
              height={96}
              quality={60}
              sizes="96px"
              src={`${INGREDIENT_IMAGE_BASE}/${encodeURIComponent(ingredientName)}.png`}
              width={96}
            />
          </div>
          <div>
            <h1 className="xs:text-3xl mb-2 text-2xl font-bold text-slate-900 capitalize sm:text-4xl">
              {ingredientName}
            </h1>
            <p className="xs:text-base line-clamp-3 text-sm text-slate-600">
              {meals
                ? `Discover ${meals.length} delicious meal${meals.length !== 1 ? 's' : ''} using this ingredient`
                : 'No meals found for this ingredient'}
            </p>
          </div>
        </div>
        {filtered.length > 0 && (
          <div className="hidden h-full w-auto sm:block">
            <Image
              priority
              alt={filtered[0].strMeal}
              className="rounded-tl-half h-full w-full rounded-bl-3xl object-cover"
              fetchPriority="high"
              height={160}
              quality={60}
              sizes="(max-width: 640px) 0px, 160px"
              src={filtered[0].strMealThumb}
              width={160}
            />
          </div>
        )}
      </div>
      {meals && (
        <div className="-mx-mobile px-mobile md:-mx-desktop md:px-desktop sticky top-12 z-40 mb-4 bg-white/90 pb-4 backdrop-blur-md sm:top-28 sm:pt-4 2xl:-mx-4 2xl:px-4">
          <SearchInput
            className="max-w-xl shadow-sm"
            placeholder="Search meal by name..."
            value={search}
            onChange={handleSearchChange}
            onClear={clearSearch}
          />
        </div>
      )}
      {showEmpty ? (
        <EmptyState noMeals={!meals} query={debouncedSearch} />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((meal, index) => (
            <li key={meal.idMeal}>
              <MealCard
                ingredientName={ingredientName}
                ingredientSlug={ingredientSlug}
                isFavorite={isFavorite(meal.idMeal)}
                meal={meal}
                priority={index === 0}
                onToggleFavorite={() =>
                  toggleFavorite({
                    idMeal: meal.idMeal,
                    strMeal: meal.strMeal,
                    strMealThumb: meal.strMealThumb,
                    strCategory: '',
                    strArea: '',
                    ingredient: ingredientSlug,
                    savedAt: Date.now(),
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
      <ConfirmModal
        cancelLabel="Cancel"
        confirmLabel="Yes, remove"
        description={`Are you sure you want to remove "${pendingMealName}" from your favorites?`}
        open={isModalOpen}
        title="Remove from Favorites?"
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
      />
    </div>
  )
}

function EmptyState({ query, noMeals }: { query: string; noMeals: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <UtensilsCrossed className="text-slate-400" size={48} />
      <h2 className="text-xl font-semibold text-slate-700">{noMeals ? 'No meals found' : 'Meal not found'}</h2>
      <p className="max-w-sm text-slate-500">
        {noMeals
          ? 'There are no meals available for this ingredient.'
          : `No meals match "${query}". Try a different name.`}
      </p>
      <Link
        className="mt-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        href="/"
      >
        Browse Ingredients
      </Link>
    </div>
  )
}
