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
    orbitRadius: 18,
    orbitDuration: 25,
    size: 44,
    placeholder: "/logos/ai-placeholder.jpg",
  },
  {
    slug: "academy",
    name: "SoloSuccess Academy",
    tagline: "Education for the Solo Journey",
    desc: "Courses, coaching, and playbooks that teach real-world skills.",
    href: "/brands/academy",
    accent: "#B6FF3C",
    orbitRadius: 28,
    orbitDuration: 35,
    size: 48,
    placeholder: "/logos/academy-placeholder.jpg",
  },
  {
    slug: "content-factory",
    name: "Content Factory",
    tagline: "Story at Scale",
    desc: "Done-for-you content that helps you show up with confidence.",
    href: "/brands/content-factory",
    accent: "#FFC53D",
    orbitRadius: 38,
    orbitDuration: 45,
    size: 52,
    placeholder: "/logos/content-factory-placeholder.jpg",
  },
  {
    slug: "connect",
    name: "SoloSuccess Connect",
    tagline: "Community & Networking",
    desc: "A curated circle of collaborators, mentors, and partners.",
    href: "/brands/connect",
    accent: "#FF3DAE",
    orbitRadius: 48,
    orbitDuration: 55,
    size: 50,
    placeholder: "/logos/connect-placeholder.jpg",
  },
  {
    slug: "soloscribe",
    name: "SoloScribe",
    tagline: "Writing That Converts",
    desc: "Copy, emails, and brand voice written to move readers.",
    href: "/brands/soloscribe",
    accent: "#A78BFA",
    orbitRadius: 58,
    orbitDuration: 65,
    size: 46,
    placeholder: "/logos/soloscribe-placeholder.jpg",
  },
  {
    slug: "solodesign",
    name: "SoloDesign",
    tagline: "Visual Excellence",
    desc: "Brand, web, and creative design that stands out.",
    href: "/brands/solodesign",
    accent: "#FF6B9D",
    orbitRadius: 68,
    orbitDuration: 75,
    size: 48,
    placeholder: "/logos/solodesign-placeholder.jpg",
  },
]

// Deterministic pseudo-random for consistent rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export function SolarSystemHero() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030308]">
      {/* Deep space base gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(10, 5, 25, 1) 0%, transparent 70%),
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(15, 8, 35, 0.8) 0%, transparent 60%),
            linear-gradient(180deg, #030308 0%, #0a0612 50%, #030308 100%)
          `,
        }}
      />

      {/* Animated nebula clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple nebula - top left */}
        <div
          className="animate-nebula-drift-1 absolute"
          style={{
            width: "50vw",
            height: "40vh",
            left: "-5%",
            top: "10%",
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Pink nebula - right side */}
        <div
          className="animate-nebula-drift-2 absolute"
          style={{
            width: "45vw",
            height: "50vh",
            right: "-10%",
            top: "30%",
            background: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.03) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Cyan nebula - bottom center */}
        <div
          className="animate-nebula-pulse absolute"
          style={{
            width: "60vw",
            height: "35vh",
            left: "20%",
            bottom: "5%",
            background: "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.08) 0%, rgba(0, 180, 200, 0.03) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Warm accent nebula - top right */}
        <div
          className="animate-nebula-drift-1 absolute"
          style={{
            width: "35vw",
            height: "30vh",
            right: "10%",
            top: "5%",
            background: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.06) 0%, rgba(245, 158, 11, 0.02) 50%, transparent 70%)",
            filter: "blur(55px)",
            animationDelay: "-30s",
          }}
        />
      </div>

      {/* Iridescent horizontal line with shimmer animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2"
        style={{ height: "3px" }}
      >
        {/* Main iridescent line */}
        <div
          className="animate-iridescent-shimmer absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #D93025 8%, #F07B1F 18%, #F5C400 28%, #2D9E2A 40%, #009B94 52%, #005FA3 64%, #6B44A0 76%, #D93025 88%, transparent 100%)",
            backgroundSize: "200% 100%",
            opacity: 0.7,
          }}
        />
        {/* Glow layer */}
        <div
          className="animate-iridescent-shimmer absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #D93025 8%, #F07B1F 18%, #F5C400 28%, #2D9E2A 40%, #009B94 52%, #005FA3 64%, #6B44A0 76%, #D93025 88%, transparent 100%)",
            backgroundSize: "200% 100%",
            filter: "blur(12px)",
            opacity: 0.5,
            animationDelay: "-4s",
          }}
        />
        {/* Outer glow */}
        <div
          className="animate-iridescent-shimmer absolute -inset-y-2 inset-x-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 25%, rgba(236,72,153,0.3) 50%, rgba(0,229,255,0.3) 75%, transparent 100%)",
            backgroundSize: "200% 100%",
            filter: "blur(20px)",
            opacity: 0.4,
            animationDelay: "-2s",
          }}
        />
      </div>

      {/* Stars field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {isMounted && Array.from({ length: 100 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${seededRandom(i * 1.1) * 100}%`,
              top: `${seededRandom(i * 2.3) * 100}%`,
              width: seededRandom(i * 3.7) < 0.6 ? 1 : seededRandom(i * 3.7) < 0.85 ? 1.5 : 2,
              height: seededRandom(i * 3.7) < 0.6 ? 1 : seededRandom(i * 3.7) < 0.85 ? 1.5 : 2,
              opacity: 0.2 + seededRandom(i * 4.9) * 0.5,
              animation: `twinkle ${2 + seededRandom(i * 5.5) * 3}s ease-in-out infinite`,
              animationDelay: `${seededRandom(i * 6.1) * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
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

        {/* Solar System Container */}
        <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[500px] md:max-w-[580px] lg:max-w-[640px]">
          
          {/* Orbit rings with subtle glow */}
          {APPS.map((app) => (
            <div
              key={`ring-${app.slug}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{
                width: `${app.orbitRadius * 2}%`,
                height: `${app.orbitRadius * 2}%`,
                border: hoveredApp === app.slug 
                  ? `1.5px solid ${app.accent}50` 
                  : "1px dashed rgba(255,255,255,0.08)",
                boxShadow: hoveredApp === app.slug 
                  ? `0 0 20px ${app.accent}20, inset 0 0 20px ${app.accent}10` 
                  : "none",
              }}
            />
          ))}

          {/* Central Sun with 3D effect */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            {/* Corona outer glow */}
            <div
              className="animate-sun-corona absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 160,
                height: 160,
                background: "radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(251,191,36,0.08) 40%, transparent 70%)",
                filter: "blur(15px)",
              }}
            />
            {/* Corona middle layer */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 120,
                height: 120,
                background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(245,158,11,0.15) 50%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            {/* Sun body with 3D gradient */}
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
              style={{
                background: "radial-gradient(circle at 30% 25%, #fef9c3 0%, #fde047 25%, #fbbf24 50%, #f59e0b 75%, #b45309 100%)",
                boxShadow: `
                  0 0 50px rgba(251,191,36,0.6),
                  0 0 100px rgba(251,191,36,0.3),
                  inset -8px -8px 20px rgba(180,83,9,0.5),
                  inset 4px 4px 15px rgba(254,249,195,0.6)
                `,
              }}
            >
              <span className="text-3xl font-bold text-white drop-shadow-lg sm:text-4xl" style={{ textShadow: "0 2px 10px rgba(180,83,9,0.8)" }}>
                S
              </span>
            </div>
            <p className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-white/40">
              SoloSuccess Core
            </p>
          </div>

          {/* Orbiting Planets */}
          {APPS.map((app, index) => {
            const isHovered = hoveredApp === app.slug
            // Each planet starts at a different point in its orbit using negative animation-delay
            const delayOffset = (index / APPS.length) * app.orbitDuration
            
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
                  animationDelay: `-${delayOffset}s`,
                }}
              >
                {/* Planet positioned at top center of orbit ring, counter-rotates to stay upright */}
                <Link
                  href={app.href}
                  className="absolute left-1/2 top-0 z-10 block -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110"
                  style={{
                    animation: `orbit-rotate ${app.orbitDuration}s linear infinite reverse`,
                    animationDelay: `-${delayOffset}s`,
                  }}
                  onMouseEnter={() => setHoveredApp(app.slug)}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  {/* Planet glow */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{
                      width: app.size * 2,
                      height: app.size * 2,
                      background: `radial-gradient(circle, ${app.accent}${isHovered ? "40" : "20"} 0%, transparent 70%)`,
                      filter: "blur(10px)",
                    }}
                  />
                  
                  {/* Planet body with 3D effect */}
                  <div
                    className="relative overflow-hidden rounded-full transition-shadow duration-300"
                    style={{
                      width: app.size,
                      height: app.size,
                      background: `
                        radial-gradient(circle at 25% 20%, white 0%, transparent 25%),
                        radial-gradient(circle at 30% 25%, ${app.accent} 0%, ${app.accent}dd 35%, ${app.accent}aa 60%, ${app.accent}66 100%)
                      `,
                      boxShadow: isHovered
                        ? `0 0 30px ${app.accent}80, 0 0 60px ${app.accent}40, inset -6px -6px 15px rgba(0,0,0,0.5), inset 3px 3px 10px rgba(255,255,255,0.3)`
                        : `inset -5px -5px 12px rgba(0,0,0,0.4), inset 2px 2px 8px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {/* Logo image */}
                    <Image
                      src={app.placeholder}
                      alt={app.name}
                      fill
                      className="object-cover opacity-75 mix-blend-overlay"
                      sizes={`${app.size}px`}
                    />
                  </div>

                  {/* Planet label */}
                  <span
                    className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? app.accent : "rgba(0,0,0,0.6)",
                      color: isHovered ? "#000" : "#fff",
                      boxShadow: isHovered ? `0 0 10px ${app.accent}60` : "none",
                    }}
                  >
                    {app.name.replace("SoloSuccess ", "").replace("Solo", "")}
                  </span>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div
                      className="absolute left-full top-1/2 z-30 ml-4 w-48 -translate-y-1/2 rounded-xl border border-white/10 bg-black/90 p-3 backdrop-blur-lg sm:w-52"
                      style={{ boxShadow: `0 0 30px ${app.accent}30, 0 8px 32px rgba(0,0,0,0.5)` }}
                    >
                      <div className="mb-2 h-1 w-8 rounded-full" style={{ backgroundColor: app.accent }} />
                      <p className="text-sm font-bold text-white">{app.name}</p>
                      <p className="mt-0.5 text-xs font-medium" style={{ color: app.accent }}>{app.tagline}</p>
                      <p className="mt-2 text-[11px] leading-relaxed text-white/60">{app.desc}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-white">
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
        <p className="mt-12 text-center text-xs font-medium uppercase tracking-widest text-white/30">
          Hover over a planet to explore
        </p>
      </div>
    </section>
  )
}
