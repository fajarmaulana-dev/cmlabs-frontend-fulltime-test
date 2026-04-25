import { API_URL } from '@/constants/env'
import { REVALIDATE_MEAL_DETAIL } from '@/features/meals/constants'

import { handleResponse } from '../api'

export async function fetchMealById(id: string): Promise<MealDetailResponse> {
  const res = await fetch(`${API_URL}/lookup.php?i=${id}`, {
    next: { revalidate: REVALIDATE_MEAL_DETAIL },
  })

  return handleResponse<MealDetailResponse>(res, `Failed to fetch meal "${id}"`)
}
