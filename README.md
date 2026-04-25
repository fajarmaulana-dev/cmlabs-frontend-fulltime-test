# 🍳 TastiFy — This Next.js Boilerplate is generated with AI

> Recipe discovery app powered by [TheMealDB API](https://www.themealdb.com/api.php)

---

## 📐 Architecture Overview

```
tastify/
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   │   ├── (root)/             # Route group for / (ingredients)
│   │   ├── meals/
│   │   │   └── [ingredient]/
│   │   │       └── [mealId]/
│   │   ├── favorites/
│   │   └── about/
│   ├── components/
│   │   ├── ui/                 # Reusable atomic UI components
│   │   └── features/           # Feature-specific components
│   │       ├── ingredients/
│   │       ├── meals/
│   │       ├── favorites/
│   │       └── about/
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, API clients, helpers
│   ├── stores/                 # Zustand stores (favorites, toast)
│   └── types/                  # TypeScript type definitions
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

### 2. Install Dependencies

```bash
# State management
npm install zustand

# Icons
npm install lucide-react

# cn utility
npm install clsx tailwind-merge

# Tailwind v4 already included via create-next-app
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
npm run dev
```

---

## 🗺 Page-by-Page Strategy

| Page        | Path                           | Strategy                    | Reason                                                                                   |
| ----------- | ------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| Ingredients | `/`                            | **SSG**                     | API returns ALL ingredients at once, static at build time. Search is client-side filter. |
| Meals       | `/meals/[ingredient]`          | **ISR (revalidate: 3600)**  | Data per ingredient, can be stale for 1h, prerendered for popular ingredients            |
| Meal Detail | `/meals/[ingredient]/[mealId]` | **ISR (revalidate: 86400)** | Recipe data rarely changes, heavy SEO value, cache aggressively                          |
| Favorites   | `/favorites`                   | **CSR**                     | Entirely user-specific localStorage data, cannot be server-rendered                      |
| About       | `/about`                       | **SSG**                     | Static content, no dynamic data                                                          |

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
| `useSearchQuery` | Sync search with URL ?search= param              |
| `useFavorites`   | Read/write favorites from Zustand + localStorage |
| `useToast`       | Trigger toast notifications                      |

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

1. **SSG for Ingredients**: Build-time fetch means zero runtime latency for the heaviest list page.
2. **ISR for Meals/Detail**: Pages revalidate in background; users always get fast cached response.
3. **Image Optimization**: All images use `next/image` with `sizes` prop. Static assets (Cloudinary) are cached via CDN
   headers.
4. **Debounced Search**: 500ms debounce prevents re-render storms on keystrokes.
5. **Zustand over Context**: Zustand avoids React context re-render cascades; only subscribed components re-render.
6. **`useCallback` / `useMemo`**: Used in list components to prevent child re-renders when parent state changes
   unrelated to list items.
7. **`React.memo`**: Applied to `IngredientCard` and `MealCard` since they're rendered in large lists.
8. **Route Group `(root)`**: Lets `/` share a layout without affecting URL structure.
