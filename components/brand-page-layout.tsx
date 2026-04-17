import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import type { Brand } from "@/lib/brands"
import { AnimatedBackground } from "@/components/animated-background"
import { LiquidBlob } from "@/components/liquid-blob"

export function BrandPageLayout({ brand }: { brand: Brand }) {
  const Icon = brand.icon

  return (
    <div className="relative min-h-screen font-sans bg-background overflow-hidden">
      {/* Shared liquid chrome backdrop */}
      <AnimatedBackground />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Brand-tinted wash layered above the shared bg */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ zIndex: 0 }}>
          <div
            className="absolute -top-40 -left-40 h-[900px] w-[900px] rounded-full blur-[180px] opacity-40"
            style={{ background: `radial-gradient(circle, ${brand.color}55 0%, transparent 65%)` }}
          />
          <div
            className="absolute -bottom-40 -right-40 h-[900px] w-[900px] rounded-full blur-[180px] opacity-35"
            style={{ background: `radial-gradient(circle, ${brand.secondaryColor}44 0%, transparent 65%)` }}
          />
        </div>

        {/* Navbar */}
        <header className="relative z-50 glass-card-deep chrome-edge">
          <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe opacity-80" aria-hidden="true" />
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
            aria-label="Brand navigation"
          >
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Back to SoloSuccess Solutions"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #6B44A0, #005FA3, #009B94, #2D9E2A, #F5C400, #F07B1F, #D93025, #6B44A0)",
                  }}
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
                  alt="SoloSuccess Solutions"
                  width={44}
                  height={44}
                  className="relative object-contain"
                />
              </div>
              <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-body-dim transition-colors duration-500 group-hover:text-body">
                <ArrowLeft size={11} />
                Solutions
              </span>
            </Link>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] chrome-text">
              {brand.wordmark}
            </span>
            <Link
              href="#contact"
              className="btn-iridescent shimmer-sweep relative rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <span className="sweep" aria-hidden="true" />
              <span className="relative">{brand.ctaLabel}</span>
            </Link>
          </nav>
        </header>

        <main className="relative z-10">
          {/* Hero */}
          <section className="relative px-6 py-28 sm:py-36 overflow-hidden" aria-label="Hero">
            <LiquidBlob
              size={640}
              variant="a"
              opacity={0.30}
              blur={100}
              className="-top-32 -left-32"
            />
            <LiquidBlob
              size={560}
              variant="b"
              opacity={0.26}
              blur={100}
              className="-bottom-24 -right-24"
            />

            <div className="relative mx-auto max-w-5xl flex flex-col items-center gap-9 text-center">
              {/* Logo image or iridescent icon badge */}
              {brand.logoUrl ? (
                <div className="relative flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -m-10 rounded-full blur-3xl opacity-50"
                    style={{
                      background: `conic-gradient(from 0deg, ${brand.color}55, #6B44A055, #005FA355, #009B9455, ${brand.secondaryColor}55, ${brand.color}55)`,
                    }}
                  />
                  <Image
                    src={brand.logoUrl}
                    alt={`${brand.name} logo`}
                    width={320}
                    height={320}
                    className="relative object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="relative iridescent-ring rounded-[1.75rem] h-28 w-28">
                  <div className="flex h-full w-full items-center justify-center rounded-[1.75rem]">
                    <Icon size={48} style={{ color: brand.color }} aria-hidden="true" />
                  </div>
                </div>
              )}

              {/* Tagline badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 glass-card chrome-edge">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: brand.color }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] chrome-text">
                  {brand.tagline}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-balance leading-[0.98]">
                <span className="chrome-iridescent">{brand.name}</span>
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-body">
                {brand.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-4">
                {brand.benefits.map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1">
                    <span
                      className="text-3xl sm:text-4xl font-extrabold chrome-text"
                      style={{ textShadow: `0 0 24px ${brand.color}66` }}
                    >
                      {b.stat}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-body-dim">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link
                  href="#contact"
                  className="btn-iridescent shimmer-sweep group relative inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold"
                >
                  <span className="sweep" aria-hidden="true" />
                  <span className="relative">{brand.ctaLabel}</span>
                  <ArrowRight
                    size={16}
                    className="relative transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/#companies"
                  className="btn-chrome-ghost inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wide"
                >
                  View All Brands
                </Link>
              </div>
            </div>
          </section>

          {/* Features grid */}
          <section className="relative px-6 pb-24 sm:pb-32" aria-labelledby="features-heading">
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 flex flex-col items-center gap-5 text-center">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 glass-card chrome-edge">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: brand.color }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] chrome-text">
                    What We Offer
                  </span>
                </div>
                <h2
                  id="features-heading"
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-balance leading-[1.05]"
                >
                  <span className="chrome-text">Everything you need,</span>{" "}
                  <span className="chrome-iridescent">nothing you don&apos;t</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brand.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group relative flex flex-col gap-4 rounded-3xl p-7 glass-card glass-shimmer chrome-edge magnetic-hover shimmer-sweep overflow-hidden"
                    style={{ borderColor: `${brand.color}33` }}
                  >
                    <span className="sweep" aria-hidden="true" />
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${brand.color}aa 50%, transparent 100%)`,
                      }}
                      aria-hidden="true"
                    />
                    {/* Color wash on hover */}
                    <div
                      className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-25 blur-[60px]"
                      style={{ background: brand.color }}
                      aria-hidden="true"
                    />

                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        size={20}
                        style={{
                          color: brand.color,
                          filter: `drop-shadow(0 0 6px ${brand.color}88)`,
                        }}
                        aria-hidden="true"
                      />
                      <h3 className="text-base font-extrabold chrome-text tracking-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-body">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA band */}
          <section id="contact" className="px-6 pb-28" aria-label="Call to action">
            <div className="mx-auto max-w-3xl rounded-[2rem] p-10 sm:p-16 text-center glass-card-deep glass-shimmer chrome-edge overflow-hidden relative">
              {/* Brand color glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${brand.color}30 0%, transparent 65%)`,
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full blur-[70px] opacity-30"
                style={{ background: brand.secondaryColor }}
                aria-hidden="true"
              />
              {/* Rainbow hairline top */}
              <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe" aria-hidden="true" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 glass-card chrome-edge">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: brand.color }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] chrome-text">
                    Ready to get started?
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-balance leading-[1.05] chrome-iridescent">
                  Join {brand.name} today
                </h2>
                <p className="text-sm sm:text-base leading-relaxed max-w-lg text-body">
                  Take the next step toward building your solo business with the tools, community,
                  and support you need to succeed.
                </p>
                <Link
                  href="mailto:hello@solosuccesssolutions.com"
                  className="btn-iridescent shimmer-sweep group inline-flex items-center gap-2 rounded-xl px-10 py-4 text-sm font-bold"
                >
                  <span className="sweep" aria-hidden="true" />
                  <span className="relative">{brand.ctaLabel}</span>
                  <ArrowRight
                    size={16}
                    className="relative transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 glass-panel chrome-edge px-6 py-10 text-center">
          <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe" aria-hidden="true" />
          <p className="text-xs text-body-dim">
            &copy; {new Date().getFullYear()} {brand.name} — a{" "}
            <Link
              href="/"
              className="font-semibold transition-opacity hover:opacity-80 chrome-iridescent"
            >
              SoloSuccess Solutions
            </Link>{" "}
            company. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
