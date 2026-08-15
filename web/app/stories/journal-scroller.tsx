'use client'

import {useEffect, useRef, useState} from 'react'

type JournalPost = {_id: string; title: string; slug: string}

export function JournalScroller({posts}: {posts: JournalPost[]}) {
  const listRef = useRef<HTMLElement>(null)
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

      if (firstItem) setItemHeight(firstItem.offsetHeight)
      if (firstItem && secondItem) setItemStep(secondItem.offsetTop - firstItem.offsetTop)
      setViewportHeight(list?.parentElement?.clientHeight ?? window.innerHeight)
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
    const moveTitles = (event: WheelEvent) => {
      event.preventDefault()
      if (scrollLockedRef.current) return

      wheelDistanceRef.current += event.deltaY

      if (Math.abs(wheelDistanceRef.current) < 28) return

      const direction = Math.sign(wheelDistanceRef.current)
      wheelDistanceRef.current = 0
      scrollLockedRef.current = true
      setIsAnimating(true)
      setActiveIndex((currentIndex) => currentIndex + direction)
      navigator.vibrate?.(8)

      scrollUnlockTimerRef.current = window.setTimeout(() => {
        scrollLockedRef.current = false
        wheelDistanceRef.current = 0
      }, 90)
    }

    window.addEventListener('wheel', moveTitles, {passive: false})

    return () => {
      window.removeEventListener('wheel', moveTitles)
      if (scrollUnlockTimerRef.current !== null) {
        window.clearTimeout(scrollUnlockTimerRef.current)
      }
    }
  }, [])

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

  const offset = viewportHeight / 2 - itemHeight / 2 - itemStep / 2 - activeIndex * itemStep

  return (
    <main className={`journal-scroll-area journal-enter${hasEntered ? ' is-entered' : ''}`}>
      <div className="journal-scroll-viewport">
        <a className="journal-menu-link" href="/">Menu</a>
        <div className="journal-list-window">
          <nav
            aria-label="Journal posts"
            className={`journal-list journal-scroll-list${isAnimating ? ' is-spinning' : ''}`}
            ref={listRef}
            style={{transform: `translateY(${offset}px)`}}
          >
            {repeatedPosts.map((post, index) => (
              <a className="baskervville-heading journal-post-link" href={`/stories/${post.slug}`} key={`${post._id}-${index}`}>
                {post.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  )
}
