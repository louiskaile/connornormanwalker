import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'title',
      title: 'Search title',
      description: 'Aim for 50–60 characters. Falls back to the page title, then the site title.',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Search titles are usually truncated after 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      description: 'Aim for 120–160 characters.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Descriptions are usually truncated after 160 characters.'),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph image',
      description: 'Used when this page is shared. Recommended size: 1200 × 630 px.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Only set this when another URL should be treated as the original source.',
      type: 'url',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      description: 'Adds noindex and nofollow instructions to this page.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
