import {FadeInImage} from '@/app/components/fade-in-image/fade-in-image'
import {SiteFooter} from '@/app/components/site-footer/site-footer'
import {SiteHeader} from '@/app/components/site-header/site-header'
import {getAboutPage} from './about.ts'
import './about.scss'

export default async function AboutPage() {
  const {image, imageUrl, introduction, title} = await getAboutPage()

  return (
    <main className="about-page">
      <SiteHeader title={<p className="site-header__page-title">{title}</p>} />
      <section aria-labelledby="about-heading" className="about-panel about-intro-panel">
        <h1 className="visually-hidden" id="about-heading">{title}</h1>
        <p className="about-introduction">{introduction}</p>
      </section>
      <section aria-label="About image" className="about-panel about-image-panel">
        <div className="about-image-frame">
          {imageUrl
            ? <FadeInImage alt={image?.alt || ''} src={imageUrl} />
            : <div aria-label="About image placeholder" className="about-image-placeholder" role="img" />}
        </div>
        <SiteFooter className="about-footer" />
      </section>
    </main>
  )
}
