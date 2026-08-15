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
    content,
    "slug": slug.current
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
