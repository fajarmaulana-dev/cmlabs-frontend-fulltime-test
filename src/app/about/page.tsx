import type { Metadata } from 'next'

import { Page } from '@/features/about/components/page'
import { buildMetadata } from '@/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About TastiFy',
  description:
    'Learn about TastiFy, a recipe discovery platform built with Next.js and powered by TheMealDB. Find ingredients, discover meals, and save your favorites.',
  path: '/about',
})

export default function About() {
  return <Page />
}
