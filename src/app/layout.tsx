import './globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Suspense } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ToastContainer } from '@/components/toast-container'
import { SITE_URL } from '@/constants/env'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: {
    default: 'TastiFy - Discover Recipes by Ingredient',
    template: '%s | TastiFy',
  },
  description:
    'TastiFy helps you discover delicious recipes by ingredient. Browse thousands of meals, save your favorites, and cook something amazing.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: 'TastiFy',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  other: {
    'view-transition': 'same-origin',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={geist.variable} lang="en">
      <body className="flex min-h-screen flex-col bg-white pb-16 text-slate-900 antialiased sm:pb-0">
        <NextTopLoader color="#f97316" showSpinner={false} />
        <Suspense fallback={<div className="h-16 bg-slate-900" />}>
          <Header />
        </Suspense>
        <main className="px-mobile md:px-desktop mx-auto w-full max-w-screen-xl flex-1 2xl:px-0">
          <Suspense fallback={<div className="h-screen" />}>{children}</Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <ToastContainer />
      </body>
    </html>
  )
}
