'use client'

import {type TouchEvent, useCallback, useEffect, useRef, useState} from 'react'
import {SiteHeader} from '@/app/components/site-header/site-header'
import type {JournalPostSummary} from './stories.ts'
import './stories.scss'

export function StoriesPage({posts}: {posts: JournalPostSummary[]}) {
  const listRef = useRef<HTMLElement>(null)
  const touchStartYRef = useRef<number | null>(null)
  const wheelDistanceRef = useRef(0)
  const scrollLockedRef = useRef(false)
  const scrollUnlockTimerRef = useRef<number | null>(null)
  const [itemStep, setItemStep] = useState(0)
  const [itemHeight, setItemHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [hasEntered, setHasEntered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(posts.length * 3 + Math.floor(posts.length / 2))
  const repeatedPosts = Array.from({length: 7}, () => posts).flat()

  const moveTitles = useCallback((direction: number) => {
    if (scrollLockedRef.current) return

    scrollLockedRef.current = true
    setIsAnimating(true)
    setActiveIndex((currentIndex) => currentIndex + direction)
    navigator.vibrate?.(8)

    scrollUnlockTimerRef.current = window.setTimeout(() => {
      scrollLockedRef.current = false
      wheelDistanceRef.current = 0
    }, 90)
  }, [])

  useEffect(() => {
    let firstFrame = 0
    let secondFrame = 0

    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setHasEntered(true))
    })

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
    }
  }, [])

  useEffect(() => {
    let isDisposed = false

    const measureList = () => {
      if (isDisposed) return

      const list = listRef.current
      const firstItem = list?.children.item(0) as HTMLElement | null
      const secondItem = list?.children.item(1) as HTMLElement | null
      const measuredItemHeight = firstItem?.offsetHeight ?? 0
      const measuredItemStep = firstItem && secondItem
        ? secondItem.offsetTop - firstItem.offsetTop
        : 0
      const verticalInset = window.innerWidth <= 767 ? 104 : 128
      const maximumWindowHeight = window.innerHeight - verticalInset
      const fiveTitleWindowHeight = measuredItemHeight + measuredItemStep * 4

      if (measuredItemHeight) setItemHeight(measuredItemHeight)
      if (measuredItemStep) setItemStep(measuredItemStep)
      setViewportHeight(fiveTitleWindowHeight
        ? Math.min(maximumWindowHeight, fiveTitleWindowHeight)
        : maximumWindowHeight)
    }

    measureList()
    void document.fonts.ready.then(measureList)
    window.addEventListener('resize', measureList)

    return () => {
      isDisposed = true
      window.removeEventListener('resize', measureList)
    }
  }, [])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      if (scrollLockedRef.current) return

      wheelDistanceRef.current += event.deltaY

      if (Math.abs(wheelDistanceRef.current) < 28) return

      const direction = Math.sign(wheelDistanceRef.current)
      wheelDistanceRef.current = 0
      moveTitles(direction)
    }

    window.addEventListener('wheel', handleWheel, {passive: false})

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollUnlockTimerRef.current !== null) {
        window.clearTimeout(scrollUnlockTimerRef.current)
      }
    }
  }, [moveTitles])

  useEffect(() => {
    const lowerLoopBoundary = posts.length
    const upperLoopBoundary = posts.length * 6

    if (activeIndex > lowerLoopBoundary && activeIndex < upperLoopBoundary) return

    const resetTimer = window.setTimeout(() => {
      setIsAnimating(false)
      setActiveIndex((currentIndex) => currentIndex <= lowerLoopBoundary
        ? currentIndex + posts.length * 3
        : currentIndex - posts.length * 3)
    }, 530)

    return () => window.clearTimeout(resetTimer)
  }, [activeIndex, posts.length])

  useEffect(() => {
    if (isAnimating) return

    const resumeTimer = window.setTimeout(() => setIsAnimating(true), 30)
    return () => window.clearTimeout(resumeTimer)
  }, [isAnimating])

  const offset = viewportHeight / 2 - itemHeight / 2 - activeIndex * itemStep - 18

  const handleTouchStart = (event: TouchEvent) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null
  }

  const handleTouchEnd = (event: TouchEvent) => {
    const startY = touchStartYRef.current
    const endY = event.changedTouches[0]?.clientY
    touchStartYRef.current = null

    if (startY === null || endY === undefined || Math.abs(startY - endY) < 40) return
    moveTitles(startY > endY ? 1 : -1)
  }

  return (
    <main className={`journal-scroll-area journal-enter${hasEntered ? ' is-entered' : ''}`}>
      <SiteHeader tone="blue" />
      <div className="journal-scroll-viewport" onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
        <div className="journal-list-window" style={viewportHeight ? {height: `${viewportHeight}px`} : undefined}>
          <nav
            aria-label="Journal posts"
            className={`journal-list journal-scroll-list${isAnimating ? ' is-spinning' : ''}`}
            ref={listRef}
            style={{transform: `translateY(${offset}px)`}}
          >
            {repeatedPosts.map((post, index) => (
              <a
                className={`baskervville-heading journal-post-link${index === activeIndex ? ' is-active-title' : ''}`}
                href={`/stories/${post.slug}`}
                key={`${post._id}-${index}`}
              >
                {post.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  )
}
