'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { FAVORITES_STORAGE_KEY } from '@/features/favorites/constants'

interface FavoritesState {
  favorites: FavoriteMeal[]
  addFavorite: (meal: FavoriteMeal) => void
  removeFavorite: (idMeal: string) => void
  isFavorite: (idMeal: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: meal => {
        if (get().isFavorite(meal.idMeal)) return
        set(state => ({
          favorites: [{ ...meal, savedAt: Date.now() }, ...state.favorites],
        }))
      },

      removeFavorite: idMeal => {
        set(state => ({
          favorites: state.favorites.filter(f => f.idMeal !== idMeal),
        }))
      },

      isFavorite: idMeal => {
        return get().favorites.some(f => f.idMeal === idMeal)
      },
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
