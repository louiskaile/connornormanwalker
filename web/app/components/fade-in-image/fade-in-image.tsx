"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/components/styles/module/fadeInImage.module.scss";

type FadeInImageProps = {
  alt: string;
  className?: string;
  src: string;
};

export function FadeInImage({ alt, className, src }: FadeInImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(Boolean(imageRef.current?.complete));
  }, [src]);

  return (
    <span className={styles.frame}>
      <img
        alt={alt}
        className={[className, styles.image, hasLoaded && styles.loaded]
          .filter(Boolean)
          .join(" ")}
        onLoad={() => setHasLoaded(true)}
        ref={imageRef}
        src={src}
      />
    </span>
  );
}
