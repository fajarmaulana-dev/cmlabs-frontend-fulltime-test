import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MealDetail } from '@/features/meals/components/meal-detail'
import { fetchMealById } from '@/services/recipe'
import { buildMetadata } from '@/utils/metadata'

export const revalidate = 86400

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ingredient: string; mealId: string }>
}): Promise<Metadata> {
  const { ingredient, mealId } = await params
  const data = await fetchMealById(mealId)
  const meal = data.meals?.[0]

  if (!meal) {
    return buildMetadata({
      title: 'Recipe Not Found',
      description: 'This recipe could not be found.',
      noIndex: true,
    })
  }

  return buildMetadata({
    title: meal.strMeal,
    description: `How to make ${meal.strMeal}, a ${meal.strArea} ${meal.strCategory} dish. Step-by-step instructions and ingredients.`,
    path: `/meals/${encodeURIComponent(ingredient)}/${mealId}`,
    ogImage: meal.strMealThumb,
  })
}

interface Props {
  params: Promise<{ ingredient: string; mealId: string }>
}

export default async function MealDetailPage({ params }: Props) {
  const { ingredient, mealId } = await params
  const data = await fetchMealById(mealId)
  const meal = data.meals?.[0]

  if (!meal) notFound()

  return <MealDetail ingredientSlug={ingredient} meal={meal} />
}
