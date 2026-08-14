import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem().title('Posts').child(S.documentTypeList('post').title('Posts')),
      S.divider(),
      S.listItem()
        .title('Navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('General')
                .child(S.document().schemaType('settings').documentId('siteSettings')),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ]),
        ),
    ])
