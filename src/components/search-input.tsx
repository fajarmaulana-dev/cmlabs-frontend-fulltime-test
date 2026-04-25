'use client'

import { Search, X } from 'lucide-react'

import { cn } from '@/utils/cn'

interface SearchInputProps {
  id?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  id = 'search-input',
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" size={18} />
      <input
        className={cn(
          'w-full rounded-xl py-3 pr-10 pl-10',
          'border border-orange-200 bg-white shadow-sm',
          'text-slate-900 placeholder:text-slate-400',
          'focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none',
          'text-sm transition-all',
        )}
        id={id}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
          onClick={onClear}
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
