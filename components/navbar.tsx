"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Our Companies", href: "#companies" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-card-deep chrome-edge" : "bg-transparent"
      }`}
    >
      {/* Animated iridescent hairline at the top */}
      <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe opacity-80" aria-hidden="true" />

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="SoloSuccess Solutions home">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-40 transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, #6B44A0, #005FA3, #009B94, #2D9E2A, #F5C400, #F07B1F, #D93025, #6B44A0)",
              }}
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
              alt="SoloSuccess Solutions logo"
              width={48}
              height={48}
              className="relative object-contain"
            />
          </div>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight chrome-iridescent">SoloSuccess</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] chrome-text">
              Solutions
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="link-rise text-sm font-semibold uppercase tracking-[0.16em] text-body transition-colors duration-500 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="#connect"
            className="btn-iridescent shimmer-sweep relative rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em]"
          >
            <span className="sweep" aria-hidden="true" />
            <span className="relative">Get in Touch</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-1 text-body transition-colors hover:text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-border px-6 pb-6 pt-3">
          <ul className="flex flex-col gap-4" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-semibold uppercase tracking-[0.16em] text-body py-1 transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#connect"
                className="btn-iridescent mt-2 block w-full rounded-xl px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.14em]"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
