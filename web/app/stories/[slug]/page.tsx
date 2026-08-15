import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'

import {client} from '@/sanity/lib/client'
import {JOURNAL_POST_QUERY, JOURNAL_POSTS_QUERY} from '@/sanity/lib/queries'
import {defaultJournalPosts} from '../page'

type JournalPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content?: Parameters<typeof PortableText>[0]['value']
}

export async function generateStaticParams() {
  const posts = await client.fetch<Array<{slug: string}>>(JOURNAL_POSTS_QUERY).catch(() => [])
  return (posts.length ? posts : defaultJournalPosts).map((post) => ({slug: post.slug}))
}

export default async function JournalPostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await client.fetch<JournalPost | null>(JOURNAL_POST_QUERY, {slug}).catch(() => null)
  const fallbackPost = defaultJournalPosts.find((entry) => entry.slug === slug)

  if (!post && !fallbackPost) notFound()

  const title = post?.title || fallbackPost!.title

  return (
    <main className="journal-article-page">
      <a className="journal-menu-link" href="/">Menu</a>
      <article className="journal-article">
        <h1 className="baskervville-heading journal-article-title">{title}</h1>
        {post?.excerpt && <p className="journal-article-excerpt">{post.excerpt}</p>}
        {post?.content && <div className="journal-article-content"><PortableText value={post.content} /></div>}
      </article>
    </main>
  )
}
