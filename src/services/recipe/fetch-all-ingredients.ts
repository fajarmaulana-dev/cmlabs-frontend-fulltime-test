import { API_URL } from '@/constants/env'

import { handleResponse } from '../api'

export async function fetchAllIngredients(): Promise<IngredientsResponse> {
  const res = await fetch(`${API_URL}/list.php?i=list`, {
    cache: 'force-cache',
  })

  return handleResponse<IngredientsResponse>(res, 'Failed to fetch ingredients')
}
