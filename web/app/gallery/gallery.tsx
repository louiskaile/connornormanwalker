"use client";

import { type CSSProperties, useState } from "react";
import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/gallery.module.scss";
import { galleryColours, galleryItems, type GalleryItem } from "./gallery.ts";

type CardProps = {
  colour: string;
  item: GalleryItem;
};

function GalleryCard({ colour, item }: CardProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const ratioClassName = {
    landscape: styles.landscape,
    portrait: styles.portrait,
    square: styles.square,
  }[item.ratio];

  return (
    <article className={`${styles.item} ${ratioClassName}`}>
      <div
        aria-label={item.title}
        className={[styles.imageSlot, hasLoaded && styles.loaded]
          .filter(Boolean)
          .join(" ")}
        role="img"
        style={{ "--slot-color": colour } as CSSProperties}
      >
        {item.src && (
          <img
            alt=""
            className={styles.image}
            onLoad={() => setHasLoaded(true)}
            src={item.src}
          />
        )}
      </div>
    </article>
  );
}

export default function GalleryPage() {
  const colourFor = (item: GalleryItem) =>
    galleryColours[(item.id - 1) % galleryColours.length];

  return (
    <main className={styles.page}>
      <section aria-label="Gallery" className={styles.grid}>
        <h1 className="visually-hidden">Gallery</h1>
        {galleryItems.map((item) => (
          <GalleryCard colour={colourFor(item)} item={item} key={item.id} />
        ))}
      </section>
      <SiteNavigation className={styles.siteNavigation} />
    </main>
  );
}
