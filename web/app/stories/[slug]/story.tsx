import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { FadeInImage } from "@/app/components/fade-in-image/fade-in-image";
import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/story.module.scss";
import { urlForImage } from "@/sanity/lib/image";
import { JournalBackZones } from "./journal-back-zones";
import { getStory, type JournalImage } from "./story.ts";
import { StoriesPage } from "../stories.tsx";
import { getJournalPosts } from "../stories.ts";

function JournalImageFigure({
  image,
  hero = false,
}: {
  image: JournalImage;
  hero?: boolean;
}) {
  if (!image.asset) return null;
  const src = urlForImage(image as Parameters<typeof urlForImage>[0])
    .width(hero ? 1800 : 1500)
    .auto("format")
    .url();

  return (
    <figure className={hero ? styles.hero : styles.contentImage}>
      <FadeInImage alt={image.alt || ""} src={src} />
      {image.caption && (
        <figcaption className={`titles ${styles.imageCaption}`}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [story, posts] = await Promise.all([
    getStory(slug),
    getJournalPosts(),
  ]);
  if (!story) notFound();

  const components = {
    types: {
      image: ({ value }: { value: JournalImage }) => (
        <JournalImageFigure image={value} />
      ),
    },
  };

  return (
    <main className={styles.page}>
      <JournalBackZones />
      <article className={styles.article}>
        <header className={styles.intro}>
          <h1 className={styles.articleTitle}>{story.title}</h1>
          {story.excerpt && (
            <p className={styles.articleExcerpt}>{story.excerpt}</p>
          )}
        </header>
        {story.heroImage && <JournalImageFigure hero image={story.heroImage} />}
        {story.content.length > 0 && (
          <div className={`body-copy ${styles.articleContent}`}>
            <PortableText components={components} value={story.content} />
          </div>
        )}
        <Link className={styles.moreStories} href="/stories">
          More Stories
        </Link>
        <StoriesPage embedded posts={posts} />
      </article>
      <SiteNavigation className={styles.navigation} showBrand={false} />
    </main>
  );
}
