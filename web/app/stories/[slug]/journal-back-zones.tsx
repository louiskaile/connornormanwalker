"use client";

import { useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import styles from "@/app/components/styles/module/story.module.scss";

export function JournalBackZones() {
  const router = useRouter();
  const navigationTimer = useRef<number | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let animationFrame: number | undefined;

    router.prefetch("/");

    const updateZones = () => {
      if (animationFrame !== undefined) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined;
        const relatedSection = document.querySelector<HTMLElement>(
          `.${styles.related}`,
        );
        setIsEnabled(
          !relatedSection ||
            relatedSection.getBoundingClientRect().top > window.innerHeight,
        );
      });
    };

    updateZones();
    window.addEventListener("scroll", updateZones, { passive: true });
    window.addEventListener("resize", updateZones);

    return () => {
      window.removeEventListener("scroll", updateZones);
      window.removeEventListener("resize", updateZones);
      if (animationFrame !== undefined)
        window.cancelAnimationFrame(animationFrame);
      if (navigationTimer.current !== undefined)
        window.clearTimeout(navigationTimer.current);
    };
  }, [router]);

  const returnToStories = () => {
    if (isLeaving) return;

    setIsLeaving(true);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    navigationTimer.current = window.setTimeout(
      () => router.push("/"),
      prefersReducedMotion ? 0 : 650,
    );
  };

  const zonesAreDisabled = !isEnabled || isLeaving;
  const updateCursorPosition = (event: MouseEvent<HTMLButtonElement>) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <button
        aria-label="Back to all stories"
        className={`${styles.backZone} ${styles.backZoneLeft}`}
        disabled={zonesAreDisabled}
        onMouseEnter={updateCursorPosition}
        onMouseLeave={() => setCursorPosition(null)}
        onMouseMove={updateCursorPosition}
        onClick={returnToStories}
        type="button"
      />
      <button
        aria-label="Back to all stories"
        className={`${styles.backZone} ${styles.backZoneRight}`}
        disabled={zonesAreDisabled}
        onMouseEnter={updateCursorPosition}
        onMouseLeave={() => setCursorPosition(null)}
        onMouseMove={updateCursorPosition}
        onClick={returnToStories}
        type="button"
      />
      {cursorPosition && (
        <span
          aria-hidden="true"
          className={styles.closeCursor}
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        >
          Close
        </span>
      )}
      <div
        aria-hidden="true"
        className={[styles.backTransition, isLeaving && styles.active]
          .filter(Boolean)
          .join(" ")}
      />
    </>
  );
}
