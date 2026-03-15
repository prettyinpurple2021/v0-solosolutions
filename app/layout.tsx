import type { Metadata } from 'next'
import { Syne, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SoloSuccess Solutions — The Solo Entrepreneur Ecosystem',
  description: 'SoloSuccess Solutions is the parent company behind SoloSuccess AI, Academy, Content Factory, Connect, and SoloScribe — a family of brands built for the modern solo entrepreneur.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
