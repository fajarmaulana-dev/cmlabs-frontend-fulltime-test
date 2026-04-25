import { API_URL } from '@/constants/env'
import { REVALIDATE_MEALS } from '@/features/meals/constants'

import { handleResponse } from '../api'

export async function fetchMealsByIngredient(ingredient: string): Promise<MealsByIngredientResponse> {
  const res = await fetch(`${API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`, {
    next: { revalidate: REVALIDATE_MEALS },
  })

  return handleResponse<MealsByIngredientResponse>(res, `Failed to fetch meals for "${ingredient}"`)
}
