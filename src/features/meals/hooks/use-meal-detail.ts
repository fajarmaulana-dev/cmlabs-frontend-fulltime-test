import { useCallback, useEffect, useMemo, useState } from 'react'

import { useFavoriteToggle } from '@/features/favorites/hooks/use-favorite-toggle'
import { parseInstructions, parseMealIngredients } from '@/utils/parse-meal'

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
  const favorite = isFavorite(meal.idMeal)

  const youtubeId = meal.strYoutube?.match(/[?&]v=([^&]+)/)?.[1]
  const embedUrl = youtubeId ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1` : null

  useEffect(() => {
    const sections = TABS.map(tab => document.getElementById(tab.id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-140px 0px -70% 0px',
        threshold: 0,
      },
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
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
    youtubeId,
  }
}
