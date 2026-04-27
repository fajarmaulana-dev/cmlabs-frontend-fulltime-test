import { Metadata } from 'next'

import { INGREDIENT_IMAGE_BASE } from '@/features/ingredients/constants'
import { Page } from '@/features/meals/components/page'
import { fetchAllIngredients, fetchMealsByIngredient } from '@/services/recipe'
import { buildMetadata } from '@/utils/metadata'

export const revalidate = 3600

export async function generateStaticParams() {
  const data = await fetchAllIngredients()
  const ingredients = data.meals ?? []

  return ingredients.slice(0, 50).map(i => ({
    ingredient: encodeURIComponent(i.strIngredient.toLowerCase()),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ ingredient: string }> }): Promise<Metadata> {
  const { ingredient } = await params
  const decoded = decodeURIComponent(ingredient)

  return buildMetadata({
    title: `${decoded} recipes`,
    description: `Discover delicious meals made with ${decoded}. Browse recipes, find your favorites, and start cooking.`,
    path: `/meals/${ingredient}`,
    ogImage: `${INGREDIENT_IMAGE_BASE}/${ingredient}.png`,
  })
}

interface Props {
  params: Promise<{ ingredient: string }>
}

export default async function MealsPage({ params }: Props) {
  const { ingredient } = await params
  const decoded = decodeURIComponent(ingredient)
  const { meals } = await fetchMealsByIngredient(decoded)

  return <Page ingredientName={decoded} ingredientSlug={ingredient} meals={meals} />
}
