'use client'

import { Heart, Home, Info } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

const links = [
  { href: '/', label: 'Ingredients', icon: Home, base: '/' },
  { href: '/favorites', label: 'Favorites', icon: Heart, base: '/favorites' },
  { href: '/about', label: 'About', icon: Info, base: '/about' },
]

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="pb-safe shadow-blur-y-2 fixed bottom-0 left-0 z-50 w-full border-t border-zinc-200 bg-white shadow-black/5 sm:hidden">
      <nav className="px-mobile md:px-desktop mx-auto flex h-16 max-w-screen-xl items-center justify-around 2xl:px-0">
        {links.map(({ href, label, icon: Icon, base }) => {
          const isActive = base === '/' ? pathname === '/' || pathname.startsWith('/meals') : pathname.startsWith(base)

          return (
            <Link
              key={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-2 transition-colors',
                isActive ? 'text-orange-500' : 'text-zinc-400 hover:bg-orange-50 hover:text-orange-500',
              )}
              href={href}
            >
              <Icon className={cn('transition-transform', isActive && 'scale-110')} size={20} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </footer>
  )
}
