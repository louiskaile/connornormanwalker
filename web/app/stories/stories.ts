import {client} from '@/sanity/lib/client'
import {JOURNAL_POSTS_QUERY} from '@/sanity/lib/queries'

export type JournalPostSummary = {_id: string; title: string; slug: string}

export const defaultJournalPosts: JournalPostSummary[] = [
  {_id: '18-holes-in-tokyo', title: '18 Holes In Tokyo', slug: '18-holes-in-tokyo'},
  {_id: 'after-the-round', title: 'After The Round', slug: 'after-the-round'},
  {_id: 'playing-beneath-fuji', title: 'Playing Beneath Fuji', slug: 'playing-beneath-fuji'},
  {_id: 'japan-one-round-at-a-time', title: 'Japan, One Round At A Time', slug: 'japan-one-round-at-a-time'},
  {_id: 'the-japanese-game', title: 'The Japanese Game', slug: 'the-japanese-game'},
]

export async function getJournalPosts() {
  const posts = await client.withConfig({useCdn: false}).fetch<JournalPostSummary[]>(JOURNAL_POSTS_QUERY).catch(() => [])
  return posts.length ? posts : defaultJournalPosts
}
