import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({name: 'text', title: 'Footer text', type: 'string'}),
    defineField({name: 'links', title: 'Links', type: 'array', of: [{type: 'link'}]}),
  ],
})
