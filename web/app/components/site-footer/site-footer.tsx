import Link from 'next/link'

type SiteFooterProps = {className?: string}

export function SiteFooter({className = ''}: SiteFooterProps) {
  return (
    <footer className={`site-footer ${className}`.trim()}>
      <nav aria-label="Footer navigation" className="site-footer__links">
        <Link href="/">Connor Norman-Walker</Link>
        <a href="https://www.instagram.com/connornormanwalker/" rel="noreferrer" target="_blank">Instagram</a>
        <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
      </nav>
      <a className="site-footer__credit" href="https://louiskaile.com" rel="noreferrer" target="_blank">Site by Louiskaile</a>
    </footer>
  )
}

