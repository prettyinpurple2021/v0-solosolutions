import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16"
      aria-label="Hero"
    >
      {/* Nebula background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple orb — top left */}
        <div
          className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, oklch(0.45 0.22 300), transparent 70%)" }}
        />
        {/* Teal orb — bottom right */}
        <div
          className="absolute -bottom-32 -right-24 h-[500px] w-[500px] rounded-full opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.14 185), transparent 70%)" }}
        />
        {/* Blue orb — center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, oklch(0.58 0.22 255), transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest glass-card"
          style={{ color: "oklch(0.58 0.22 255)", borderColor: "oklch(0.58 0.22 255 / 0.25)" }}
        >
          <Zap size={12} aria-hidden="true" />
          <span>Project Ecosystem v1.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-none">
          <span className="text-foreground">Build Beyond</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, oklch(0.58 0.22 255) 0%, oklch(0.62 0.14 185) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            The Horizon
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
          SoloSuccess Solutions is the launchpad for founders and innovators. Orchestrate your projects, amplify your
          impact, and step into a new dimension of individual-led success.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#ecosystem"
            className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 glow-blue"
            style={{ background: "oklch(0.58 0.22 255)" }}
          >
            Launch Now
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-foreground glass-card transition-all duration-200 hover:border-primary/40"
          >
            Explore Features
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: "12+", label: "Active Projects" },
            { value: "98%", label: "Uptime SLA" },
            { value: "3x", label: "Faster Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-foreground" style={{ color: "oklch(0.58 0.22 255)" }}>
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
        aria-hidden="true"
      >
        <div className="h-8 w-px rounded-full" style={{ background: "oklch(0.58 0.22 255)" }} />
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Scroll</span>
      </div>
    </section>
  )
}
