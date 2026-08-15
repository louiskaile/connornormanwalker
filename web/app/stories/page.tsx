import {client} from '@/sanity/lib/client'
import {JOURNAL_POSTS_QUERY} from '@/sanity/lib/queries'
import {JournalScroller} from './journal-scroller'

// Keep the journal index fresh when new posts are published in Sanity.
export const revalidate = 0

type JournalPost = {_id: string; title: string; slug: string}

export const defaultJournalPosts: JournalPost[] = [
  {_id: '18-holes-in-tokyo', title: '18 Holes In Tokyo', slug: '18-holes-in-tokyo'},
  {_id: 'after-the-round', title: 'After The Round', slug: 'after-the-round'},
  {_id: 'playing-beneath-fuji', title: 'Playing Beneath Fuji', slug: 'playing-beneath-fuji'},
  {_id: 'japan-one-round-at-a-time', title: 'Japan, One Round At A Time', slug: 'japan-one-round-at-a-time'},
  {_id: 'the-japanese-game', title: 'The Japanese Game', slug: 'the-japanese-game'},
]

export default async function JournalIndexPage() {
  const posts = await client.withConfig({useCdn: false}).fetch<JournalPost[]>(JOURNAL_POSTS_QUERY).catch(() => [])
  const journalPosts = posts.length ? posts : defaultJournalPosts

  return <JournalScroller posts={journalPosts} />
}
