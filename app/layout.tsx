import type { Metadata } from 'next'
import { Henny_Penny, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const hennyPenny = Henny_Penny({
  subsets: ['latin'],
  variable: '--font-henny-penny',
  weight: '400',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'SoloSuccess Solutions — The Solo Entrepreneur Ecosystem',
  description: 'SoloSuccess Solutions is the parent company behind SoloSuccess AI, Academy, Content Factory, Connect, SoloScribe, and SoloDesign — a family of brands built for the modern solo entrepreneur.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${hennyPenny.variable} ${raleway.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Preload critical orb images for faster first paint */}
        <link rel="preload" href="/orb-core.jpg" as="image" />
        <link rel="preload" href="/orb-satellite.jpg" as="image" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
