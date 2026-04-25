/* eslint-disable @next/next/no-img-element */
'use client'

import { Heart, UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'

import { ConfirmModal } from '@/components/confirm-modal'
import { SearchInput } from '@/components/search-input'
import { CLOUDINARY_BASE } from '@/constants/env'

import { useFavorite } from '../hooks/use-favorite'
import FavoriteCard from './favorite-card'

export function Page() {
  const {
    hydrated,
    filtered,
    favorites,
    pendingId,
    search,
    setSearch,
    pendingMeal,
    debouncedSearch,
    handleRemoveRequest,
    cancelRemove,
    confirmRemove,
  } = useFavorite()
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 h-10 w-48 animate-pulse rounded-xl bg-orange-100" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-orange-100" />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col-reverse items-center justify-between overflow-hidden rounded-3xl bg-orange-50 sm:flex-row">
        <div className="flex-1 p-6 sm:p-10">
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            My Favorites
            <Heart className="fill-orange-500 text-orange-500" size={32} />
          </h1>
          <p className="text-slate-600">Meals you have saved for later</p>
        </div>
        <div className="hidden w-full justify-end p-6 sm:flex sm:w-1/3">
          <img
            alt="Wishlist"
            className="h-auto w-full max-w-50 object-contain"
            src={`${CLOUDINARY_BASE}/wishlist_sxyljh.svg`}
          />
        </div>
      </div>
      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <>
          <div className="-mx-mobile px-mobile md:-mx-desktop md:px-desktop sticky top-0 z-40 mb-4 bg-white py-4 sm:top-16 2xl:-mx-4 2xl:px-4">
            <SearchInput
              className="max-w-xl shadow-sm"
              placeholder="Search favorite meal by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClear={() => setSearch('')}
            />
          </div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <UtensilsCrossed className="text-slate-400" size={40} />
              <p className="text-slate-500">No results for &ldquo;{debouncedSearch}&rdquo;</p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map(meal => (
                <li key={meal.idMeal}>
                  <FavoriteCard meal={meal} onRemoveRequest={handleRemoveRequest} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <ConfirmModal
        cancelLabel="Cancel"
        confirmLabel="Yes, remove"
        description={`Are you sure you want to remove "${pendingMeal?.strMeal ?? 'this meal'}" from your favorites?`}
        open={pendingId !== null}
        title="Remove from Favorites?"
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
      />
    </div>
  )
}

function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-orange-50/50 py-24 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">
        <Heart className="fill-orange-500 text-orange-500" size={40} />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-800">Your favorites will appear here</h2>
        <p className="mb-5 max-w-sm text-slate-500">Tap the heart icon on any meal to add it to your favorites.</p>
        <Link
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          href="/"
        >
          Browse Ingredients
        </Link>
      </div>
    </div>
  )
}
