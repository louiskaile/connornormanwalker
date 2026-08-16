'use client'

import {useEffect, useRef, useState} from 'react'

type FadeInImageProps = {
  alt: string
  className?: string
  src: string
}

export function FadeInImage({alt, className, src}: FadeInImageProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(Boolean(imageRef.current?.complete))
  }, [src])

  return (
    <span className="site-image-frame">
      <img
        alt={alt}
        className={`${className ?? ''} site-image${hasLoaded ? ' is-loaded' : ''}`}
        onLoad={() => setHasLoaded(true)}
        ref={imageRef}
        src={src}
      />
    </span>
  )
}
