import { API_URL } from '@/constants/env'

import { handleResponse } from '../api'

export async function clientFetchMealsByIngredient(ingredient: string): Promise<MealsByIngredientResponse> {
  const res = await fetch(`${API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
  return handleResponse<MealsByIngredientResponse>(res, `Failed to fetch meals for "${ingredient}"`)
}
