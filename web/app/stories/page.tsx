import {getJournalPosts} from './stories.ts'
import {StoriesPage} from './stories.tsx'

// Keep the journal index fresh when new posts are published in Sanity.
export const revalidate = 0

export default async function JournalIndexPage() {
  return <StoriesPage posts={await getJournalPosts()} />
}
