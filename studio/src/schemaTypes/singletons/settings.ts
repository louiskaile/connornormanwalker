import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site title', type: 'string'}),
    defineField({name: 'siteUrl', title: 'Production site URL', type: 'url'}),
    defineField({name: 'description', title: 'Site description', type: 'text', rows: 3}),
    defineField({name: 'defaultSeo', title: 'Default SEO and social sharing', type: 'seo'}),
  ],
})
