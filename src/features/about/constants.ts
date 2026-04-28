import { Globe, Heart, Search, Zap } from 'lucide-react'

export const FEATURES = [
  {
    icon: Search,
    title: 'Ingredient-Based Discovery',
    description:
      "Start with what's in your fridge. Browse 500+ ingredients and instantly see all the meals you can make.",
  },
  {
    icon: Heart,
    title: 'Save Your Favorites',
    description: 'Bookmark meals you love. Your favorites persist across sessions, ready whenever you want to cook.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description:
      'Built with Next.js App Router. Pages are rendered on the server with streaming for optimal performance and SEO.',
  },
  {
    icon: Globe,
    title: 'Global Cuisine',
    description: 'Explore Jamaican, Japanese, Italian, and more. TheMealDB covers dishes from around the world.',
  },
]

export const TECH_STACK = [
  { name: 'Next.js 15', description: 'App Router, Server Components & Dynamic Rendering' },
  { name: 'TypeScript', description: 'End-to-end type safety' },
  { name: 'Tailwind CSS v4', description: 'Utility-first styling' },
  { name: 'Zustand', description: 'Lightweight state management' },
  { name: 'TheMealDB', description: 'Free recipe & meal API' },
  { name: 'Cloudinary', description: 'Optimised image hosting' },
]

export const FLOWS = [
  {
    step: '1',
    title: 'Choose an Ingredient',
    desc: 'Browse or search from 500+ ingredients on the home page.',
  },
  {
    step: '2',
    title: 'Explore Meals',
    desc: 'See all recipes that use your chosen ingredient. Filter by meal name.',
  },
  {
    step: '3',
    title: 'Read the Recipe',
    desc: 'View full ingredients list, step-by-step instructions, and a video tutorial.',
  },
  {
    step: '4',
    title: 'Save & Cook',
    desc: 'Heart any meal to save it. Your favorites are always one tap away.',
  },
]
