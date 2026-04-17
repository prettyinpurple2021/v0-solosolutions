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
        {/* Deep glass card wraps everything */}
        <div className="w-full rounded-3xl p-10 sm:p-14 glass-card-deep glass-shimmer relative overflow-hidden"
          style={{ borderColor: "oklch(0.60 0.055 270 / 0.35)" }}>
          {/* Rainbow top stripe */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
            aria-hidden="true"
          />
          {/* Inner purple/teal glow */}
          <div className="pointer-events-none absolute -top-16 left-1/4 h-40 w-64 rounded-full blur-[50px] opacity-30"
            style={{ background: "#6B44A0" }} aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-10 right-1/4 h-36 w-56 rounded-full blur-[50px] opacity-25"
            style={{ background: "#009B94" }} aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Icon */}
        <div
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl rainbow-border"
          style={{ background: "linear-gradient(135deg, #6B44A022, #005FA322)", boxShadow: "0 0 32px #6B44A066" }}
        >
          <Mail size={28} style={{ color: "#6B44A0" }} aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-balance leading-tight rainbow-text">
          Let&apos;s build something together.
        </h2>

        {/* Subtext */}
        <p className="max-w-lg text-base leading-relaxed" style={{ color: "#c4c8d4" }}>
          Whether you&apos;re interested in partnering, collaborating, investing, or just want to learn more about the
          SoloSuccess ecosystem — we&apos;d love to hear from you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="mailto:hello@solosuccesssolutions.com"
            className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
            style={{ background: "linear-gradient(135deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
          >
            Send a Message
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="#companies"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-500 hover:opacity-80"
            style={{ color: "#9CA3AF", border: "2px solid #9CA3AF", background: "oklch(0.15 0.020 265 / 0.38)", backdropFilter: "blur(16px)" }}
          >
            View Our Companies
          </Link>
        </div>
          </div>{/* end relative z-10 */}
        </div>{/* end glass card */}
      </div>
    </section>
  )
}
