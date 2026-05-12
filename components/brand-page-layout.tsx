import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import type { Brand } from "@/lib/brands"

const spectrumColors = ["#D93025", "#F07B1F", "#F5C400", "#2D9E2A", "#009B94", "#005FA3", "#6B44A0"]

function RainbowLetters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} style={{ color: char === " " ? "inherit" : spectrumColors[i % spectrumColors.length] }}>
          {char}
        </span>
      ))}
    </>
  )
}

export function BrandPageLayout({ brand }: { brand: Brand }) {
  const Icon = brand.icon
  const isExternalBrandUrl = brand.ctaUrl.startsWith("http://") || brand.ctaUrl.startsWith("https://")
  const brandLinkProps = isExternalBrandUrl ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(0.08 0.015 260)" }}>

      {/* Static color wash background — rich brand-tinted washes */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Deep base tint over the dark background */}
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${brand.color}30 0%, transparent 60%)` }} />
        {/* Top-left dominant wash */}
        <div className="absolute -top-64 -left-64 h-[1100px] w-[1100px] rounded-full blur-[200px]"
          style={{ background: `radial-gradient(circle, ${brand.color}99 0%, transparent 65%)` }} />
        {/* Bottom-right wash */}
        <div className="absolute -bottom-64 -right-64 h-[1100px] w-[1100px] rounded-full blur-[200px]"
          style={{ background: `radial-gradient(circle, ${brand.secondaryColor}88 0%, transparent 65%)` }} />
        {/* Center accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: `radial-gradient(circle, ${brand.color}55 0%, transparent 65%)` }} />
        {/* Top-right secondary wash */}
        <div className="absolute -top-32 -right-32 h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: `radial-gradient(circle, ${brand.secondaryColor}66 0%, transparent 65%)` }} />
        {/* Bottom-left secondary wash */}
        <div className="absolute -bottom-32 -left-32 h-[600px] w-[600px] rounded-full blur-[160px]"
          style={{ background: `radial-gradient(circle, ${brand.color}66 0%, transparent 65%)` }} />
      </div>

      {/* Navbar */}
      <header className="relative z-50 glass-card border-b" style={{ borderColor: `${brand.color}33` }}>
        {/* Rainbow top stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
          aria-hidden="true"
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3" aria-label="Brand navigation">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80" aria-label="Back to SoloSuccess Solutions">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
              alt="SoloSuccess Solutions"
              width={64}
              height={64}
              className="object-contain"
            />
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#6b7280" }}>
              <ArrowLeft size={12} />
              SoloSuccess Solutions
            </span>
          </Link>
          <span className="text-base font-extrabold" style={{ color: brand.color }}>
            {brand.wordmark}
          </span>
          <Link
            href={brand.ctaUrl}
            {...brandLinkProps}
            className="rounded-xl px-5 py-2 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
            style={{ background: `linear-gradient(135deg, ${brand.color}, ${brand.secondaryColor})` }}
          >
            {brand.ctaLabel}
          </Link>
        </nav>
      </header>

      <main className="relative z-10">

        {/* Hero */}
        <section className="px-6 py-24 sm:py-32" aria-label="Hero">
          <div className="mx-auto max-w-5xl flex flex-col items-center gap-8 text-center">
            {/* Logo image or icon badge */}
            {brand.logoUrl ? (
              <div className="flex items-center justify-center">
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={360}
                  height={360}
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl"
                style={{ background: `${brand.color}20`, border: `2px solid ${brand.color}` }}
              >
                <Icon size={44} style={{ color: brand.color }} aria-hidden="true" />
              </div>
            )}

            {/* Tagline badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 glass-card"
              style={{ borderColor: `${brand.color}66`, boxShadow: `0 0 20px ${brand.color}33` }}
            >
              <span className="font-display text-sm font-semibold" style={{ color: brand.color }}>
                {brand.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-balance leading-tight">
              <RainbowLetters text={brand.name} />
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "#c4c8d4" }}>
              {brand.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-4">
              {brand.benefits.map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold" style={{ color: brand.color }}>{b.stat}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6b7280" }}>{b.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href={brand.ctaUrl}
                {...brandLinkProps}
                className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
                style={{ background: `linear-gradient(135deg, ${brand.color}, ${brand.secondaryColor})` }}
              >
                {brand.ctaLabel}
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/#companies"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-500 hover:opacity-80"
                style={{ color: "#9CA3AF", border: "2px solid #9CA3AF", background: "oklch(0.15 0.020 265 / 0.38)", backdropFilter: "blur(16px)" }}
              >
                View All Brands
              </Link>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="px-6 pb-24 sm:pb-32" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <span className="font-display text-lg font-semibold rainbow-text">What We Offer</span>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "#f0f4ff" }}>
                Everything you need, <span style={{ color: brand.color }}>nothing you don&apos;t</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brand.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group relative flex flex-col gap-4 rounded-2xl p-7 glass-card glass-shimmer overflow-hidden transition-all duration-700 hover:glass-card-deep"
                  style={{ borderColor: `${brand.color}44` }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${spectrumColors[i % spectrumColors.length]}, transparent)` }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} style={{ color: spectrumColors[i % spectrumColors.length], filter: `drop-shadow(0 0 6px ${spectrumColors[i % spectrumColors.length]}88)` }} aria-hidden="true" />
                    <h3 className="text-base font-extrabold" style={{ color: "#f0f4ff" }}>{feature.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section id="contact" className="px-6 pb-28" aria-label="Call to action">
          <div
            className="mx-auto max-w-3xl rounded-3xl p-10 sm:p-14 text-center glass-card-deep glass-shimmer overflow-hidden relative"
            style={{ borderColor: `${brand.color}66` }}
          >
            {/* Brand color glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${brand.color}30 0%, transparent 65%)` }}
              aria-hidden="true"
            />
            {/* Secondary color bottom glow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full blur-[50px] opacity-25"
              style={{ background: brand.secondaryColor }}
              aria-hidden="true"
            />
            {/* Top rainbow line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="font-display text-lg rainbow-text">Ready to get started?</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "#f0f4ff" }}>
                Join {brand.name} today
              </h2>
              <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#8a8fa8" }}>
                Take the next step toward building your solo business with the tools, community, and support you need to succeed.
              </p>
              <Link
                href={brand.ctaUrl === "#contact" ? "mailto:hello@solosuccesssolutions.com" : brand.ctaUrl}
                {...brandLinkProps}
                className="group inline-flex items-center gap-2 rounded-xl px-10 py-4 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
                style={{ background: `linear-gradient(135deg, ${brand.color}, ${brand.secondaryColor})` }}
              >
                {brand.ctaLabel}
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t px-6 py-8 text-center" style={{ borderColor: "#ffffff14" }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
          aria-hidden="true"
        />
        <p className="text-xs" style={{ color: "#6b7280" }}>
          &copy; {new Date().getFullYear()} {brand.name} — a{" "}
          <Link href="/" className="font-semibold transition-opacity hover:opacity-80 rainbow-text">
            SoloSuccess Solutions
          </Link>{" "}
          company. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
