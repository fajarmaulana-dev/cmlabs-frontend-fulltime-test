'use client'

import Link from 'next/link'
import { memo, useMemo } from 'react'

import { FavoriteButton } from '@/components/favorite-button'
import { ImageWithFallback } from '@/components/image-with-fallback'

interface Props {
  meal: FavoriteMeal
  onRemoveRequest: (id: string) => void
}

const FavoriteCard = ({ meal, onRemoveRequest }: Props) => {
  const href = useMemo(() => `/meals/${meal.ingredient}/${meal.idMeal}`, [meal])
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-200 hover:border-orange-500/40">
      <Link className="relative block aspect-square" href={href}>
        <ImageWithFallback
          fill
          alt={meal.strMeal}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          containerClassName="w-full h-full"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          src={meal.strMealThumb}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
      </Link>
      <div className="absolute top-2 right-2">
        <FavoriteButton isFavorite={true} onClick={() => onRemoveRequest(meal.idMeal)} />
      </div>
      <Link className="block p-3" href={href}>
        <h3 className="line-clamp-2 text-sm leading-snug font-medium text-slate-900 transition-colors group-hover:text-orange-400">
          {meal.strMeal}
        </h3>
        {meal.strCategory && <p className="mt-1 text-xs text-slate-500">{meal.strCategory}</p>}
      </Link>
    </div>
  )
}

export default memo(FavoriteCard)
