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

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-label="Hero"
    >
      {/* Full-spectrum background orbs — every logo color */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 h-[800px] w-[800px] rounded-full opacity-20 blur-[150px]"
          style={{ background: "radial-gradient(circle, #6B44A0, transparent 65%)" }} />
        <div className="absolute -bottom-48 -right-40 h-[700px] w-[700px] rounded-full opacity-18 blur-[140px]"
          style={{ background: "radial-gradient(circle, #005FA3, transparent 65%)" }} />
        <div className="absolute top-1/4 right-1/3 h-[450px] w-[450px] rounded-full opacity-14 blur-[120px]"
          style={{ background: "radial-gradient(circle, #009B94, transparent 65%)" }} />
        <div className="absolute bottom-1/4 left-1/4 h-[350px] w-[350px] rounded-full opacity-12 blur-[100px]"
          style={{ background: "radial-gradient(circle, #D93025, transparent 65%)" }} />
        <div className="absolute top-2/3 left-2/3 h-[300px] w-[300px] rounded-full opacity-12 blur-[100px]"
          style={{ background: "radial-gradient(circle, #F07B1F, transparent 65%)" }} />
        <div className="absolute top-1/3 left-1/2 h-[250px] w-[250px] rounded-full opacity-10 blur-[90px]"
          style={{ background: "radial-gradient(circle, #2D9E2A, transparent 65%)" }} />
        <div className="absolute bottom-1/2 left-1/3 h-[250px] w-[250px] rounded-full opacity-10 blur-[90px]"
          style={{ background: "radial-gradient(circle, #F5C400, transparent 65%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finished%20solutions%20logo-El6oq26ejF7UHHNShHv1OEp3Gg4m4e.jpg"
            alt="SoloSuccess Solutions diamond logo"
            width={150}
            height={150}
            className="rounded-2xl object-contain rainbow-border"
            priority
          />
        </div>

        {/* Tagline badge — Caveat font */}
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

        {/* Sub-headline — rainbow gradient */}
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-balance" style={{ color: "#c4c8d4" }}>
          A family of{" "}
          <span className="font-bold rainbow-text">five purpose-built companies</span>
          {" "}for the modern solo entrepreneur — AI tools, education, content, community, and copywriting, all under one roof.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#companies"
            className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 rainbow-border"
            style={{ background: "linear-gradient(135deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
          >
            Explore Our Companies
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold glass-card transition-all duration-200 hover:border-white/20"
            style={{ color: "#9CA3AF" }}
          >
            Meet the Founder
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40" aria-hidden="true">
        <div className="h-8 w-px rounded-full" style={{ background: "linear-gradient(to bottom, #6B44A0, transparent)" }} />
        <span className="font-display text-xs" style={{ color: "#9CA3AF" }}>scroll</span>
      </div>
    </section>
  )
}
