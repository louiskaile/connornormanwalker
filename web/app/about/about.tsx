import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/about.module.scss";
import { getAboutPage } from "./about.ts";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const {
    contactLinks,
    creditHeading,
    creditLink,
    introduction,
    newsletterFields,
    newsletterHeading,
    title,
  } = await getAboutPage();
  const isContactView = (await searchParams).view === "contact";

  return (
    <main
      className={[styles.page, isContactView && styles.contactView]
        .filter(Boolean)
        .join(" ")}
    >
      <article className={styles.article}>
        <header className={`${styles.contentBlock} ${styles.introBlock}`}>
          <h1 className="visually-hidden" id="about-heading">
            {title}
          </h1>
          <p className={styles.introduction}>{introduction}</p>
        </header>
        <section aria-label="Contact details" className={styles.contentBlock}>
          <div className={styles.contactLinks}>
            {contactLinks.map((link) => (
              <a href={link.url} key={link._key || link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="newsletter-heading"
          className={`${styles.contentBlock} ${styles.newsletterBlock}`}
        >
          <h2 id="newsletter-heading">{newsletterHeading}</h2>
          <div aria-hidden="true" className={styles.newsletterFields}>
            {newsletterFields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>
        </section>
        <footer className={`${styles.contentBlock} ${styles.creditBlock}`}>
          <p>{creditHeading}</p>
          <a href={creditLink.url}>{creditLink.label}</a>
        </footer>
      </article>
      <SiteNavigation className={styles.siteNavigation} showBrand={false} />
    </main>
  );
}
