import type {Metadata} from 'next'

import {client} from './client'
import {urlForImage} from './image'
import {HOME_METADATA_QUERY} from './queries'

type SanityImage = {
  asset?: {_ref?: string; _type?: string}
  alt?: string
}

type Seo = {
  title?: string
  description?: string
  canonicalUrl?: string
  keywords?: string[]
  noIndex?: boolean
  openGraphImage?: SanityImage
}

type MetadataData = {
  settings?: {
    siteTitle?: string
    siteUrl?: string
    description?: string
    defaultSeo?: Seo
  }
  home?: {
    heading?: string
    introduction?: string
    seo?: Seo
  }
}

const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://connornormanwalker.netlify.app'

export async function getHomeMetadata(): Promise<Metadata> {
  const data = await client.fetch<MetadataData>(HOME_METADATA_QUERY, {}, {stega: false})
  const defaults = data.settings?.defaultSeo
  const seo = data.home?.seo
  const siteName = data.settings?.siteTitle || 'Connor Norman Walker'
  const title = seo?.title || data.home?.heading || defaults?.title || siteName
  const description = seo?.description || data.home?.introduction || defaults?.description || data.settings?.description
  const siteUrl = data.settings?.siteUrl || fallbackSiteUrl
  const image = seo?.openGraphImage?.asset ? seo.openGraphImage : defaults?.openGraphImage
  const imageUrl = image?.asset ? urlForImage(image).width(1200).height(630).fit('crop').url() : undefined
  const noIndex = seo?.noIndex ?? defaults?.noIndex ?? false

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: seo?.keywords || defaults?.keywords,
    alternates: {canonical: seo?.canonicalUrl || '/'},
    robots: {index: !noIndex, follow: !noIndex},
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: seo?.canonicalUrl || '/',
      images: imageUrl ? [{url: imageUrl, width: 1200, height: 630, alt: image?.alt || title}] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}
