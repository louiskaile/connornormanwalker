'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

export function JournalBackZones() {
  const router = useRouter()
  const navigationTimer = useRef<number | undefined>(undefined)
  const [isEnabled, setIsEnabled] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    let animationFrame: number | undefined

    router.prefetch('/stories')

    const updateZones = () => {
      if (animationFrame !== undefined) return

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined
        const relatedSection = document.querySelector<HTMLElement>('.journal-related')
        setIsEnabled(!relatedSection || relatedSection.getBoundingClientRect().top > window.innerHeight)
      })
    }

    updateZones()
    window.addEventListener('scroll', updateZones, {passive: true})
    window.addEventListener('resize', updateZones)

    return () => {
      window.removeEventListener('scroll', updateZones)
      window.removeEventListener('resize', updateZones)
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
      if (navigationTimer.current !== undefined) window.clearTimeout(navigationTimer.current)
    }
  }, [router])

  const returnToStories = () => {
    if (isLeaving) return

    setIsLeaving(true)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    navigationTimer.current = window.setTimeout(() => router.push('/stories'), prefersReducedMotion ? 0 : 650)
  }

  const zonesAreDisabled = !isEnabled || isLeaving

  return (
    <>
      <button
        aria-label="Back to all stories"
        className="journal-back-zone journal-back-zone--left"
        disabled={zonesAreDisabled}
        onClick={returnToStories}
        type="button"
      />
      <button
        aria-label="Back to all stories"
        className="journal-back-zone journal-back-zone--right"
        disabled={zonesAreDisabled}
        onClick={returnToStories}
        type="button"
      />
      <div aria-hidden="true" className={`journal-back-transition${isLeaving ? ' is-active' : ''}`} />
    </>
  )
}
