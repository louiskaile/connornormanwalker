import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'
import {FadeInImage} from '@/app/components/fade-in-image/fade-in-image'
import {SiteFooter} from '@/app/components/site-footer/site-footer'
import {SiteHeader} from '@/app/components/site-header/site-header'
import {urlForImage} from '@/sanity/lib/image'
import {JournalBackZones} from './journal-back-zones'
import {JournalNavTitle} from './journal-nav-title'
import {getStory, type JournalImage, type RelatedPost} from './story.ts'
import './story.scss'

function JournalImageFigure({image, hero = false}: {image: JournalImage; hero?: boolean}) {
  if (!image.asset) return null
  const src = urlForImage(image as Parameters<typeof urlForImage>[0]).width(hero ? 1800 : 1500).auto('format').url()

  return (
    <figure className={hero ? 'journal-hero' : 'journal-content-image'}>
      <FadeInImage alt={image.alt || ''} src={src} />
      {image.caption && <figcaption className="journal-image-caption titles">{image.caption}</figcaption>}
    </figure>
  )
}

function RelatedPostCard({index, post}: {index: number; post: RelatedPost}) {
  const imageUrl = post.coverImage?.asset
    ? urlForImage(post.coverImage as Parameters<typeof urlForImage>[0]).width(1200).auto('format').url()
    : undefined

  return (
    <a className={`journal-related-card journal-related-card--${index + 1}`} href={`/stories/${post.slug}`}>
      <div className="journal-related-media">{imageUrl && <FadeInImage alt={post.coverImage?.alt || ''} src={imageUrl} />}</div>
      <span className="journal-related-title titles">{post.title}</span>
    </a>
  )
}

export default async function StoryPage({params}: {params: Promise<{slug: string}>}) {
  const story = await getStory((await params).slug)
  if (!story) notFound()

  const components = {types: {image: ({value}: {value: JournalImage}) => <JournalImageFigure image={value} />}}

  return (
    <main className="journal-article-page">
      <JournalBackZones />
      <SiteHeader title={<JournalNavTitle title={story.title} />} />
      <article className="journal-article">
        {story.heroImage && <JournalImageFigure hero image={story.heroImage} />}
        {story.excerpt && <p className="body-copy journal-article-excerpt">{story.excerpt}</p>}
        {story.content.length > 0 && <div className="body-copy journal-article-content"><PortableText components={components} value={story.content} /></div>}
        {story.relatedPosts.length > 0 && (
          <section aria-label="Continue reading" className="journal-related">
            <h2 className="journal-related-heading titles" id="journal-related-heading">Continue Reading</h2>
            <div className="journal-related-grid">
              {story.relatedPosts.map((post, index) => <RelatedPostCard index={index} key={post._id} post={post} />)}
            </div>
          </section>
        )}
      </article>
      <SiteFooter />
    </main>
  )
}
