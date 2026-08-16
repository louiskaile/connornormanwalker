import type {PortableText} from 'next-sanity'
import {client} from '@/sanity/lib/client'
import {JOURNAL_POST_QUERY, JOURNAL_POSTS_QUERY, RELATED_JOURNAL_POSTS_QUERY} from '@/sanity/lib/queries'
import {defaultJournalPosts} from '../stories.ts'

export type JournalImage = {
  _key?: string
  _type?: 'image'
  asset?: {_ref?: string; _type?: 'reference'}
  alt?: string
  caption?: string
}

export type JournalPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: JournalImage
  content?: Parameters<typeof PortableText>[0]['value']
}

export type RelatedPost = Pick<JournalPost, '_id' | 'title' | 'slug' | 'coverImage'>

export async function getStoryStaticParams() {
  const posts = await client.fetch<Array<{slug: string}>>(JOURNAL_POSTS_QUERY).catch(() => [])
  return (posts.length ? posts : defaultJournalPosts).map(({slug}) => ({slug}))
}

export async function getStory(slug: string) {
  const [post, fetchedRelatedPosts] = await Promise.all([
    client.fetch<JournalPost | null>(JOURNAL_POST_QUERY, {slug}).catch(() => null),
    client.fetch<RelatedPost[]>(RELATED_JOURNAL_POSTS_QUERY, {slug}).catch(() => []),
  ])
  const fallbackPost = defaultJournalPosts.find((entry) => entry.slug === slug)
  if (!post && !fallbackPost) return null

  const title = post?.title || fallbackPost!.title
  const content = Array.isArray(post?.content) ? post.content : post?.content ? [post.content] : []
  const heroImage = post?.coverImage?.asset ? post.coverImage : undefined

  return {
    content,
    excerpt: post?.excerpt,
    heroImage: heroImage ? {...heroImage, caption: heroImage.caption || title.split(/\s+/).at(-1)} : undefined,
    relatedPosts: fetchedRelatedPosts.length
      ? fetchedRelatedPosts
      : defaultJournalPosts.filter((entry) => entry.slug !== slug).slice(0, 2),
    title,
  }
}
