import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Nebula backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-[130px]"
          style={{ background: "radial-gradient(circle, oklch(0.45 0.22 300) 0%, oklch(0.58 0.22 255) 60%, transparent 80%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-tight">
          Ready to launch your{" "}
          <span
            style={{
              background: "linear-gradient(90deg, oklch(0.58 0.22 255) 0%, oklch(0.62 0.14 185) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            solo mission?
          </span>
        </h2>
        <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
          Join thousands of founders who have accelerated their journey with the SoloSuccess ecosystem. Your breakthrough
          is one launch away.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#ecosystem"
            className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 glow-blue"
            style={{ background: "oklch(0.58 0.22 255)" }}
          >
            Get Started Free
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
            See All Features
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">No credit card required. Free tier available.</p>
      </div>
    </section>
  )
}
