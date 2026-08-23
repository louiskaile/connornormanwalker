import StoryPage from "./story.tsx";
import { getStoryStaticParams } from "./story.ts";

// Journal copy should reflect published Sanity edits immediately.
export const revalidate = 0;

export async function generateStaticParams() {
  return getStoryStaticParams();
}

export default StoryPage;
