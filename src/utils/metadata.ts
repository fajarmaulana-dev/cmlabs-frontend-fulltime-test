import type { Metadata } from 'next'

import { CLOUDINARY_BASE, SITE_URL } from '@/constants/env'

const SITE_NAME = 'TastiFy'
const DEFAULT_OG_IMAGE = `${CLOUDINARY_BASE}/ingredients_jdohzj.png`

export function buildMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
