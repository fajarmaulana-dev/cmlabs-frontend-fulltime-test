// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Allow images from TheMealDB CDN and Cloudinary
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.weserv.nl',
        pathname: '/**',
      },
    ],
    // Serve WebP/AVIF for better performance
    formats: ['image/avif', 'image/webp'],
    // Default image cache TTL: 1 week
    minimumCacheTTL: 604800,
  },

  // HTTP response headers for static assets
  async headers() {
    return [
      // ── Next.js static files (_next/static) ──────────────────────────────
      // These are content-hashed → safe to cache indefinitely
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ── Public folder static assets ───────────────────────────────────────
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Enable experimental Partial Pre-rendering (PPR) if on Next.js 15
  // experimental: {
  //   ppr: true,
  // },
}

export default nextConfig
