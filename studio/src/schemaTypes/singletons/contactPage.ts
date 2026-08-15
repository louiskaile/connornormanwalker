import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  initialValue: {
    contactDetails: [
      {_key: 'email', label: 'hello@cnw.com', url: 'mailto:hello@cnw.com'},
      {_key: 'instagram', label: '@connornormanwalker', url: 'https://www.instagram.com/connornormanwalker/'},
      {_key: 'phone', label: '07894063222', url: 'tel:07894063222'},
    ],
  },
  fields: [
    defineField({
      name: 'contactDetails',
      title: 'Contact sections',
      description: 'Each section is shown as one large line on the contact page.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'contactDetail',
        title: 'Contact detail',
        fields: [
          defineField({name: 'label', title: 'Text', type: 'string', validation: (rule) => rule.required()}),
          defineField({name: 'url', title: 'Link URL', type: 'string', validation: (rule) => rule.required()}),
        ],
        preview: {select: {title: 'label', subtitle: 'url'}},
      }],
      validation: (rule) => rule.min(1),
    }),
  ],
})
