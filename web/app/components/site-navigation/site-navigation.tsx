"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import styles from "@/app/components/styles/module/siteNavigation.module.scss";

type SiteNavigationProps = {
  brandLabel?: string;
  className?: string;
  showBrand?: boolean;
};

const navigationEntrance = {
  delay: 0.2,
  duration: 0.5,
  ease: "sine.out",
  y: 6,
} as const;

// This is the site's only global navigation. Its visual position is at the
// bottom of the viewport, but semantically it remains the primary navigation.
export function SiteNavigation({
  brandLabel,
  className = "",
  showBrand = true,
}: SiteNavigationProps) {
  return (
    <Suspense
      fallback={
        <SiteNavigationFallback
          brandLabel={brandLabel}
          className={className}
          showBrand={showBrand}
        />
      }
    >
      <SiteNavigationContent
        brandLabel={brandLabel}
        className={className}
        showBrand={showBrand}
      />
    </Suspense>
  );
}

function SiteNavigationFallback({
  brandLabel,
  className,
  showBrand,
}: Omit<SiteNavigationProps, "className" | "showBrand"> & {
  className: string;
  showBrand: boolean;
}) {
  return (
    <nav
      aria-label="Primary navigation"
      className={[styles.siteNavigation, className].filter(Boolean).join(" ")}
    >
      {showBrand && (
        <span className={styles.brand}>{brandLabel ?? "Connor Norman-Walker"}</span>
      )}
      <div className={styles.links}>
        <Link href="/gallery">Gallery</Link>
        <Link href="/about">About</Link>
        <Link href="/about?view=contact">Contact</Link>
      </div>
    </nav>
  );
}

function SiteNavigationContent({
  brandLabel,
  className,
  showBrand,
}: Omit<SiteNavigationProps, "className" | "showBrand"> & {
  className: string;
  showBrand: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showTokyo, setShowTokyo] = useState(false);
  const brandNameRef = useRef<HTMLSpanElement>(null);
  const brandTokyoRef = useRef<HTMLSpanElement>(null);
  const navLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const isContactView =
    pathname === "/contact" ||
    (pathname === "/about" && searchParams.get("view") === "contact");
  const currentPage = isContactView
    ? "contact"
    : pathname === "/about" || pathname === "/gallery"
      ? pathname.slice(1)
      : null;
  const navItems = useMemo(
    () =>
      [
        { href: "/gallery", label: "Gallery", page: "gallery" },
        { href: "/about", label: "About", page: "about" },
        {
          href: "/about?view=contact",
          label: "Contact",
          page: "contact",
        },
      ].map((item) =>
        item.page === currentPage
          ? { href: "/stories", label: "Stories", page: "stories" }
          : item,
      ),
    [currentPage],
  );

  useEffect(() => {
    const links = navLinkRefs.current.filter(
      (link): link is HTMLAnchorElement => link !== null,
    );

    gsap.killTweensOf(links);
    gsap.fromTo(
      links,
      { autoAlpha: 0, y: navigationEntrance.y },
      {
        autoAlpha: 1,
        delay: navigationEntrance.delay,
        duration: navigationEntrance.duration,
        ease: navigationEntrance.ease,
        stagger: 0.06,
        y: 0,
      },
    );

    return () => gsap.killTweensOf(links);
  }, [navItems]);

  useEffect(() => {
    if (!showBrand || brandLabel) return;

    const brandName = brandNameRef.current;
    const brandTokyo = brandTokyoRef.current;
    if (!brandName || !brandTokyo) return;

    const exitDuration = 0.22;
    const enterDuration = 0.33;
    const interval = 3;
    const holdDuration = interval - exitDuration - enterDuration;

    gsap.set(brandName, { autoAlpha: 0, y: navigationEntrance.y });
    gsap.set(brandTokyo, { autoAlpha: 0, y: navigationEntrance.y });
    setShowTokyo(false);

    const timeline = gsap.timeline({ repeat: -1 });

    timeline
      .to(brandName, {
        autoAlpha: 1,
        delay: navigationEntrance.delay,
        duration: navigationEntrance.duration,
        ease: navigationEntrance.ease,
        y: 0,
      })
      .to({}, { duration: interval })
      .to(brandName, {
        duration: exitDuration,
        ease: "sine.inOut",
        autoAlpha: 0,
        y: -6,
      })
      .to(brandTokyo, {
        duration: enterDuration,
        ease: "power2.out",
        autoAlpha: 1,
        y: 0,
      })
      .call(() => setShowTokyo(true))
      .to({}, { duration: holdDuration })
      .to(brandTokyo, {
        duration: exitDuration,
        ease: "sine.inOut",
        autoAlpha: 0,
        y: -6,
      })
      .to(brandName, {
        duration: enterDuration,
        ease: "power2.out",
        autoAlpha: 1,
        y: 0,
      })
      .call(() => setShowTokyo(false))
      .to({}, { duration: holdDuration });

    return () => {
      timeline.kill();
    };
  }, [brandLabel, navItems, showBrand]);

  return (
    <nav
      aria-label="Primary navigation"
      className={[styles.siteNavigation, className].filter(Boolean).join(" ")}
    >
      {showBrand && (
        <span className={styles.brand}>
          {brandLabel ? (
            brandLabel
          ) : (
            <>
              <span className="visually-hidden">
                {showTokyo ? "Tokyo" : "Connor Norman-Walker"}
              </span>
              <span
                aria-hidden="true"
                className={styles.brandName}
                ref={brandNameRef}
              >
                Connor Norman-Walker
              </span>
              <span
                aria-hidden="true"
                className={styles.brandTokyo}
                ref={brandTokyoRef}
              >
                Tokyo
              </span>
            </>
          )}
        </span>
      )}
      <div className={styles.links}>
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={item.href}
            ref={(element) => {
              navLinkRefs.current[index] = element;
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
