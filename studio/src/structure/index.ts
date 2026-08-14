import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem().title('Posts').child(S.documentTypeList('post').title('Posts')),
    ])
