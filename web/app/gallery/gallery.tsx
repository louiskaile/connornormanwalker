"use client";

import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/gallery.module.scss";
import { galleryColours, galleryItems, type GalleryItem } from "./gallery.ts";

type CardProps = {
  colour: string;
  entryIndex: number;
  item: GalleryItem;
  onHover: (title: string | null) => void;
  onSelect: (item: GalleryItem) => void;
};

function GalleryCard({
  colour,
  entryIndex,
  item,
  onHover,
  onSelect,
}: CardProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const ratioClassName = {
    landscape: styles.landscape,
    portrait: styles.portrait,
    square: styles.square,
  }[item.ratio];

  return (
    <article
      className={`${styles.item} ${ratioClassName}`}
      onClick={() => onSelect(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(item);
        }
      }}
      onPointerEnter={() => onHover(item.title)}
      onPointerLeave={() => onHover(null)}
      role="button"
      style={{ "--gallery-delay": `${entryIndex * 28}ms` } as CSSProperties}
      tabIndex={0}
    >
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

function GalleryLightbox({
  item,
  onClose,
  onNavigate,
}: {
  item: GalleryItem;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
}) {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const ratioClassName = {
    landscape: styles.lightboxLandscape,
    portrait: styles.lightboxPortrait,
    square: styles.lightboxSquare,
  }[item.ratio];
  const wheelLocked = useRef(false);
  const updateCursorPosition = (event: MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };
  const navigateWithWheel = (event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault();
    if (wheelLocked.current || Math.abs(event.deltaY) < 2) return;
    wheelLocked.current = true;
    onNavigate(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 420);
  };

  return (
    <section
      aria-label={`${item.title} preview`}
      className={styles.lightbox}
      onClick={onClose}
      onMouseEnter={updateCursorPosition}
      onMouseLeave={() => setCursorPosition(null)}
      onMouseMove={updateCursorPosition}
      onWheel={navigateWithWheel}
      role="dialog"
    >
      <div
        className={styles.lightboxSafeArea}
        onClick={(event) => event.stopPropagation()}
        onMouseEnter={() => setCursorPosition(null)}
      >
        <div
          className={`${styles.lightboxPanel} ${ratioClassName}`}
          key={item.id}
        />
      </div>
      {cursorPosition && (
        <span
          aria-hidden="true"
          className={styles.closeCursor}
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        >
          Close
        </span>
      )}
      <span className={styles.lightboxTitle}>{item.title}</span>
    </section>
  );
}

export default function GalleryPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem =
    selectedIndex === null ? null : galleryItems[selectedIndex] ?? null;
  const colourFor = (item: GalleryItem) =>
    galleryColours[(item.id - 1) % galleryColours.length];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHasEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedIndex]);

  return (
    <main className={styles.page}>
      <section
        aria-label="Gallery"
        className={[styles.grid, hasEntered && styles.entered]
          .filter(Boolean)
          .join(" ")}
      >
        <h1 className="visually-hidden">Gallery</h1>
        {galleryItems.map((item, index) => (
          <GalleryCard
            colour={colourFor(item)}
            entryIndex={index}
            item={item}
            key={item.id}
            onHover={setHoveredTitle}
            onSelect={(item) => setSelectedIndex(item.id - 1)}
          />
        ))}
      </section>
      <SiteNavigation
        brandLabel={hoveredTitle ?? undefined}
        className={styles.siteNavigation}
        showBrand={Boolean(hoveredTitle)}
      />
      {selectedItem && (
        <GalleryLightbox
          item={selectedItem}
          onClose={() => setSelectedIndex(null)}
          onNavigate={(direction) => {
            setSelectedIndex((currentIndex) => {
              if (currentIndex === null) return currentIndex;
              return Math.max(
                0,
                Math.min(galleryItems.length - 1, currentIndex + direction),
              );
            });
          }}
        />
      )}
    </main>
  );
}
