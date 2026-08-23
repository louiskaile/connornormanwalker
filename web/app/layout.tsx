import type { Metadata } from "next";

import "./globals.scss";
import { IdleOverlay } from "@/app/components/idle-overlay/idle-overlay";
import { getHomeMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getHomeMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <IdleOverlay />
      </body>
    </html>
  );
}
