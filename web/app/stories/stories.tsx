"use client";

import {
  type TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/stories.module.scss";
import type { JournalPostSummary } from "./stories.ts";

export function StoriesPage({
  embedded = false,
  posts,
}: {
  embedded?: boolean;
  posts: JournalPostSummary[];
}) {
  const listRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const wheelDistanceRef = useRef(0);
  const scrollLockedRef = useRef(false);
  const scrollUnlockTimerRef = useRef<number | null>(null);
  const hasMeasuredRef = useRef(false);
  const [itemStep, setItemStep] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [activeItemOffset, setActiveItemOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const featuredPostIndex = Math.max(
    0,
    posts.findIndex((post) => post.slug === "playing-beneath-fuji"),
  );
  const [activeIndex, setActiveIndex] = useState(
    posts.length * 3 + featuredPostIndex,
  );
  const repeatedPosts = Array.from({ length: 7 }, () => posts).flat();

  const moveTitles = useCallback((direction: number) => {
    if (scrollLockedRef.current) return;

    scrollLockedRef.current = true;
    setIsAnimating(true);
    setActiveIndex((currentIndex) => currentIndex + direction);
    navigator.vibrate?.(8);

    scrollUnlockTimerRef.current = window.setTimeout(() => {
      scrollLockedRef.current = false;
      wheelDistanceRef.current = 0;
    }, window.innerWidth <= 767 ? 60 : 90);
  }, []);

  useEffect(() => {
    let isDisposed = false;
    let firstRevealFrame = 0;
    let secondRevealFrame = 0;

    const measureList = () => {
      if (isDisposed) return;

      const list = listRef.current;
      const firstItem = list?.children.item(0) as HTMLElement | null;
      const secondItem = list?.children.item(1) as HTMLElement | null;
      const activeItem = list?.children.item(activeIndex) as HTMLElement | null;
      const measuredItemHeight =
        activeItem?.offsetHeight ?? firstItem?.offsetHeight ?? 0;
      const measuredItemStep =
        firstItem && secondItem
          ? secondItem.offsetTop - firstItem.offsetTop
          : 0;
      const measuredActiveItemOffset =
        activeItem?.offsetTop ?? activeIndex * measuredItemStep;
      const verticalInset = window.innerWidth <= 767 ? 104 : 128;
      const maximumWindowHeight = embedded
        ? (viewportRef.current?.clientHeight ?? window.innerHeight) - 64
        : window.innerHeight - verticalInset;
      // Leave one extra item-step of breathing room so the titles entering and
      // leaving the viewport are not cut off at the list window edges.
      const visibleTitleWindowHeight =
        measuredItemHeight + measuredItemStep * 5;

      if (measuredItemHeight) setItemHeight(measuredItemHeight);
      if (measuredItemStep) setItemStep(measuredItemStep);
      setActiveItemOffset(measuredActiveItemOffset);
      setViewportHeight(
        visibleTitleWindowHeight
          ? Math.min(maximumWindowHeight, visibleTitleWindowHeight)
          : maximumWindowHeight,
      );
    };

    const revealMeasuredList = () => {
      if (isDisposed || hasMeasuredRef.current) return;

      hasMeasuredRef.current = true;
      firstRevealFrame = requestAnimationFrame(() => {
        secondRevealFrame = requestAnimationFrame(() => {
          if (isDisposed) return;
          setHasEntered(true);
          setIsAnimating(true);
        });
      });
    };

    measureList();
    void document.fonts.ready.then(() => {
      measureList();
      revealMeasuredList();
    });
    window.addEventListener("resize", measureList);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(firstRevealFrame);
      cancelAnimationFrame(secondRevealFrame);
      window.removeEventListener("resize", measureList);
    };
  }, [activeIndex, embedded]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollLockedRef.current) return;

      wheelDistanceRef.current += event.deltaY;

      if (
        Math.abs(wheelDistanceRef.current) <
        (window.innerWidth <= 767 ? 20 : 28)
      )
        return;

      const direction = Math.sign(wheelDistanceRef.current);
      wheelDistanceRef.current = 0;
      moveTitles(direction);
    };

    const embeddedViewport = embedded ? viewportRef.current : null;
    if (embeddedViewport) {
      embeddedViewport.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    } else {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (embeddedViewport) {
        embeddedViewport.removeEventListener("wheel", handleWheel);
      } else {
        window.removeEventListener("wheel", handleWheel);
      }
      if (scrollUnlockTimerRef.current !== null) {
        window.clearTimeout(scrollUnlockTimerRef.current);
      }
    };
  }, [embedded, moveTitles]);

  useEffect(() => {
    const lowerLoopBoundary = posts.length;
    const upperLoopBoundary = posts.length * 6;

    if (activeIndex > lowerLoopBoundary && activeIndex < upperLoopBoundary)
      return;

    const resetTimer = window.setTimeout(() => {
      setIsAnimating(false);
      setActiveIndex((currentIndex) =>
        currentIndex <= lowerLoopBoundary
          ? currentIndex + posts.length * 3
          : currentIndex - posts.length * 3,
      );
    }, window.innerWidth <= 767 ? 380 : 530);

    return () => window.clearTimeout(resetTimer);
  }, [activeIndex, posts.length]);

  useEffect(() => {
    if (!hasEntered || isAnimating) return;

    const resumeTimer = window.setTimeout(() => setIsAnimating(true), 30);
    return () => window.clearTimeout(resumeTimer);
  }, [hasEntered, isAnimating]);

  const offset = viewportHeight / 2 - itemHeight / 2 - activeItemOffset;

  const handleTouchStart = (event: TouchEvent) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const startY = touchStartYRef.current;
    const endY = event.changedTouches[0]?.clientY;
    touchStartYRef.current = null;

    if (startY === null || endY === undefined || Math.abs(startY - endY) < 28)
      return;
    moveTitles(startY > endY ? 1 : -1);
  };

  const titleScroller = (
    <div
      className={[
        styles.scrollViewport,
        embedded && styles.embeddedViewport,
      ]
        .filter(Boolean)
        .join(" ")}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      ref={viewportRef}
    >
      {embedded ? (
        <h2 className="visually-hidden">More stories</h2>
      ) : (
        <h1 className="visually-hidden">Stories</h1>
      )}
      <div
        className={styles.listWindow}
        style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
      >
        <nav
          aria-label="Journal posts"
          className={[
            styles.list,
            styles.scrollList,
            embedded && styles.embeddedList,
            isAnimating && styles.spinning,
          ]
            .filter(Boolean)
            .join(" ")}
          ref={listRef}
          style={{
            transform: `translateY(calc(${offset}px + var(--journal-focus-lift)))`,
          }}
        >
          {repeatedPosts.map((post, index) => {
            const isActiveTitle = index === activeIndex;
            const titleClassName = [
              "baskervville-heading",
              styles.postLink,
              isActiveTitle && styles.activeTitle,
            ]
              .filter(Boolean)
              .join(" ");

            return isActiveTitle ? (
              <a
                aria-current={embedded ? undefined : "page"}
                className={titleClassName}
                href={`/stories/${post.slug}`}
                key={`${post._id}-${index}`}
              >
                {post.title}
              </a>
            ) : (
              <span
                aria-hidden="true"
                className={titleClassName}
                key={`${post._id}-${index}`}
              >
                {post.title}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );

  const rootClassName = [
    styles.scrollArea,
    embedded && styles.embeddedScrollArea,
    styles.enter,
    hasEntered && styles.entered,
  ]
    .filter(Boolean)
    .join(" ");

  if (embedded) {
    return <section className={rootClassName}>{titleScroller}</section>;
  }

  return (
    <main className={rootClassName}>
      {titleScroller}
      <SiteNavigation className={styles.siteNavigation} />
    </main>
  );
}
