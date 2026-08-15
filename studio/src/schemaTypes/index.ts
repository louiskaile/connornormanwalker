import {post} from './documents/post'
import {page} from './documents/page'
import {project} from './documents/project'
import {link} from './objects/link'
import {seo} from './objects/seo'
import {footer} from './singletons/footer'
import {contactPage} from './singletons/contactPage'
import {homePage} from './singletons/homePage'
import {navigation} from './singletons/navigation'
import {settings} from './singletons/settings'

export const schemaTypes = [
  homePage,
  contactPage,
  navigation,
  settings,
  footer,
  page,
  project,
  post,
  link,
  seo,
]
