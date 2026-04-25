'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { SEARCH_DEBOUNCE } from '@/constants/ui'

import { useDebounce } from './use-debounce'

export function useSearchQuery() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(() => searchParams.get('search') ?? '')

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }

    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }, [debouncedSearch, pathname, router, searchParams])

  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? ''
    if (urlSearch !== search) setSearch(urlSearch)
  }, [searchParams])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])

  const clearSearch = useCallback(() => setSearch(''), [])

  return { search, debouncedSearch, handleSearchChange, clearSearch }
}
