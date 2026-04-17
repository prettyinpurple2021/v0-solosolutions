import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { LiquidBlob } from "@/components/liquid-blob"

export function CtaSection() {
  return (
    <section id="connect" className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* Decorative liquid blobs */}
      <LiquidBlob
        size={720}
        variant="a"
        opacity={0.26}
        blur={120}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <LiquidBlob size={420} variant="b" opacity={0.18} blur={100} className="-top-20 right-10" />
      <LiquidBlob size={380} variant="a" opacity={0.18} blur={100} className="-bottom-20 left-10" />

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
        {/* Deep glass card wraps everything */}
        <div className="w-full rounded-[2rem] p-10 sm:p-16 glass-card-deep glass-shimmer chrome-edge relative overflow-hidden">
          {/* Iridescent hairline */}
          <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe" aria-hidden="true" />
          {/* Inner iridescent glows */}
          <div
            className="pointer-events-none absolute -top-24 left-1/4 h-56 w-80 rounded-full blur-[80px] opacity-30"
            style={{ background: "#6B44A0" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 right-1/4 h-48 w-72 rounded-full blur-[70px] opacity-25"
            style={{ background: "#009B94" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Iconic chrome chip */}
            <div className="relative iridescent-ring rounded-2xl h-16 w-16">
              <div className="flex h-full w-full items-center justify-center rounded-2xl">
                <Mail size={24} className="text-[#C8CED8]" aria-hidden="true" />
              </div>
            </div>

            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 glass-card chrome-edge">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B44A0]" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] chrome-text">
                Let&apos;s Talk
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-balance leading-[1.05] chrome-iridescent">
              Let&apos;s build something together.
            </h2>

            {/* Subtext */}
            <p className="max-w-lg text-base leading-relaxed text-body">
              Whether you&apos;re interested in partnering, collaborating, investing, or just want
              to learn more about the SoloSuccess ecosystem — we&apos;d love to hear from you.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="mailto:hello@solosuccesssolutions.com"
                className="btn-iridescent shimmer-sweep group relative inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold"
              >
                <span className="sweep" aria-hidden="true" />
                <span className="relative">Send a Message</span>
                <ArrowRight
                  size={16}
                  className="relative transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#companies"
                className="btn-chrome-ghost inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wide"
              >
                View Our Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
