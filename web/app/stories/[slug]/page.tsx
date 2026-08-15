import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'

import {client} from '@/sanity/lib/client'
import {urlForImage} from '@/sanity/lib/image'
import {JOURNAL_POST_QUERY, JOURNAL_POSTS_QUERY, RELATED_JOURNAL_POSTS_QUERY} from '@/sanity/lib/queries'
import {defaultJournalPosts} from '../page'
import {JournalNavTitle} from './journal-nav-title'

export const revalidate = 60

type JournalImage = {
  _key?: string
  _type?: 'image'
  asset?: {_ref?: string; _type?: 'reference'}
  alt?: string
  caption?: string
}

type JournalPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: JournalImage
  content?: Parameters<typeof PortableText>[0]['value']
}

type RelatedPost = Pick<JournalPost, '_id' | 'title' | 'slug' | 'coverImage'>

function JournalImageFigure({image, hero = false}: {image: JournalImage; hero?: boolean}) {
  if (!image?.asset) return null

  const src = urlForImage(image as Parameters<typeof urlForImage>[0])
    .width(hero ? 1800 : 1500)
    .auto('format')
    .url()

  return (
    <figure className={hero ? 'journal-hero' : 'journal-content-image'}>
      <img alt={image.alt || ''} src={src} />
      {image.caption && <figcaption className="journal-image-caption titles">{image.caption}</figcaption>}
    </figure>
  )
}

function RelatedPostCard({post, index}: {post: RelatedPost; index: number}) {
  const imageUrl = post.coverImage?.asset
    ? urlForImage(post.coverImage as Parameters<typeof urlForImage>[0]).width(1200).auto('format').url()
    : undefined

  return (
    <a className={`journal-related-card journal-related-card--${index + 1}`} href={`/stories/${post.slug}`}>
      <div className="journal-related-media">
        {imageUrl && <img alt={post.coverImage?.alt || ''} src={imageUrl} />}
      </div>
      <span className="journal-related-title titles">{post.title}</span>
    </a>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch<Array<{slug: string}>>(JOURNAL_POSTS_QUERY).catch(() => [])
  return (posts.length ? posts : defaultJournalPosts).map((post) => ({slug: post.slug}))
}

export default async function JournalPostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await client.fetch<JournalPost | null>(JOURNAL_POST_QUERY, {slug}).catch(() => null)
  const fetchedRelatedPosts = await client
    .fetch<RelatedPost[]>(RELATED_JOURNAL_POSTS_QUERY, {slug})
    .catch(() => [])
  const fallbackPost = defaultJournalPosts.find((entry) => entry.slug === slug)

  if (!post && !fallbackPost) notFound()

  const title = post?.title || fallbackPost!.title
  const content = Array.isArray(post?.content)
    ? post.content
    : post?.content
      ? [post.content]
      : []
  const heroImage = post?.coverImage?.asset ? post.coverImage : undefined
  const heroWithCaption = heroImage
    ? {...heroImage, caption: heroImage.caption || title.split(/\s+/).at(-1)}
    : undefined
  const bodyContent = content
  const components = {
    types: {
      image: ({value}: {value: JournalImage}) => <JournalImageFigure image={value} />,
    },
  }
  const relatedPosts = fetchedRelatedPosts.length
    ? fetchedRelatedPosts
    : defaultJournalPosts
      .filter((entry) => entry.slug !== slug)
      .slice(0, 2)

  return (
    <main className="journal-article-page">
      <header className="journal-article-header">
        <JournalNavTitle title={title} />
        <a className="journal-menu-link" href="/">Menu</a>
      </header>
      <article className="journal-article">
        {heroWithCaption && <JournalImageFigure hero image={heroWithCaption} />}
        {post?.excerpt && <p className="body-copy journal-article-excerpt">{post.excerpt}</p>}
        {bodyContent.length > 0 && (
          <div className="body-copy journal-article-content">
            <PortableText components={components} value={bodyContent} />
          </div>
        )}
        {relatedPosts.length > 0 && (
          <section aria-label="Continue reading" className="journal-related">
            <h2 className="journal-related-heading titles" id="journal-related-heading">Continue Reading</h2>
            <div className="journal-related-grid">
              {relatedPosts.map((relatedPost, index) => (
                <RelatedPostCard index={index} key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>
      <footer className="journal-footer">
        <nav aria-label="Footer navigation" className="journal-footer-links">
          <a href="/">Connor Norman-Walker</a>
          <a href="https://www.instagram.com/connornormanwalker/" rel="noreferrer" target="_blank">Instagram</a>
          <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
        </nav>
        <a className="journal-footer-credit" href="https://louiskaile.com" rel="noreferrer" target="_blank">Site by Louiskaile</a>
      </footer>
    </main>
  )
}
