'use client'

import {useEffect, useState} from 'react'

export function JournalNavTitle({title}: {title: string}) {
  const [showContinueReading, setShowContinueReading] = useState(false)

  useEffect(() => {
    let animationFrame: number | undefined

    const updateTitle = () => {
      if (animationFrame !== undefined) return

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined
        const continueReadingHeading = document.getElementById('journal-related-heading')
        setShowContinueReading(Boolean(continueReadingHeading && continueReadingHeading.getBoundingClientRect().top <= 44))
      })
    }

    updateTitle()
    window.addEventListener('scroll', updateTitle, {passive: true})
    window.addEventListener('resize', updateTitle)

    return () => {
      window.removeEventListener('scroll', updateTitle)
      window.removeEventListener('resize', updateTitle)
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <h1
      aria-label={showContinueReading ? 'Continue Reading' : title}
      className={`journal-article-nav-title titles${showContinueReading ? ' is-continue-reading' : ''}`}
    >
      <span aria-hidden="true" className="journal-nav-label journal-nav-label--post">{title}</span>
      <span aria-hidden="true" className="journal-nav-label journal-nav-label--continue">Continue Reading</span>
    </h1>
  )
}
