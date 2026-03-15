import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="connect" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-18 blur-[140px]"
          style={{ background: "radial-gradient(circle, #6B44A0 0%, #005FA3 50%, transparent 80%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
        <div
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "linear-gradient(135deg, #6B44A022, #005FA322)" }}
        >
          <Mail size={26} style={{ color: "#6B44A0" }} aria-hidden="true" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-tight">
          Let&apos;s build something{" "}
          <span style={{ color: "#6B44A0" }}>together.</span>
        </h2>

        <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
          Whether you&apos;re interested in partnering, collaborating, investing, or just want to learn more about the
          SoloSuccess ecosystem — we&apos;d love to hear from you.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="mailto:hello@solosuccesssolutions.com"
            className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 glow-primary"
            style={{ background: "linear-gradient(135deg, #6B44A0, #005FA3)" }}
          >
            Send a Message
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="#companies"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-foreground glass-card transition-all duration-200 hover:border-white/20"
          >
            View Our Companies
          </Link>
        </div>
      </div>
    </section>
  )
}
