import {getNavigationItems} from './home.ts'
import {HomeNavigation} from './home-navigation'
import './home.scss'

export default async function HomePage() {
  return <main className="menu-page"><HomeNavigation items={await getNavigationItems()} /></main>
}
