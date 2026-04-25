'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { SEARCH_DEBOUNCE } from '@/constants/ui'
import { useDebounce } from '@/hooks/use-debounce'
import { useFavoritesStore } from '@/stores/favorites-store'
import { useToastStore } from '@/stores/toast-store'

export function useFavorite() {
  const { favorites, removeFavorite } = useFavoritesStore()
  const { showToast } = useToastStore()

  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE)

  const [pendingId, setPendingId] = useState<string | null>(null)
  const pendingMeal = useMemo(() => favorites.find(f => f.idMeal === pendingId), [favorites, pendingId])

  const handleRemoveRequest = useCallback((id: string) => {
    setPendingId(id)
  }, [])

  const confirmRemove = useCallback(() => {
    if (pendingId) {
      removeFavorite(pendingId)
      showToast('Removed from favorites.', 'info')
      setPendingId(null)
    }
  }, [pendingId, removeFavorite, showToast])

  const cancelRemove = useCallback(() => setPendingId(null), [])

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return favorites
    const q = debouncedSearch.toLowerCase()
    return favorites.filter(f => f.strMeal.toLowerCase().includes(q))
  }, [favorites, debouncedSearch])

  return {
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
  }
}
