'use client'

import { Heart } from 'lucide-react'

import { cn } from '@/utils/cn'

interface FavoriteButtonProps {
  isFavorite: boolean
  onClick: () => void
  className?: string
  size?: number
}

export function FavoriteButton({ isFavorite, onClick, className, size = 18 }: FavoriteButtonProps) {
  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-200',
        'h-9 w-9 shadow-lg',
        isFavorite
          ? 'bg-orange-500! text-white hover:bg-red-500!'
          : 'bg-white/90 text-slate-400 hover:bg-white hover:text-orange-500',
        className,
      )}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
    >
      <Heart className={cn('transition-all', isFavorite && 'fill-current')} size={size} />
    </button>
  )
}
