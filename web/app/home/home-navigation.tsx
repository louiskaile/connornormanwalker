'use client'

import {useEffect, useState} from 'react'
import type {NavigationItem} from './home.ts'

export function HomeNavigation({items}: {items: NavigationItem[]}) {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    let firstFrame = 0
    let secondFrame = 0
    const playReveal = () => {
      setIsRevealed(false)
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setIsRevealed(true))
      })
    }

    playReveal()
    window.addEventListener('pageshow', playReveal)
    return () => {
      window.removeEventListener('pageshow', playReveal)
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
    }
  }, [])

  return (
    <nav aria-label="Main navigation" className={`navigation menu-reveal${isRevealed ? ' is-revealed' : ''}`}>
      <ul>{items.map((item) => <li key={item._key}><a href={item.url}>{item.label}</a></li>)}</ul>
    </nav>
  )
}
