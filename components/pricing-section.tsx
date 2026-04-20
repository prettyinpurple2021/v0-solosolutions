"use client"

import Link from "next/link"
import { Brain, BookOpen, Film, Users, PenLine, Palette, ArrowRight } from "lucide-react"

const PRICING_DATA = [
  {
    slug: "ai",
    name: "SoloSuccess AI",
    icon: Brain,
    startingAt: "Free",
    period: "to start",
    description: "AI tools for solo productivity",
    color: "#00E5FF",
    href: "/brands/ai",
  },
  {
    slug: "academy",
    name: "Academy",
    icon: BookOpen,
    startingAt: "$29",
    period: "/month",
    description: "Courses and coaching",
    color: "#B6FF3C",
    href: "/brands/academy",
  },
  {
    slug: "content-factory",
    name: "Content Factory",
    icon: Film,
    startingAt: "$499",
    period: "/month",
    description: "Done-for-you content",
    color: "#FFC53D",
    href: "/brands/content-factory",
  },
  {
    slug: "connect",
    name: "Connect",
    icon: Users,
    startingAt: "$19",
    period: "/month",
    description: "Community and networking",
    color: "#FF3DAE",
    href: "/brands/connect",
  },
  {
    slug: "soloscribe",
    name: "SoloScribe",
    icon: PenLine,
    startingAt: "$199",
    period: "/project",
    description: "Professional copywriting",
    color: "#A78BFA",
    href: "/brands/soloscribe",
  },
  {
    slug: "solodesign",
    name: "SoloDesign",
    icon: Palette,
    startingAt: "$349",
    period: "/project",
    description: "Brand and web design",
    color: "#FF6B9D",
    href: "/brands/solodesign",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-[#0B0B0D] py-24 md:py-32">
      {/* Subtle gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(107,68,160,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-5 text-center">
          <span
            className="inline-flex items-center gap-2 border border-white bg-[#0B0B0D] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            Pricing
          </span>
          <h2
            className="max-w-2xl text-balance font-sans text-3xl font-black leading-tight tracking-tight text-white md:text-5xl"
            style={{ textShadow: "3px 3px 0 #000" }}
          >
            Simple, transparent pricing
          </h2>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
            Each brand offers flexible plans designed for solo entrepreneurs. Start small, scale as you grow.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_DATA.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="group relative flex flex-col gap-4 border border-white/10 bg-[#0F0F11]/80 p-6 transition-all duration-300 hover:border-white/25 hover:bg-[#131315]"
                style={{
                  boxShadow: "4px 4px 0 0 #000",
                }}
              >
                {/* Icon + Name */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <span className="font-sans text-sm font-bold text-white">{item.name}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-sans text-3xl font-black text-white"
                    style={{ textShadow: "2px 2px 0 #000" }}
                  >
                    {item.startingAt}
                  </span>
                  <span className="font-mono text-xs text-white/50">{item.period}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60">{item.description}</p>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 pt-2 font-mono text-xs font-bold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: item.color }}
                />
              </Link>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          All plans include a 14-day money-back guarantee
        </p>
      </div>
    </section>
  )
}
