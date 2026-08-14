import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'introduction', title: 'Introduction', type: 'text', rows: 4}),
    defineField({name: 'featuredProjects', title: 'Featured projects', type: 'array', of: [{type: 'reference', to: [{type: 'project'}]}]}),
    defineField({name: 'seo', title: 'SEO and social sharing', type: 'seo'}),
  ],
})
