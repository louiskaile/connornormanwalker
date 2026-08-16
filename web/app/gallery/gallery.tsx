'use client'

import {type CSSProperties, useState} from 'react'
import {SiteFooter} from '@/app/components/site-footer/site-footer'
import {SiteHeader} from '@/app/components/site-header/site-header'
import {galleryColours, galleryItems, galleryPairs, type GalleryItem} from './gallery.ts'
import './gallery.scss'

type CardProps = {
  colour: string
  item: GalleryItem
  onActivate: (title: string) => void
  shape?: 'portrait' | 'landscape'
  side?: 'left' | 'right'
}

function GalleryCard({colour, item, onActivate, shape, side}: CardProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const className = shape && side
    ? `gallery-pair-item gallery-pair-item--${shape} gallery-pair-item--${side}`
    : `gallery-item gallery-item--${item.ratio} gallery-item--${item.size ?? 'standard'}`

  return (
    <article
      className={className}
      onFocus={() => onActivate(item.title)}
      onMouseEnter={() => onActivate(item.title)}
      onTouchStart={() => onActivate(item.title)}
    >
      <div
        aria-label={item.title}
        className={`gallery-image-slot${hasLoaded ? ' is-loaded' : ''}`}
        role="img"
        style={{'--slot-color': colour} as CSSProperties}
      >
        {item.src && <img alt="" className="gallery-image" onLoad={() => setHasLoaded(true)} src={item.src} />}
      </div>
    </article>
  )
}

export default function GalleryPage() {
  const [activeTitle, setActiveTitle] = useState('')
  const [isPairView, setIsPairView] = useState(false)
  const [pairIndex, setPairIndex] = useState(0)
  const visiblePair = galleryPairs[pairIndex] ?? galleryPairs[0]
  const colourFor = (item: GalleryItem) => galleryColours[(item.id - 1) % galleryColours.length]

  const layoutToggle = (
    <button
      aria-label={isPairView ? 'Show gallery grid' : 'Show paired gallery'}
      aria-pressed={isPairView}
      className="gallery-layout-toggle"
      onClick={() => setIsPairView((current) => !current)}
      type="button"
    >
      <span>{isPairView ? 'II' : 'I'}</span>
      <span className="gallery-layout-copy--inactive">{isPairView ? 'I' : 'II'}</span>
    </button>
  )

  const headerTitle = isPairView && visiblePair ? (
    <>
      <span className="gallery-pair-nav-title gallery-pair-nav-title--left">{visiblePair[0].title}</span>
      <span className="gallery-pair-nav-title gallery-pair-nav-title--right">{visiblePair[1].title}</span>
    </>
  ) : <p aria-live="polite" className="site-header__page-title">{activeTitle}</p>

  return (
    <main className={`gallery-page${isPairView ? ' gallery-page--pairs' : ''}`}>
      <SiteHeader className="gallery-header" start={layoutToggle} title={headerTitle} tone="gallery" />
      {isPairView ? (
        <section
          aria-label="Paired gallery"
          className="gallery-pairs"
          onScroll={(event) => setPairIndex(Math.round(event.currentTarget.scrollTop / event.currentTarget.clientHeight))}
        >
          {galleryPairs.map(([portrait, landscape], index) => (
            <div className="gallery-pair" key={`${portrait.id}-${landscape.id}`}>
              <GalleryCard colour={colourFor(portrait)} item={portrait} onActivate={setActiveTitle} shape="portrait" side={index % 2 === 0 ? 'left' : 'right'} />
              <GalleryCard colour={colourFor(landscape)} item={landscape} onActivate={setActiveTitle} shape="landscape" side={index % 2 === 0 ? 'right' : 'left'} />
            </div>
          ))}
        </section>
      ) : (
        <section aria-label="Gallery" className="gallery-grid">
          {galleryItems.map((item) => <GalleryCard colour={colourFor(item)} item={item} key={item.id} onActivate={setActiveTitle} />)}
        </section>
      )}
      {!isPairView && <SiteFooter className="gallery-footer" />}
    </main>
  )
}
