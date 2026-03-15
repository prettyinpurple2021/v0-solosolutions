import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="connect" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Full-spectrum background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, #6B44A0 0%, #005FA3 30%, #009B94 55%, transparent 80%)" }} />
        <div className="absolute -bottom-20 left-1/4 h-[400px] w-[400px] rounded-full opacity-12 blur-[120px]"
          style={{ background: "radial-gradient(circle, #D93025, transparent 65%)" }} />
        <div className="absolute -top-20 right-1/4 h-[400px] w-[400px] rounded-full opacity-12 blur-[120px]"
          style={{ background: "radial-gradient(circle, #F07B1F, transparent 65%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
        {/* Icon */}
        <div
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl rainbow-border"
          style={{ background: "linear-gradient(135deg, #6B44A022, #005FA322)" }}
        >
          <Mail size={28} style={{ color: "#6B44A0" }} aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-balance leading-tight rainbow-text">
          Let&apos;s build something together.
        </h2>

        {/* Subtext */}
        <p className="max-w-lg text-base leading-relaxed" style={{ color: "#8a8fa8" }}>
          Whether you&apos;re interested in partnering, collaborating, investing, or just want to learn more about the
          SoloSuccess ecosystem — we&apos;d love to hear from you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="mailto:hello@solosuccesssolutions.com"
            className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 rainbow-border"
            style={{ background: "linear-gradient(135deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
          >
            Send a Message
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="#companies"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold glass-card transition-all duration-200 hover:border-white/20"
            style={{ color: "#9CA3AF" }}
          >
            View Our Companies
          </Link>
        </div>
      </div>
    </section>
  )
}
