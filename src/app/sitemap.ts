import { MetadataRoute } from 'next'

import { SITE_URL } from '@/constants/env'
import { fetchAllIngredients } from '@/services/recipe'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchAllIngredients()
  const ingredients = data.meals ?? []

  const ingredientUrls = ingredients.map(i => ({
    url: `${SITE_URL}/meals/${encodeURIComponent(i.strIngredient.toLowerCase())}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...ingredientUrls,
  ]
}
