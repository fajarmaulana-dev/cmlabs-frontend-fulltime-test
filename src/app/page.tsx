import { Metadata } from 'next'

import { Page } from '@/features/ingredients/components/page'
import { fetchAllIngredients } from '@/services/recipe'
import { buildMetadata } from '@/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Find Ingredients',
  description:
    'Browse 500+ ingredients and discover delicious meals you can make. Search by ingredient name and get inspired to cook something amazing.',
  path: '/',
})

export default async function IngredientsPage() {
  const data = await fetchAllIngredients()
  const ingredients = data.meals ?? []

  return <Page ingredients={ingredients} />
}
