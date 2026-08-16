import {client} from '@/sanity/lib/client'
import {urlForImage} from '@/sanity/lib/image'
import {ABOUT_PAGE_QUERY} from '@/sanity/lib/queries'

export type AboutImage = {asset?: {_ref?: string; _type?: 'reference'}; alt?: string}
type AboutPageData = {
  page?: {title?: string; intro?: string; image?: AboutImage}
  fallbackImage?: AboutImage
}

const defaultIntroduction = 'Earlier this summer, we travelled to northern Italy with Artisans of Devizes, one of our most trusted partners in stone. It was a trip built around knowledge, access, and craft: an opportunity to witness the journey of marble from mountain to slab, and to deepen our understanding of the material we so often specify in our projects. We began by the sea, in the quiet elegance of Forte dei Marmi, underfoot, the Apuan Alps rising behind the town—the source of Italy’s most iconic marble just out of sight. Our first evening, spent at the beachfront restaurant Maitò dal 1960, set the tone: local, unfussy, and quietly beautiful.'

export async function getAboutPage() {
  const data = await client.fetch<AboutPageData>(ABOUT_PAGE_QUERY).catch(() => null)
  const image = data?.page?.image?.asset ? data.page.image : data?.fallbackImage
  const imageUrl = image?.asset
    ? urlForImage(image as Parameters<typeof urlForImage>[0]).width(1800).auto('format').url()
    : undefined

  return {
    image,
    imageUrl,
    introduction: data?.page?.intro || defaultIntroduction,
    title: data?.page?.title || 'About',
  }
}

