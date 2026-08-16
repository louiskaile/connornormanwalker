import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt
  }
`)

export const JOURNAL_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current
  }
`)

export const JOURNAL_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    coverImage {
      asset,
      alt,
      caption
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        asset,
        alt,
        caption
      }
    },
    "slug": slug.current
  }
`)

export const RELATED_JOURNAL_POSTS_QUERY = defineQuery(`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...2] {
    _id,
    title,
    "slug": slug.current,
    coverImage {
      asset,
      alt,
      caption
    }
  }
`)

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation" && _id == "navigation"][0].items[]{
    _key,
    label,
    url
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    contactDetails[]{
      _key,
      label,
      url
    }
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(`
  {
    "page": *[_type == "page" && slug.current == "about"][0] {
      title,
      intro,
      "image": content[_type == "image"][0] {
        asset,
        alt
      }
    },
    "fallbackImage": *[_type == "post" && defined(coverImage.asset)][0].coverImage {
      asset,
      alt
    }
  }
`)

export const HOME_METADATA_QUERY = defineQuery(`
  {
    "settings": *[_type == "settings" && _id == "siteSettings"][0] {
      siteTitle,
      siteUrl,
      description,
      defaultSeo {
        title,
        description,
        canonicalUrl,
        keywords,
        noIndex,
        openGraphImage {asset, alt}
      }
    },
    "home": *[_type == "homePage" && _id == "homePage"][0] {
      heading,
      introduction,
      seo {
        title,
        description,
        canonicalUrl,
        keywords,
        noIndex,
        openGraphImage {asset, alt}
      }
    }
  }
`)
