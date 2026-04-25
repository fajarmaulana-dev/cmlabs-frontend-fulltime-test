import { useCallback, useEffect, useMemo, useState } from 'react'

import { useFavoriteToggle } from '@/features/favorites/hooks/use-favorite-toggle'
import { parseInstructions, parseMealIngredients, toYouTubeEmbed } from '@/utils/parse-meal'

import { TABS } from '../constants'

export function useMealDetail(meal: MealDetail, ingredientSlug: string) {
  const { isFavorite, toggleFavorite, isModalOpen, confirmRemove, cancelRemove } = useFavoriteToggle()
  const [activeTab, setActiveTab] = useState('overview')

  const favoriteMeal: FavoriteMeal = useMemo(
    () => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      ingredient: ingredientSlug,
      savedAt: Date.now(),
    }),
    [meal, ingredientSlug],
  )

  const handleToggle = useCallback(() => {
    toggleFavorite(favoriteMeal)
  }, [favoriteMeal, toggleFavorite])

  const ingredients = parseMealIngredients(meal)
  const steps = parseInstructions(meal.strInstructions)
  const embedUrl = toYouTubeEmbed(meal.strYoutube)
  const favorite = isFavorite(meal.idMeal)

  useEffect(() => {
    const handleScroll = () => {
      const sections = TABS.map(tab => document.getElementById(tab.id)).filter(Boolean)

      let current = 'overview'
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 140) {
            current = section.id
          }
        }
      }
      setActiveTab(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return {
    isFavorite,
    toggleFavorite,
    isModalOpen,
    confirmRemove,
    cancelRemove,
    activeTab,
    handleToggle,
    ingredients,
    steps,
    embedUrl,
    favorite,
    scrollToSection,
  }
}
