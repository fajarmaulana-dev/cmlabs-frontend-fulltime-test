'use client'

import { ChevronLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ConfirmModal } from '@/components/confirm-modal'
import { FavoriteButton } from '@/components/favorite-button'
import { cn } from '@/utils/cn'

import { TABS } from '../constants'
import { useMealDetail } from '../hooks/use-meal-detail'

interface Props {
  meal: MealDetail
  ingredientSlug: string
}

export function MealDetail({ meal, ingredientSlug }: Props) {
  const {
    isModalOpen,
    confirmRemove,
    cancelRemove,
    activeTab,
    handleToggle,
    ingredients,
    steps,
    embedUrl,
    favorite,
    scrollToSection,
    youtubeId,
  } = useMealDetail(meal, ingredientSlug)
  return (
    <div className="py-4" id="overview">
      <div className="-mx-mobile px-mobile md:-mx-desktop md:px-desktop sticky top-0 z-50 mb-2 flex h-12 items-center bg-white/90 backdrop-blur-md sm:top-16 2xl:-mx-4 2xl:px-4">
        <Link
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 capitalize transition-colors hover:text-orange-500"
          href={`/meals/${ingredientSlug}`}
        >
          <ChevronLeft size={16} />
          Back to {decodeURIComponent(ingredientSlug)} meals
        </Link>
      </div>
      <div className="mb-12 flex flex-col gap-8 sm:flex-row lg:gap-12">
        <div className="relative w-full md:w-1/2">
          <div className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-sm">
            <Image
              preload
              alt={meal.strMeal}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              fetchPriority="high"
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              src={meal.strMealThumb}
              style={{ viewTransitionName: `meal-img-${meal.idMeal}` }}
              width={400}
            />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton
              className="h-11 w-11 border border-slate-100 bg-white shadow-md"
              isFavorite={favorite}
              size={20}
              onClick={handleToggle}
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-center md:w-1/2">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-600">
              {meal.strCategory}
            </span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {meal.strArea}
            </span>
          </div>
          <h1 className="mb-4 text-2xl leading-tight font-bold text-slate-900 md:text-3xl lg:text-5xl">
            {meal.strMeal}
          </h1>
          <p className="mb-8 line-clamp-4 max-w-lg leading-relaxed text-slate-600">
            {meal.strSource
              ? 'A delicious classic meal that you can cook at home with simple ingredients.'
              : 'Enjoy this wonderful recipe.'}
          </p>
        </div>
      </div>
      <div className="-mx-mobile px-mobile md:-mx-desktop md:px-desktop sticky top-12 z-40 mb-8 border-b border-slate-200 bg-white/90 backdrop-blur-md sm:top-28 2xl:mx-0 2xl:px-0">
        <div className="no-scrollbar flex items-center gap-6 overflow-x-auto pb-0 sm:pt-4 md:gap-10">
          {TABS.map(tab => {
            if (tab.id === 'video' && !embedUrl) return null
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={cn(
                  'relative pb-4 text-sm font-semibold whitespace-nowrap transition-colors',
                  isActive ? 'text-orange-500' : 'text-slate-500 hover:text-slate-800',
                )}
                onClick={() => scrollToSection(tab.id)}
              >
                {tab.label}
                {isActive && <span className="absolute bottom-0 left-0 h-0.75 w-full rounded-t-full bg-orange-500" />}
              </button>
            )
          })}
        </div>
      </div>
      <div className="relative grid items-start gap-12 sm:grid-cols-[1fr_2fr]">
        <section className="md:sticky md:top-36" id="ingredients">
          <div className="xs:rounded-3xl -mx-mobile xs:mx-0 min-w-65 border border-orange-100 bg-orange-50/30 p-6 md:p-8">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Ingredients</h2>
            <ul className="space-y-4">
              {ingredients.map(({ ingredient, measure }, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-2 border-b border-orange-100/50 pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="flex items-center gap-3 font-medium text-slate-700 capitalize">
                    <Image
                      alt={ingredient}
                      className="h-8 w-8 shrink-0 object-contain"
                      height={64}
                      quality={60}
                      sizes="32px"
                      src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}-Small.png`}
                      width={64}
                    />
                    {ingredient}
                  </span>
                  <span className="text-right text-slate-500">{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="space-y-16">
          <section id="instructions">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Instructions</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                  <p className="flex-1 leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
            {meal.strSource && (
              <div className="mt-10 flex justify-center">
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-50"
                  href={meal.strSource}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink size={16} />
                  View Original Source
                </a>
              </div>
            )}
          </section>
          {embedUrl && (
            <section className="pt-4 pb-12" id="video">
              <h2 className="mb-8 text-2xl font-bold text-slate-900">Video Tutorial</h2>
              <div className="aspect-video w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-md">
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="h-full w-full border-0"
                  loading="lazy"
                  src={embedUrl}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto;object-fit:cover}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black;transition:transform 0.2s}a:hover span{transform:scale(1.1)}</style><a href="${embedUrl}"><img src="https://images.weserv.nl/?url=https://i.ytimg.com/vi_webp/${youtubeId}/hqdefault.webp" alt="Video Tutorial"><span>▶</span></a>`}
                  title={`${meal.strMeal} tutorial`}
                />
              </div>
            </section>
          )}
        </div>
      </div>
      <ConfirmModal
        cancelLabel="Cancel"
        confirmLabel="Yes, remove"
        description={`Are you sure you want to remove "${meal.strMeal}" from your favorites?`}
        open={isModalOpen}
        title="Remove from Favorites?"
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
      />
    </div>
  )
}
