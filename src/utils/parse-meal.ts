export function parseMealIngredients(meal: MealDetail): ParsedIngredientLine[] {
  const lines: ParsedIngredientLine[] = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDetail] as string | null
    const measure = meal[`strMeasure${i}` as keyof MealDetail] as string | null

    if (ingredient && ingredient.trim()) {
      lines.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? '',
      })
    }
  }

  return lines
}

export function toYouTubeEmbed(url: string | null): string | null {
  if (!url) return null
  const match = url.match(/[?&]v=([^&]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export function parseInstructions(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
}
