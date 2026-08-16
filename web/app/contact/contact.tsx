import {SiteHeader} from '@/app/components/site-header/site-header'
import {getContactDetails} from './contact.ts'
import './contact.scss'

export default async function ContactPage() {
  const contactDetails = await getContactDetails()
  return (
    <main className="contact-page">
      <SiteHeader tone="transparent" />
      <section aria-label="Contact details" className="contact-details">
        {contactDetails.map((detail) => (
          <a className="baskervville-heading contact-detail" href={detail.url} key={detail._key}>{detail.label}</a>
        ))}
      </section>
    </main>
  )
}
