"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/app/components/styles/module/idleOverlay.module.scss";

const IDLE_DELAY = 5_000;

export function IdleOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let idleTimer: number | undefined;

    const resetIdleTimer = () => {
      setIsVisible(false);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIsVisible(true), IDLE_DELAY);
    };

    const events: Array<keyof WindowEventMap> = [
      "keydown",
      "pointerdown",
      "pointermove",
      "scroll",
      "touchstart",
      "wheel",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetIdleTimer, { passive: true }),
    );
    resetIdleTimer();

    return () => {
      window.clearTimeout(idleTimer);
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={[styles.overlay, isVisible && styles.visible]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        alt=""
        className={styles.mark}
        height={1071}
        priority
        src="/images/idle-golf-bag.png"
        width={1469}
      />
    </div>
  );
}
