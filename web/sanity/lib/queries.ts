import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt
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
