'use client'

import { useCallback, useEffect, useState } from 'react'

import { useFavoritesStore } from '@/stores/favorites-store'
import { useToastStore } from '@/stores/toast-store'

export function useFavoriteToggle() {
  const favorites = useFavoritesStore(state => state.favorites)
  const addFavorite = useFavoritesStore(state => state.addFavorite)
  const removeFavorite = useFavoritesStore(state => state.removeFavorite)
  const { showToast } = useToastStore()

  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const isFavorite = useCallback(
    (idMeal: string) => {
      if (!hydrated) return false
      return favorites.some(f => f.idMeal === idMeal)
    },
    [favorites, hydrated],
  )

  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null)

  const toggleFavorite = useCallback(
    (meal: FavoriteMeal) => {
      if (!isFavorite(meal.idMeal)) {
        addFavorite(meal)
        showToast(`"${meal.strMeal}" added to favorites! ❤️`, 'success')
        return
      }
      setPendingRemoveId(meal.idMeal)
    },
    [isFavorite, addFavorite, showToast],
  )

  const confirmRemove = useCallback(() => {
    if (pendingRemoveId) {
      removeFavorite(pendingRemoveId)
      showToast('Removed from favorites.', 'info')
      setPendingRemoveId(null)
    }
  }, [pendingRemoveId, removeFavorite, showToast])

  const cancelRemove = useCallback(() => setPendingRemoveId(null), [])

  return {
    isFavorite,
    toggleFavorite,
    pendingRemoveId,
    confirmRemove,
    cancelRemove,
    isModalOpen: pendingRemoveId !== null,
  }
}
