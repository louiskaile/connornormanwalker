import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/contact.module.scss";
import { getContactDetails } from "./contact.ts";

export default async function ContactPage() {
  const contactDetails = await getContactDetails();
  return (
    <main className={styles.page}>
      <section aria-label="Contact details" className={styles.details}>
        {contactDetails.map((detail) => (
          <a
            className={`baskervville-heading ${styles.detail}`}
            href={detail.url}
            key={detail._key}
          >
            {detail.label}
          </a>
        ))}
      </section>
      <SiteNavigation className={styles.siteNavigation} />
    </main>
  );
}
