import StoryPage from './story.tsx'
import {getStoryStaticParams} from './story.ts'

export const revalidate = 60

export async function generateStaticParams() {
  return getStoryStaticParams()
}

export default StoryPage
