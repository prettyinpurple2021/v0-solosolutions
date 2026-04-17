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

// Per-letter colors cycling through the full spectrum
const spectrumColors = ["#D93025", "#F07B1F", "#F5C400", "#2D9E2A", "#009B94", "#005FA3", "#6B44A0"]

function RainbowText({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} style={{ color: spectrumColors[i % spectrumColors.length] }}>
          {char}
        </span>
      ))}
    </>
  )
}

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "glass-card-deep border-b"
          : "bg-transparent"
      }`}
      style={scrolled ? { borderColor: "oklch(0.60 0.055 270 / 0.25)" } : {}}
    >
      {/* Rainbow top stripe — always visible */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="SoloSuccess Solutions home">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
            alt="SoloSuccess Solutions logo"
            width={64}
            height={64}
            className="object-contain"
          />
          <span className="hidden sm:block text-sm font-bold tracking-tight">
            <RainbowText text="SoloSuccess" />
            <span className="ml-1" style={{ color: "#9CA3AF" }}>Solutions</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold transition-colors duration-500 hover:opacity-80"
                style={{ color: spectrumColors[(i * 2) % spectrumColors.length] }}
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
            className="relative rounded-xl px-5 py-2 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
            style={{ background: "linear-gradient(135deg, #6B44A0, #005FA3)" }}
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden transition-colors p-1"
          style={{ color: "#F07B1F" }}
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
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-semibold py-1 transition-opacity hover:opacity-75"
                  style={{ color: spectrumColors[(i * 2) % spectrumColors.length] }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#connect"
                className="mt-2 block w-full rounded-xl px-5 py-2.5 text-center text-sm font-bold text-white rainbow-border"
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
