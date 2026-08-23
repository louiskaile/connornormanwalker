import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({
      name: 'contactLinks',
      title: 'Contact links',
      type: 'array',
      of: [{type: 'link'}],
    }),
    defineField({name: 'newsletterHeading', title: 'Newsletter heading', type: 'string'}),
    defineField({
      name: 'newsletterFields',
      title: 'Newsletter field labels',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'creditHeading', title: 'Credit heading', type: 'string'}),
    defineField({name: 'creditLink', title: 'Credit link', type: 'link'}),
    defineField({name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}]}),
    defineField({name: 'seo', title: 'SEO and social sharing', type: 'seo'}),
  ],
})
