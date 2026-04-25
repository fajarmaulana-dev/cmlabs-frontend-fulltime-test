export async function handleResponse<T>(res: Response, errorMessage: string): Promise<T> {
  if (!res.ok) {
    const fullMessage = `${errorMessage}: ${res.status}`
    throw new Error(fullMessage)
  }
  return res.json()
}
