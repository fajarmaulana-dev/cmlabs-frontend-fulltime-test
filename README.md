# 🍳 TastiFy — This README is generated with AI

Can be accesed at [fajars-tastify.vercel.app](fajars-tastify.vercel.app)

> Recipe discovery app powered by [TheMealDB API](https://www.themealdb.com/api.php)

---

## 📐 Architecture Overview

```
tastify/
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   ├── components/             # Reusable atomic UI components (header, footer, modals)
│   ├── constants/              # Global constants and environment variables
│   ├── features/               # Feature-Sliced Design (FSD) modules
│   │   ├── about/              # About page components and constants
│   │   ├── favorites/          # Favorites logic, UI, and hooks
│   │   ├── ingredients/        # Ingredient listing & filtering logic
│   │   └── meals/              # Meals catalog & detail logic
│   ├── hooks/                  # Global custom React hooks (debounce, infinite scroll)
│   ├── services/               # API clients, server actions, and fetchers
│   ├── stores/                 # Zustand global stores (favorites, toast)
│   ├── types/                  # Global TypeScript definitions
│   └── utils/                  # Utility functions (cn, metadata, parsers)
├── public/
└── next.config.ts
```

---

## 🚀 Step-by-Step Setup

### 1. Init Project

```bash
npx create-next-app@latest tastify \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd tastify
```

### 2. Install Dependencies (Using Bun)

```bash
# Core (Next.js 16 Canary)
bun add next@canary react@canary react-dom@canary

# State management
bun add zustand

# UI & Icons
bun add lucide-react nextjs-toploader

# Utilities
bun add clsx tailwind-merge
```

### 3. Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_API_URL=https://www.themealdb.com/api/json/v1/1
NEXT_PUBLIC_CLOUDINARY_BASE_URL=https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload
```

### 4. Run Dev Server

```bash
bun dev
```

---

## 🗺 Page-by-Page Strategy

| Page        | Path                           | Strategy                    | Reason                                                                                   |
| ----------- | ------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| Ingredients | `/`                            | **PPR (Instant Shell)**     | SSG data fetching with instant streaming UI via Cache Components.                        |
| Meals       | `/meals/[ingredient]`          | **PPR + Hybrid (SSG/Dyn)**  | Pre-rendered for top 50 ingredients, on-demand for others. No blocking navigation.       |
| Meal Detail | `/meals/[ingredient]/[mealId]` | **Dynamic + PPR**           | Always fresh data, but with instant loading skeleton via streaming.                      |
| Favorites   | `/favorites`                   | **CSR**                     | Entirely user-specific localStorage data, rendered within a static shell.                |
| About       | `/about`                       | **PPR (Static)**            | Fully static content served with the unified streaming model.                            |

---

## 📦 Feature-Based Architecture Explained

### `src/app/` — Next.js App Router

- Each folder = a route segment
- `page.tsx` = server component by default (can be async for data fetching)
- `layout.tsx` = persistent shell (nav, providers)
- `loading.tsx` = automatic Suspense boundary UI
- `error.tsx` = error boundary UI

### `src/components/ui/` — Atomic Components

Reusable, **zero business logic**. Examples: `Button`, `Card`, `Badge`, `Input`, `Modal`, `Toast`, `ImageWithFallback`,
`Skeleton`.

### `src/components/features/` — Feature Components

Business-logic components scoped to a feature. These may use hooks and stores.

- `ingredients/IngredientCard.tsx` — card with image + description
- `ingredients/IngredientGrid.tsx` — grid + empty state
- `meals/MealCard.tsx` — card with favorite toggle
- `meals/MealGrid.tsx` — grid + empty state
- `meals/ConfirmUnfavoriteModal.tsx` — shared modal
- `favorites/FavoriteList.tsx`

### `src/hooks/` — Custom Hooks

| Hook             | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| `useDebounce`    | Debounce search input (500ms)                    |
| `useSearchQuery` | Sync search with URL ?search= (loop-protected)   |
| `useFavorites`   | Read/write favorites from Zustand + localStorage |
| `useMealDetail`  | Logic for meal detail with IntersectionObserver  |

### `src/stores/` — Zustand Stores

| Store            | Persisted?      | Reason                          |
| ---------------- | --------------- | ------------------------------- |
| `favoritesStore` | ✅ localStorage | User-specific, survives refresh |
| `toastStore`     | ❌              | Ephemeral UI state              |

### `src/lib/` — Utilities

| File           | Purpose                             |
| -------------- | ----------------------------------- |
| `api.ts`       | All TheMealDB fetch functions       |
| `cn.ts`        | `clsx` + `tailwind-merge` utility   |
| `metadata.ts`  | Shared `generateMetadata` helpers   |
| `constants.ts` | Revalidation times, image fallbacks |

### `src/types/` — TypeScript Types

Central type definitions for API responses and domain models.

---

## 🎯 Performance & Optimization Notes

1. **Next.js 16 Cache Components**: Enabled `cacheComponents: true` for unified Partial Prerendering (PPR).
2. **Instant Navigation**: Integrated `nextjs-toploader` and standard `Suspense` boundaries for immediate visual feedback.
3. **LCP Optimization**: 
   - Uses `preload` (standard in Next.js 16) and `fetchPriority="high"` for above-the-fold images.
   - Bypasses fade-in animations for prioritized images to satisfy LCP timing.
4. **No Layout Thrashing**: Replaced scroll-event measurement with `IntersectionObserver` for active tab highlighting.
5. **View Transitions**: Enabled native browser View Transitions API via `same-origin` meta tag.
6. **Bun Runtime**: Fully migrated to Bun for faster installation and execution.
7. **Infinite Loop Protection**: `useSearchQuery` includes query-string comparison to prevent navigation cycles.
