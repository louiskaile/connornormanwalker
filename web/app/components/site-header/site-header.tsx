import Link from 'next/link'
import type {ReactNode} from 'react'

type SiteHeaderProps = {
  className?: string
  start?: ReactNode
  title?: ReactNode
  tone?: 'blue' | 'gallery' | 'paper' | 'transparent'
}

export function SiteHeader({className = '', start, title, tone = 'paper'}: SiteHeaderProps) {
  return (
    <header className={`site-header site-header--${tone} ${className}`.trim()}>
      <div className="site-header__start">{start}</div>
      <div className="site-header__title">{title}</div>
      <Link aria-label="Back to menu" className="site-header__menu" href="/">Menu</Link>
    </header>
  )
}

