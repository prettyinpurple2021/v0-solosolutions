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
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="SoloSuccess Solutions home">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finished%20solutions%20logo-El6oq26ejF7UHHNShHv1OEp3Gg4m4e.jpg"
            alt="SoloSuccess Solutions logo"
            width={40}
            height={40}
            className="rounded-md object-contain"
            style={{ background: "transparent" }}
          />
          <span className="hidden sm:block font-bold tracking-tight text-sm">
            <span style={{ color: "#D93025" }}>S</span>
            <span style={{ color: "#F07B1F" }}>o</span>
            <span style={{ color: "#F5C400" }}>l</span>
            <span style={{ color: "#2D9E2A" }}>o</span>
            <span style={{ color: "#009B94" }}>S</span>
            <span style={{ color: "#005FA3" }}>u</span>
            <span style={{ color: "#6B44A0" }}>c</span>
            <span style={{ color: "#D93025" }}>c</span>
            <span style={{ color: "#F07B1F" }}>e</span>
            <span style={{ color: "#F5C400" }}>s</span>
            <span style={{ color: "#2D9E2A" }}>s</span>
            <span className="text-foreground font-semibold"> Solutions</span>
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
        <div className="hidden md:flex items-center">
          <Link
            href="#connect"
            className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 glow-primary"
            style={{ background: "linear-gradient(135deg, #6B44A0, #005FA3)" }}
          >
            Get in Touch
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
                href="#connect"
                className="mt-2 block w-full rounded-lg px-5 py-2.5 text-center text-sm font-semibold text-white glow-primary"
                style={{ background: "linear-gradient(135deg, #6B44A0, #005FA3)" }}
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
