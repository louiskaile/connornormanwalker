"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "@/app/components/styles/module/about.module.scss";

export function AboutEntrance({ children }: { children: ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHasEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={[styles.entrance, hasEntered && styles.entered]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
