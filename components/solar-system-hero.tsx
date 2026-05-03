"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

type AppPlanet = {
  slug: string
  name: string
  tagline: string
  desc: string
  href: string
  accent: string
  orbitRadius: number
  orbitDuration: number
  size: number
  placeholder: string
}

const APPS: AppPlanet[] = [
  {
    slug: "ai",
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity",
    desc: "Automations, content, and insight calibrated for solo operators.",
    href: "/brands/ai",
    accent: "#00E5FF",
    orbitRadius: 22,
    orbitDuration: 20,
    size: 48,
    placeholder: "/logos/ai-placeholder.jpg",
  },
  {
    slug: "academy",
    name: "SoloSuccess Academy",
    tagline: "Education for the Solo Journey",
    desc: "Courses, coaching, and playbooks that teach real-world skills.",
    href: "/brands/academy",
    accent: "#B6FF3C",
    orbitRadius: 32,
    orbitDuration: 28,
    size: 52,
    placeholder: "/logos/academy-placeholder.jpg",
  },
  {
    slug: "content-factory",
    name: "Content Factory",
    tagline: "Story at Scale",
    desc: "Done-for-you content that helps you show up with confidence.",
    href: "/brands/content-factory",
    accent: "#FFC53D",
    orbitRadius: 42,
    orbitDuration: 36,
    size: 56,
    placeholder: "/logos/content-factory-placeholder.jpg",
  },
  {
    slug: "connect",
    name: "SoloSuccess Connect",
    tagline: "Community & Networking",
    desc: "A curated circle of collaborators, mentors, and partners.",
    href: "/brands/connect",
    accent: "#FF3DAE",
    orbitRadius: 52,
    orbitDuration: 44,
    size: 52,
    placeholder: "/logos/connect-placeholder.jpg",
  },
  {
    slug: "soloscribe",
    name: "SoloScribe",
    tagline: "Writing That Converts",
    desc: "Copy, emails, and brand voice written to move readers.",
    href: "/brands/soloscribe",
    accent: "#A78BFA",
    orbitRadius: 62,
    orbitDuration: 52,
    size: 48,
    placeholder: "/logos/soloscribe-placeholder.jpg",
  },
  {
    slug: "solodesign",
    name: "SoloDesign",
    tagline: "Visual Excellence",
    desc: "Brand, web, and creative design that stands out.",
    href: "/brands/solodesign",
    accent: "#FF6B9D",
    orbitRadius: 72,
    orbitDuration: 60,
    size: 52,
    placeholder: "/logos/solodesign-placeholder.jpg",
  },
]

export function SolarSystemHero() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050510]">
      {/* Gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(120, 80, 200, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 60%, rgba(200, 100, 150, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 30% 40%, rgba(50, 150, 200, 0.08) 0%, transparent 35%)
          `,
        }}
      />

      {/* Subtle iridescent horizontal line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(150,200,255,0.2) 35%, rgba(200,150,255,0.2) 50%, rgba(255,200,150,0.2) 65%, rgba(255,255,255,0.1) 80%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(150,200,255,0.15) 30%, rgba(200,150,255,0.15) 50%, rgba(255,200,150,0.15) 70%, transparent 100%)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {isMounted && Array.from({ length: 80 }).map((_, i) => {
          const seed = (n: number) => {
            const x = Math.sin(n * 12345) * 54321
            return x - Math.floor(x)
          }
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${seed(i * 1.1) * 100}%`,
                top: `${seed(i * 2.3) * 100}%`,
                width: seed(i * 3.7) < 0.7 ? 1 : 2,
                height: seed(i * 3.7) < 0.7 ? 1 : 2,
                opacity: 0.3 + seed(i * 4.9) * 0.4,
              }}
            />
          )
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-20">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            The Ecosystem
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Universe of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
              Solo Success
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm text-white/50 md:text-base">
            Six powerful apps orbiting around your entrepreneurial core.
          </p>
        </div>

        {/* Solar System */}
        <div className="relative aspect-square w-full max-w-[500px] md:max-w-[600px]">
          {/* Orbit rings */}
          {APPS.map((app) => (
            <div
              key={`ring-${app.slug}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300"
              style={{
                width: `${app.orbitRadius * 2}%`,
                height: `${app.orbitRadius * 2}%`,
                borderColor: hoveredApp === app.slug ? `${app.accent}40` : "rgba(255,255,255,0.06)",
              }}
            />
          ))}

          {/* Central Sun */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            {/* Outer glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 140,
                height: 140,
                background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0.1) 50%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />
            {/* Sun body */}
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24"
              style={{
                background: "radial-gradient(circle at 35% 30%, #fef3c7 0%, #fbbf24 40%, #f59e0b 70%, #b45309 100%)",
                boxShadow: "0 0 40px rgba(251,191,36,0.5), 0 0 80px rgba(251,191,36,0.25)",
              }}
            >
              <span className="text-3xl font-bold text-white drop-shadow-lg md:text-4xl">S</span>
            </div>
            <p className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-white/50">
              SoloSuccess Core
            </p>
          </div>

          {/* Orbiting Planets */}
          {APPS.map((app, index) => {
            const startOffset = (index / APPS.length) * 100
            return (
              <div
                key={app.slug}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: `${app.orbitRadius * 2}%`,
                  height: `${app.orbitRadius * 2}%`,
                  marginLeft: `-${app.orbitRadius}%`,
                  marginTop: `-${app.orbitRadius}%`,
                  animation: `orbit-rotate ${app.orbitDuration}s linear infinite`,
                  animationDelay: `-${(startOffset / 100) * app.orbitDuration}s`,
                }}
              >
                {/* Planet positioned at edge of orbit */}
                <Link
                  href={app.href}
                  className="absolute left-1/2 top-0 block -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110"
                  style={{
                    animation: `orbit-rotate ${app.orbitDuration}s linear infinite reverse`,
                    animationDelay: `-${(startOffset / 100) * app.orbitDuration}s`,
                  }}
                  onMouseEnter={() => setHoveredApp(app.slug)}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  {/* Glow */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200"
                    style={{
                      width: app.size * 1.8,
                      height: app.size * 1.8,
                      background: `radial-gradient(circle, ${app.accent}30 0%, transparent 70%)`,
                      filter: "blur(8px)",
                      opacity: hoveredApp === app.slug ? 1 : 0.5,
                    }}
                  />
                  {/* Planet body */}
                  <div
                    className="relative overflow-hidden rounded-full"
                    style={{
                      width: app.size,
                      height: app.size,
                      background: `radial-gradient(circle at 30% 30%, ${app.accent} 0%, ${app.accent}99 50%, ${app.accent}66 100%)`,
                      boxShadow: `inset -4px -4px 12px rgba(0,0,0,0.4), inset 2px 2px 8px rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <Image
                      src={app.placeholder}
                      alt={app.name}
                      fill
                      className="object-cover opacity-80"
                      sizes={`${app.size}px`}
                    />
                  </div>
                  {/* Label */}
                  <span
                    className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide transition-colors duration-200"
                    style={{
                      backgroundColor: hoveredApp === app.slug ? app.accent : "rgba(0,0,0,0.5)",
                      color: hoveredApp === app.slug ? "#000" : "#fff",
                    }}
                  >
                    {app.name.replace("SoloSuccess ", "").replace("Solo", "")}
                  </span>

                  {/* Tooltip on hover */}
                  {hoveredApp === app.slug && (
                    <div
                      className="absolute left-full top-1/2 z-30 ml-3 w-44 -translate-y-1/2 rounded-lg border border-white/10 bg-black/90 p-3 backdrop-blur"
                      style={{ boxShadow: `0 0 20px ${app.accent}20` }}
                    >
                      <div className="mb-1.5 h-0.5 w-6 rounded" style={{ backgroundColor: app.accent }} />
                      <p className="text-xs font-semibold text-white">{app.name}</p>
                      <p className="mt-0.5 text-[10px] font-medium" style={{ color: app.accent }}>{app.tagline}</p>
                      <p className="mt-1.5 text-[10px] leading-relaxed text-white/60">{app.desc}</p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-white">
                        Explore <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Subtitle */}
        <p className="mt-10 text-center text-xs font-medium uppercase tracking-widest text-white/30">
          Hover to explore each app
        </p>
      </div>
    </section>
  )
}
