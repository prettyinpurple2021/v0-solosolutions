import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-label="Hero"
    >
      {/* Background spectrum orbs — pulled from logo colors */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full opacity-20 blur-[140px]"
          style={{ background: "radial-gradient(circle, #6B44A0, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-32 h-[600px] w-[600px] rounded-full opacity-15 blur-[130px]"
          style={{ background: "radial-gradient(circle, #005FA3, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full opacity-10 blur-[110px]"
          style={{ background: "radial-gradient(circle, #009B94, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #D93025, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center gap-5">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finished%20solutions%20logo-El6oq26ejF7UHHNShHv1OEp3Gg4m4e.jpg"
            alt="SoloSuccess Solutions diamond logo"
            width={140}
            height={140}
            className="rounded-xl object-contain"
            priority
          />
        </div>

        {/* Tagline badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest glass-card"
          style={{ color: "#009B94", borderColor: "#009B9440" }}
        >
          <span>Parent Company &amp; Holding Group</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-none">
          <span>
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
          </span>
          <br />
          <span className="text-foreground">Solutions</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
          A family of companies built for the modern solo entrepreneur. From AI-powered tools to education, content,
          networking, and writing — everything you need to build, grow, and scale, all under one roof.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#companies"
            className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 glow-primary"
            style={{ background: "linear-gradient(135deg, #6B44A0, #005FA3)" }}
          >
            Explore Our Companies
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-foreground glass-card transition-all duration-200 hover:border-white/20"
          >
            Meet the Founder
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-35"
        aria-hidden="true"
      >
        <div className="h-8 w-px rounded-full" style={{ background: "#6B44A0" }} />
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Scroll</span>
      </div>
    </section>
  )
}
