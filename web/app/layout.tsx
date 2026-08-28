import type { Metadata } from "next";

import "./globals.scss";
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
      </body>
    </html>
  );
}
