import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  initialValue: {
    items: [
      {_key: 'stories', label: 'Stories', url: '/stories'},
      {_key: 'gallery', label: 'Gallery', url: '/gallery'},
      {_key: 'about', label: 'About', url: '/about'},
      {_key: 'contact', label: 'Contact', url: '/contact'},
    ],
  },
  fields: [
    defineField({
      name: 'items',
      title: 'Landing menu links',
      type: 'array',
      of: [{type: 'link'}],
      validation: (rule) => rule.min(1),
    }),
  ],
})
