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
    qualities: [60, 75],
  },
  cacheComponents: true,

  // HTTP response headers for static assets
  async headers() {
    return [
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
}

export default nextConfig
