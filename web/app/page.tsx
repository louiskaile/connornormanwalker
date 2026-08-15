import {client} from '@/sanity/lib/client'
import {NAVIGATION_QUERY} from '@/sanity/lib/queries'
import {MenuNavigation} from './menu-navigation'

type NavigationItem = {_key: string; label: string; url: string}

const defaultItems: NavigationItem[] = [
  {_key: 'stories', label: 'Stories', url: '/stories'},
  {_key: 'gallery', label: 'Gallery', url: '/gallery'},
  {_key: 'about', label: 'About', url: '/about'},
  {_key: 'contact', label: 'Contact', url: '/contact'},
]

export default async function Home() {
  const items = await client.fetch<NavigationItem[]>(NAVIGATION_QUERY).catch(() => [])
  const menuItems = items?.length ? items : defaultItems

  return (
    <main className="menu-page">
      <MenuNavigation items={menuItems} />
    </main>
  )
}
