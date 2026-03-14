"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="SoloSuccess Solutions home">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground text-sm font-bold"
            style={{ background: "oklch(0.58 0.22 255)" }}
            aria-hidden="true"
          >
            S
          </span>
          <span className="font-bold text-foreground tracking-tight text-sm hidden sm:block">
            SoloSuccess<span style={{ color: "oklch(0.58 0.22 255)" }}> Solutions</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#ecosystem"
            className="rounded-lg px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 glow-blue"
            style={{ background: "oklch(0.58 0.22 255)" }}
          >
            Launch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-border px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#ecosystem"
                className="mt-2 block w-full rounded-lg px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground glow-blue"
                style={{ background: "oklch(0.58 0.22 255)" }}
                onClick={() => setMobileOpen(false)}
              >
                Launch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
