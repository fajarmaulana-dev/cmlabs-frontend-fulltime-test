'use client'

import { ChefHat } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

const links = [
  { href: '/about', label: 'About' },
  { href: '/favorites', label: 'Favorites' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 hidden bg-slate-900 text-white shadow-md sm:block">
      <nav className="px-mobile md:px-desktop mx-auto flex h-16 max-w-screen-xl items-center justify-between 2xl:px-0">
        <Link className="flex items-center gap-2 text-xl font-bold text-zinc-100" href="/">
          <ChefHat className="text-orange-400" size={24} />
          <span>
            Tasti<span className="text-orange-400">Fy</span>
          </span>
        </Link>

        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname.startsWith(href)

            return (
              <li key={href}>
                <Link
                  className={cn(
                    'group relative py-2 text-sm font-medium transition-colors hover:text-orange-400',
                    isActive ? 'text-orange-400' : 'text-zinc-300',
                  )}
                  href={href}
                >
                  {label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-0.5 w-full origin-left bg-orange-400 transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
