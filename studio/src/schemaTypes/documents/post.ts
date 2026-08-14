import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', initialValue: () => new Date().toISOString()}),
  ],
})
