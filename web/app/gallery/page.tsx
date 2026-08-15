'use client'

import {type CSSProperties, useState} from 'react'

type GalleryItem = {
  id: number
  title: string
  src?: string
  ratio: 'portrait' | 'landscape' | 'square'
  size?: 'wide' | 'standard' | 'narrow'
}

const baseGalleryItems: GalleryItem[] = [
  {id: 1, title: 'Untitled 01', ratio: 'portrait', size: 'narrow'},
  {id: 2, title: 'Untitled 02', ratio: 'portrait', size: 'narrow'},
  {id: 3, title: 'Untitled 03', ratio: 'portrait', size: 'narrow'},
  {id: 4, title: 'Untitled 04', ratio: 'portrait', size: 'narrow'},
  {id: 5, title: 'Untitled 05', ratio: 'portrait', size: 'narrow'},
  {id: 6, title: 'Untitled 06', ratio: 'landscape', size: 'standard'},
  {id: 7, title: 'Untitled 07', ratio: 'portrait', size: 'narrow'},
  {id: 8, title: 'Untitled 08', ratio: 'portrait', size: 'narrow'},
  {id: 9, title: 'Untitled 09', ratio: 'landscape', size: 'wide'},
  {id: 10, title: 'Untitled 10', ratio: 'portrait', size: 'narrow'},
  {id: 11, title: 'Untitled 11', ratio: 'landscape', size: 'standard'},
  {id: 12, title: 'Untitled 12', ratio: 'portrait', size: 'narrow'},
  {id: 13, title: 'Untitled 13', ratio: 'square', size: 'standard'},
  {id: 14, title: 'Untitled 14', ratio: 'landscape', size: 'wide'},
  {id: 15, title: 'Untitled 15', ratio: 'portrait', size: 'narrow'},
  {id: 16, title: 'Untitled 16', ratio: 'portrait', size: 'narrow'},
  {id: 17, title: 'Untitled 17', ratio: 'landscape', size: 'standard'},
  {id: 18, title: 'Untitled 18', ratio: 'portrait', size: 'narrow'},
  {id: 19, title: 'Untitled 19', ratio: 'landscape', size: 'wide'},
  {id: 20, title: 'Untitled 20', ratio: 'portrait', size: 'narrow'},
  {id: 21, title: 'Untitled 21', ratio: 'portrait', size: 'narrow'},
  {id: 22, title: 'Untitled 22', ratio: 'landscape', size: 'wide'},
  {id: 23, title: 'Untitled 23', ratio: 'portrait', size: 'narrow'},
  {id: 24, title: 'Untitled 24', ratio: 'portrait', size: 'narrow'},
  {id: 25, title: 'Untitled 25', ratio: 'square', size: 'standard'},
  {id: 26, title: 'Untitled 26', ratio: 'portrait', size: 'narrow'},
  {id: 27, title: 'Untitled 27', ratio: 'landscape', size: 'standard'},
  {id: 28, title: 'Untitled 28', ratio: 'portrait', size: 'narrow'},
  {id: 29, title: 'Untitled 29', ratio: 'landscape', size: 'wide'},
  {id: 30, title: 'Untitled 30', ratio: 'portrait', size: 'narrow'},
]

const galleryItems: GalleryItem[] = [
  ...baseGalleryItems,
  ...baseGalleryItems.map((item) => ({
    ...item,
    id: item.id + baseGalleryItems.length,
    title: `Untitled ${String(item.id + baseGalleryItems.length).padStart(2, '0')}`,
  })),
]

const galleryColours = [
  '#848383', '#0c7171', '#b1b1b1', '#444444', '#bf201f', '#452d28', '#888888', '#8f8f8f',
  '#dc1321', '#2d4739', '#08334c', '#04242c', '#5c2404', '#bcbcbc', '#5b3a5b', '#6c140e',
  '#2b2b4d', '#7a1111', '#7f7f7f', '#044464', '#713b0f', '#7e7e7e', '#8f8a7e', '#641412',
  '#fbe404', '#3b614d', '#524332', '#841218', '#7c7c7c', '#2d4739',
]

function GalleryCard({item, colour, onActivate}: {item: GalleryItem; colour: string; onActivate: (title: string) => void}) {
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <article
      className={`gallery-item gallery-item--${item.ratio} gallery-item--${item.size ?? 'standard'}`}
      onMouseEnter={() => onActivate(item.title)}
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

function GalleryPairCard({
  item,
  colour,
  shape,
  side,
  onActivate,
}: {
  item: GalleryItem
  colour: string
  shape: 'portrait' | 'landscape'
  side: 'left' | 'right'
  onActivate: (title: string) => void
}) {
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <article
      className={`gallery-pair-item gallery-pair-item--${shape} gallery-pair-item--${side}`}
      onMouseEnter={() => onActivate(item.title)}
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
  const galleryPairs = Array.from({length: galleryItems.length / 2}, (_, index) => (
    galleryItems.slice(index * 2, index * 2 + 2)
  ))
  const visiblePair = galleryPairs[pairIndex] ?? galleryPairs[0]

  return (
    <main className={`gallery-page${isPairView ? ' gallery-page--pairs' : ''}`}>
      <header className="gallery-header">
        <button
          aria-label={isPairView ? 'Show gallery grid' : 'Show paired gallery'}
          aria-pressed={isPairView}
          className="gallery-layout-toggle"
          onClick={() => setIsPairView((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" className="gallery-layout-copy titles">{isPairView ? 'II' : 'I'}</span>
          <span aria-hidden="true" className="gallery-layout-copy gallery-layout-copy--inactive titles">{isPairView ? 'I' : 'II'}</span>
        </button>
        <p className="gallery-title titles" aria-live="polite">{activeTitle}</p>
        {isPairView && visiblePair && (
          <>
            <span className="gallery-pair-nav-title gallery-pair-nav-title--left titles">{visiblePair[0].title}</span>
            <span className="gallery-pair-nav-title gallery-pair-nav-title--right titles">{visiblePair[1].title}</span>
          </>
        )}
        <a className="gallery-menu-link" href="/" aria-label="Back to menu">Menu</a>
      </header>

      {isPairView ? (
        <section
          aria-label="Paired gallery"
          className="gallery-pairs"
          onScroll={(event) => setPairIndex(Math.round(event.currentTarget.scrollTop / event.currentTarget.clientHeight))}
        >
          {galleryPairs.map(([portrait, landscape], index) => {
            const portraitSide = index % 2 === 0 ? 'left' : 'right'
            const landscapeSide = index % 2 === 0 ? 'right' : 'left'

            return (
              <div className="gallery-pair" key={`${portrait.id}-${landscape.id}`}>
                <GalleryPairCard
                  colour={galleryColours[(portrait.id - 1) % galleryColours.length]}
                  item={portrait}
                  onActivate={setActiveTitle}
                  shape="portrait"
                  side={portraitSide}
                />
                <GalleryPairCard
                  colour={galleryColours[(landscape.id - 1) % galleryColours.length]}
                  item={landscape}
                  onActivate={setActiveTitle}
                  shape="landscape"
                  side={landscapeSide}
                />
              </div>
            )
          })}
        </section>
      ) : (
        <section className="gallery-grid" aria-label="Gallery">
          {galleryItems.map((item) => (
            <GalleryCard
              key={item.id}
              colour={galleryColours[(item.id - 1) % galleryColours.length]}
              item={item}
              onActivate={setActiveTitle}
            />
          ))}
        </section>
      )}
      {!isPairView && (
        <footer className="gallery-footer journal-footer">
          <nav aria-label="Footer navigation" className="journal-footer-links">
            <a href="/">Connor Norman-Walker</a>
            <a href="https://www.instagram.com/connornormanwalker/" rel="noreferrer" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
          </nav>
          <a className="journal-footer-credit" href="https://louiskaile.com" rel="noreferrer" target="_blank">Site by Louiskaile</a>
        </footer>
      )}
    </main>
  )
}
