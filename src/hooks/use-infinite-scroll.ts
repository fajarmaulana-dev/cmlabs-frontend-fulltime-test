'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_INITIAL_COUNT = 48
const DEFAULT_STEP = 48

interface IUseInfiniteScrollOptions {
  total: number
  initialCount?: number
  step?: number
}

interface IUseInfiniteScrollReturn {
  visibleCount: number
  sentinelRef: React.RefCallback<HTMLDivElement>
  hasMore: boolean
  reset: () => void
}

export function useInfiniteScroll({
  total,
  initialCount = DEFAULT_INITIAL_COUNT,
  step = DEFAULT_STEP,
}: IUseInfiniteScrollOptions): IUseInfiniteScrollReturn {
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, total))
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasMore = visibleCount < total

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + step, total))
  }, [step, total])

  const sentinelRef = useCallback<React.RefCallback<HTMLDivElement>>(
    node => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!node || !hasMore) return

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0]?.isIntersecting) {
            loadMore()
          }
        },
        {
          rootMargin: '0px 0px 200px 0px',
          threshold: 0,
        },
      )

      observerRef.current.observe(node)
    },
    [hasMore, loadMore],
  )

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const reset = useCallback(() => {
    setVisibleCount(prev => {
      return prev > initialCount ? Math.min(initialCount, total) : Math.min(prev, total)
    })
  }, [initialCount, total])

  return { visibleCount, sentinelRef, hasMore, reset }
}
