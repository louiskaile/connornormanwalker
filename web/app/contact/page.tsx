import {client} from '@/sanity/lib/client'
import {CONTACT_PAGE_QUERY} from '@/sanity/lib/queries'

type ContactDetail = {_key: string; label: string; url: string}
type ContactPage = {contactDetails?: ContactDetail[]}

const defaultContactDetails: ContactDetail[] = [
  {_key: 'email', label: 'hello@cnw.com', url: 'mailto:hello@cnw.com'},
  {_key: 'instagram', label: '@connornormanwalker', url: 'https://www.instagram.com/connornormanwalker/'},
  {_key: 'phone', label: '07894063222', url: 'tel:07894063222'},
]

export default async function ContactPage() {
  const contactPage = await client.fetch<ContactPage>(CONTACT_PAGE_QUERY).catch(() => null)
  const contactDetails = contactPage?.contactDetails?.length
    ? contactPage.contactDetails
    : defaultContactDetails

  return (
    <main className="contact-page">
      <a className="contact-menu-link" href="/">Menu</a>
      <section className="contact-details" aria-label="Contact details">
        {contactDetails.map((detail) => (
          <a className="baskervville-heading contact-detail" href={detail.url} key={detail._key}>
            {detail.label}
          </a>
        ))}
      </section>
    </main>
  )
}
