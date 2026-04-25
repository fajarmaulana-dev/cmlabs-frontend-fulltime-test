'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'

import { ImageWithFallback } from '@/components/image-with-fallback'
import { INGREDIENT_IMAGE_BASE } from '@/features/ingredients/constants'

interface Props {
  ingredient: Ingredient
}

export const IngredientCard = memo(function IngredientCard({ ingredient }: Props) {
  const slug = encodeURIComponent(ingredient.strIngredient.toLowerCase())
  const imageUrl = `${INGREDIENT_IMAGE_BASE}/${ingredient.strIngredient}-Small.png`

  return (
    <Link
      className="group flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-orange-500/50 hover:bg-white"
      href={`/meals/${slug}`}
    >
      <div className="rounded-xl bg-white p-1 shadow-sm">
        <ImageWithFallback
          alt={ingredient.strIngredient}
          className="h-full w-full object-contain"
          containerClassName="w-14 h-14 rounded-xl shrink-0"
          height={56}
          priority={false}
          sizes="56px"
          src={imageUrl}
          width={56}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-slate-900 transition-colors group-hover:text-orange-400">
          {ingredient.strIngredient}
        </h3>
        {ingredient.strDescription ? (
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{ingredient.strDescription}</p>
        ) : (
          <p className="mt-0.5 text-xs text-slate-400 italic">No description</p>
        )}
        {ingredient.strType && (
          <span className="text-xx mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 font-medium tracking-wide text-slate-500 uppercase">
            {ingredient.strType}
          </span>
        )}
      </div>

      <ChevronRight
        className="shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-orange-400"
        size={18}
      />
    </Link>
  )
})
