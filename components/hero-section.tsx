import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

const heroLetters = [
  { char: "S", color: "#D93025" },
  { char: "o", color: "#E04B1E" },
  { char: "l", color: "#F07B1F" },
  { char: "o", color: "#F5A623" },
  { char: "S", color: "#F5C400" },
  { char: "u", color: "#8FB800" },
  { char: "c", color: "#2D9E2A" },
  { char: "c", color: "#009B6E" },
  { char: "e", color: "#009B94" },
  { char: "s", color: "#0077BB" },
  { char: "s", color: "#005FA3" },
]

const heroStats = [
  { value: "5", label: "Brands" },
  { value: "1", label: "Vision" },
  { value: "∞", label: "Potential" },
]

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-label="Hero"
    >
      {/* Static rainbow color wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 260)" }} />
        <div className="absolute -top-96 -left-96 h-[1200px] w-[1200px] rounded-full blur-[220px]"
          style={{ background: "radial-gradient(circle, #6B44A080 0%, transparent 65%)" }} />
        <div className="absolute -bottom-96 -right-96 h-[1200px] w-[1200px] rounded-full blur-[220px]"
          style={{ background: "radial-gradient(circle, #005FA380 0%, transparent 65%)" }} />
        <div className="absolute top-1/4 -right-48 h-[900px] w-[900px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, #009B9460 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 -left-48 h-[800px] w-[800px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, #D9302560 0%, transparent 65%)" }} />
        <div className="absolute -top-48 right-1/4 h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, #F07B1F50 0%, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/3 h-[600px] w-[600px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, #2D9E2A50 0%, transparent 65%)" }} />
        <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, #F5C40040 0%, transparent 65%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto w-full">
        {/* Deep glass backdrop */}
        <div className="absolute inset-x-[-2rem] inset-y-[-3rem] rounded-3xl glass-card-deep glass-shimmer pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center gap-7 w-full">
          {/* Logo with glow ring */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-[60px] opacity-40"
              style={{ background: "radial-gradient(circle, #6B44A0 0%, #005FA3 50%, transparent 75%)" }}
              aria-hidden="true"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
              alt="SoloSuccess Solutions diamond logo"
              width={280}
              height={280}
              className="relative object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 glass-card"
            style={{ borderColor: "#F5C40055" }}
          >
            <Sparkles size={13} style={{ color: "#F5C400" }} aria-hidden="true" />
            <span className="font-display text-base font-semibold" style={{ color: "#F5C400" }}>
              Parent Company &amp; Holding Group
            </span>
            <Sparkles size={13} style={{ color: "#F5C400" }} aria-hidden="true" />
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-balance leading-none">
            {heroLetters.map((l, i) => (
              <span key={i} style={{ color: l.color }}>{l.char}</span>
            ))}
            <br />
            <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold" style={{ color: "#9CA3AF" }}>
              Solutions
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-balance" style={{ color: "#c4c8d4" }}>
            A family of{" "}
            <span className="font-bold rainbow-text">five purpose-built companies</span>
            {" "}for the modern solo entrepreneur — AI tools, education, content, community, and copywriting, all under one roof.
          </p>

          {/* Stats strip */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 py-3 px-8 rounded-2xl glass-card w-full max-w-sm">
            {heroStats.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="text-3xl font-extrabold rainbow-text">{s.value}</span>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6b7280" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#companies"
              className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
              style={{ background: "linear-gradient(135deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
            >
              Explore Our Companies
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-500 hover:opacity-80"
              style={{ color: "#9CA3AF", border: "2px solid #9CA3AF", background: "oklch(0.15 0.020 265 / 0.38)", backdropFilter: "blur(16px)" }}
            >
              Meet the Founder
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50" aria-hidden="true">
        <div className="h-10 w-[2px] rounded-full" style={{ background: "linear-gradient(to bottom, #6B44A0, #005FA3, transparent)" }} />
        <span className="font-display text-xs tracking-widest uppercase" style={{ color: "#9CA3AF" }}>scroll</span>
      </div>
    </section>
  )
}
