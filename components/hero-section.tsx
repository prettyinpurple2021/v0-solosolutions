import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { LiquidBlob } from "@/components/liquid-blob"

const heroStats = [
  { value: "5", label: "Brands" },
  { value: "1", label: "Vision" },
  { value: "∞", label: "Potential" },
]

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-24"
      aria-label="Hero"
    >
      {/* Decorative iridescent liquid blobs behind hero */}
      <LiquidBlob
        size={720}
        variant="a"
        opacity={0.38}
        blur={90}
        className="-top-40 -left-40"
      />
      <LiquidBlob
        size={620}
        variant="b"
        opacity={0.32}
        blur={90}
        className="-bottom-32 -right-32"
      />
      <LiquidBlob
        size={360}
        variant="a"
        opacity={0.22}
        blur={70}
        className="top-1/3 left-1/2 -translate-x-1/2"
      />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center max-w-4xl mx-auto w-full">
        {/* Deep glass plate — premium chrome-edged */}
        <div
          className="absolute inset-x-[-2.5rem] inset-y-[-3.5rem] rounded-[2rem] glass-card-deep glass-shimmer chrome-edge pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-8 w-full">
          {/* Logo with chrome iridescent halo */}
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-12 rounded-full blur-3xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #6B44A033, #005FA333, #009B9433, #2D9E2A33, #F5C40033, #F07B1F33, #D9302533, #6B44A033)",
              }}
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
              alt="SoloSuccess Solutions diamond logo"
              width={280}
              height={280}
              className="relative object-contain drop-shadow-[0_0_30px_rgba(107,68,160,0.35)]"
              priority
            />
          </div>

          {/* Tagline badge — chrome glass */}
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 glass-card chrome-edge">
            <Sparkles size={13} className="text-[#F5C400]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] chrome-text">
              Parent Company &amp; Holding Group
            </span>
            <Sparkles size={13} className="text-[#F5C400]" aria-hidden="true" />
          </div>

          {/* Headline — liquid chrome with iridescent accent */}
          <h1 className="text-6xl sm:text-7xl md:text-[7.5rem] font-extrabold tracking-[-0.035em] text-balance leading-[0.95]">
            <span className="chrome-iridescent block">SoloSuccess</span>
            <span className="font-display chrome-text block text-5xl sm:text-6xl md:text-7xl font-bold mt-1">
              Solutions
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-balance text-body">
            A family of{" "}
            <span className="font-semibold chrome-iridescent">five purpose-built companies</span>{" "}
            for the modern solo entrepreneur — AI tools, education, content, community, and
            copywriting, all under one roof.
          </p>

          {/* Stats strip — chrome pill */}
          <div
            className="flex items-center justify-center gap-10 sm:gap-16 py-4 px-10 rounded-2xl glass-card chrome-edge w-full max-w-md"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold chrome-iridescent">
                  {s.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-body-dim">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="#companies"
              className="btn-iridescent shimmer-sweep group relative inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold"
            >
              <span className="sweep" aria-hidden="true" />
              <span className="relative">Explore Our Companies</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="#about"
              className="btn-chrome-ghost inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wide"
            >
              Meet the Founder
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
        aria-hidden="true"
      >
        <div
          className="h-12 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #D8DDE6, #6B44A0, transparent)",
          }}
        />
        <span className="font-display text-[10px] tracking-[0.32em] uppercase text-body-dim">
          scroll
        </span>
      </div>
    </section>
  )
}
