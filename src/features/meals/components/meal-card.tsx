'use client'

import Link from 'next/link'
import { memo, useMemo } from 'react'

import { FavoriteButton } from '@/components/favorite-button'
import { ImageWithFallback } from '@/components/image-with-fallback'

interface Props {
  meal: MealSummary
  ingredientSlug: string
  ingredientName: string
  isFavorite: boolean
  onToggleFavorite: () => void
  priority?: boolean
}

const MealCard = ({ meal, ingredientSlug, isFavorite, onToggleFavorite, priority }: Props) => {
  const href = useMemo(() => `/meals/${ingredientSlug}/${meal.idMeal}`, [ingredientSlug, meal.idMeal])

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-200 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
      <Link className="relative block aspect-square" href={href}>
        <ImageWithFallback
          fill
          alt={meal.strMeal}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          containerClassName="w-full h-full"
          fetchPriority={priority ? 'high' : 'auto'}
          preload={priority}
          quality={60}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          src={meal.strMealThumb}
          style={{ viewTransitionName: `meal-img-${meal.idMeal}` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
      </Link>
      <div className="absolute top-2 right-2">
        <FavoriteButton isFavorite={isFavorite} onClick={onToggleFavorite} />
      </div>
      <Link className="block p-3" href={href}>
        <h3 className="line-clamp-2 text-sm leading-snug font-medium text-slate-900 transition-colors group-hover:text-orange-400">
          {meal.strMeal}
        </h3>
      </Link>
    </div>
  )
}

export default memo(MealCard)
