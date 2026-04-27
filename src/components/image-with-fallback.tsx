'use client'

import { ChefHat } from 'lucide-react'
import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

import { IMAGE_FALLBACK } from '@/constants/ui'
import { cn } from '@/utils/cn'

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
  containerClassName?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = IMAGE_FALLBACK,
  containerClassName,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const isPreload = props.preload === true
  return (
    <div className={cn('relative overflow-hidden bg-orange-50', containerClassName)}>
      {!loaded && !error && <div className="absolute inset-0 animate-pulse bg-orange-100" />}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-orange-300">
          <ChefHat size={32} />
          <span className="text-xs">{alt}</span>
        </div>
      )}
      <Image
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isPreload || (loaded && !error) ? 'opacity-100' : 'opacity-0',
          className,
        )}
        src={imgSrc}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc)
          } else {
            setError(true)
          }
        }}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  )
}
