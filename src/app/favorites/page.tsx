import type { Metadata } from 'next'

import { Page } from '@/features/favorites/components/page'
import { buildMetadata } from '@/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'My Favorites',
  description: 'View and manage your saved favorite recipes on TastiFy.',
  path: '/favorites',
  noIndex: true,
})

export default function FavoritesPage() {
  return <Page />
}
