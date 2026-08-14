import type {Metadata} from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Connor Norman Walker',
  description: 'A Next.js site powered by Sanity',
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>
}
