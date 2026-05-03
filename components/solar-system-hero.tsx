"use client"

import Link from "next/link"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

/* ────────────────────────────────────────────────────────────────────────────
 * App data — the six apps that orbit the SoloSuccess sun.
 * Placeholder images will be replaced with transparent logo images.
 * ──────────────────────────────────────────────────────────────────────── */
type AppPlanet = {
  slug: string
  name: string
  tagline: string
  desc: string
  href: string
  accent: string
  orbitRadius: number // relative to container (0-1)
  orbitDuration: number // seconds for full orbit
  startAngle: number // radians
  size: number // pixel size of the planet
  placeholder: string // placeholder image path
}

const APPS: AppPlanet[] = [
  {
    slug: "ai",
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity",
    desc: "Automations, content, and insight calibrated for solo operators.",
    href: "/brands/ai",
    accent: "#00E5FF",
    orbitRadius: 0.18,
    orbitDuration: 25,
    startAngle: 0,
    size: 56,
    placeholder: "/logos/ai-placeholder.jpg",
  },
  {
    slug: "academy",
    name: "SoloSuccess Academy",
    tagline: "Education for the Solo Journey",
    desc: "Courses, coaching, and playbooks that teach real-world skills.",
    href: "/brands/academy",
    accent: "#B6FF3C",
    orbitRadius: 0.28,
    orbitDuration: 35,
    startAngle: Math.PI / 3,
    size: 64,
    placeholder: "/logos/academy-placeholder.jpg",
  },
  {
    slug: "content-factory",
    name: "Content Factory",
    tagline: "Story at Scale",
    desc: "Done-for-you content that helps you show up with confidence.",
    href: "/brands/content-factory",
    accent: "#FFC53D",
    orbitRadius: 0.38,
    orbitDuration: 45,
    startAngle: (2 * Math.PI) / 3,
    size: 72,
    placeholder: "/logos/content-factory-placeholder.jpg",
  },
  {
    slug: "connect",
    name: "SoloSuccess Connect",
    tagline: "Community & Networking",
    desc: "A curated circle of collaborators, mentors, and partners.",
    href: "/brands/connect",
    accent: "#FF3DAE",
    orbitRadius: 0.48,
    orbitDuration: 55,
    startAngle: Math.PI,
    size: 68,
    placeholder: "/logos/connect-placeholder.jpg",
  },
  {
    slug: "soloscribe",
    name: "SoloScribe",
    tagline: "Writing That Converts",
    desc: "Copy, emails, and brand voice written to move readers.",
    href: "/brands/soloscribe",
    accent: "#A78BFA",
    orbitRadius: 0.58,
    orbitDuration: 65,
    startAngle: (4 * Math.PI) / 3,
    size: 60,
    placeholder: "/logos/soloscribe-placeholder.jpg",
  },
  {
    slug: "solodesign",
    name: "SoloDesign",
    tagline: "Visual Excellence",
    desc: "Brand, web, and creative design that stands out.",
    href: "/brands/solodesign",
    accent: "#FF6B9D",
    orbitRadius: 0.68,
    orbitDuration: 75,
    startAngle: (5 * Math.PI) / 3,
    size: 64,
    placeholder: "/logos/solodesign-placeholder.jpg",
  },
]

export function SolarSystemHero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const animationRef = useRef<number>(0)
  const anglesRef = useRef<number[]>(APPS.map((app) => app.startAngle))

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Track container dimensions and mobile state
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
      setIsMobile(window.innerWidth < 768)
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Animation loop
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) return

    let lastTime = performance.now()

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000 // Convert to seconds
      lastTime = time

      if (!isPaused) {
        anglesRef.current = anglesRef.current.map((angle, i) => {
          const speed = (2 * Math.PI) / APPS[i].orbitDuration
          return angle + speed * delta
        })
      }

      // Force re-render
      if (containerRef.current) {
        containerRef.current.style.setProperty("--tick", String(time))
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [isPaused])

  // Generate stars - use seeded positions to avoid hydration mismatch
  const stars = useMemo(() => {
    // Use deterministic pseudo-random positions based on index
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000
      return x - Math.floor(x)
    }
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 1.1) * 100,
      top: seededRandom(i * 2.2) * 100,
      size: seededRandom(i * 3.3) < 0.7 ? 1 : seededRandom(i * 3.3) < 0.9 ? 1.5 : 2,
      opacity: 0.15 + seededRandom(i * 4.4) * 0.35,
      animationDelay: seededRandom(i * 5.5) * 3,
    }))
  }, [])

  // Calculate center point
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2
  const maxRadius = Math.min(dimensions.width, dimensions.height) / 2

  return (
    <section
      aria-label="SoloSuccess Solar System"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#030308" }}
    >
      {/* Deep space background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(20,10,40,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(10,20,40,0.3) 0%, transparent 40%), radial-gradient(ellipse at 20% 70%, rgba(30,10,30,0.2) 0%, transparent 35%)",
        }}
      />

      {/* Animated nebula clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Nebula cloud 1 - purple */}
        <div
          className="absolute animate-nebula-drift-1"
          style={{
            width: "600px",
            height: "400px",
            left: "10%",
            top: "20%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
        />
        {/* Nebula cloud 2 - pink/magenta */}
        <div
          className="absolute animate-nebula-drift-2"
          style={{
            width: "500px",
            height: "350px",
            right: "5%",
            top: "40%",
            background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.04) 45%, transparent 70%)",
            filter: "blur(70px)",
            borderRadius: "50%",
          }}
        />
        {/* Nebula cloud 3 - cyan/teal */}
        <div
          className="absolute animate-nebula-pulse"
          style={{
            width: "450px",
            height: "300px",
            left: "50%",
            bottom: "10%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, rgba(0,155,148,0.04) 50%, transparent 70%)",
            filter: "blur(50px)",
            borderRadius: "50%",
          }}
        />
        {/* Nebula cloud 4 - golden/orange accent */}
        <div
          className="absolute animate-nebula-drift-1"
          style={{
            width: "350px",
            height: "250px",
            right: "20%",
            top: "15%",
            background: "radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.03) 50%, transparent 70%)",
            filter: "blur(55px)",
            borderRadius: "50%",
            animationDelay: "-30s",
          }}
        />
      </div>

      {/* Iridescent horizontal line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2"
        style={{ height: "2px" }}
      >
        <div
          className="h-full w-full animate-iridescent-shimmer"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #D93025 10%, #F07B1F 20%, #F5C400 30%, #2D9E2A 40%, #009B94 50%, #005FA3 60%, #6B44A0 70%, #D93025 80%, transparent 100%)",
            backgroundSize: "200% 100%",
            opacity: 0.6,
            filter: "blur(1px)",
          }}
        />
        {/* Glow layer for the line */}
        <div
          className="absolute inset-0 animate-iridescent-shimmer"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #D93025 10%, #F07B1F 20%, #F5C400 30%, #2D9E2A 40%, #009B94 50%, #005FA3 60%, #6B44A0 70%, #D93025 80%, transparent 100%)",
            backgroundSize: "200% 100%",
            filter: "blur(8px)",
            opacity: 0.4,
            animationDelay: "-2s",
          }}
        />
      </div>

      {/* Static nebula glow - subtle base layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(800px circle at 30% 40%, rgba(139,92,246,0.1) 0%, transparent 50%), radial-gradient(600px circle at 70% 60%, rgba(236,72,153,0.08) 0%, transparent 45%)",
        }}
      />

      {/* Stars layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: "#fff",
              opacity: s.opacity,
              animation: `twinkle 3s ease-in-out infinite`,
              animationDelay: `${s.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-16 md:px-6">
        {/* Header */}
        <div className="relative z-20 mb-8 flex flex-col items-center gap-4 text-center md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            The Ecosystem
          </span>
          <h1 className="max-w-4xl text-balance font-sans text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Your Universe of
            <span className="block bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
              Solo Success
            </span>
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/60 md:text-base">
            Six powerful apps orbiting around your entrepreneurial core. Hover to explore each world.
          </p>
        </div>

        {/* Solar system container */}
        <div
          ref={containerRef}
          className="relative aspect-square w-full max-w-[min(90vw,700px)]"
          onMouseEnter={() => {
            if (!isMobile) setIsPaused(true)
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setIsPaused(false)
              setHoveredApp(null)
            }
          }}
          onClick={(e) => {
            // Deselect on tap outside planets (mobile)
            if (isMobile && e.target === e.currentTarget) {
              setSelectedApp(null)
              setIsPaused(false)
            }
          }}
        >
          {/* Orbit rings - SVG for precise dashed paths */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {APPS.map((app) => (
                <linearGradient
                  key={`grad-${app.slug}`}
                  id={`orbit-grad-${app.slug}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0%" y1="50%" x2="100%" y2="50%"
                >
                  <stop offset="0%" stopColor={app.accent} stopOpacity="0.1" />
                  <stop offset="50%" stopColor={app.accent} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={app.accent} stopOpacity="0.1" />
                </linearGradient>
              ))}
            </defs>
            {APPS.map((app) => {
              const isActive = hoveredApp === app.slug || selectedApp === app.slug
              const radius = app.orbitRadius * 50
              return (
                <g key={`orbit-${app.slug}`}>
                  {/* Base orbit path */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={isActive ? app.accent : "rgba(255,255,255,0.08)"}
                    strokeWidth={isActive ? "0.3" : "0.15"}
                    strokeDasharray={isActive ? "none" : "1 2"}
                    className="transition-all duration-500"
                    style={{
                      filter: isActive ? `drop-shadow(0 0 4px ${app.accent})` : "none",
                    }}
                  />
                  {/* Glow orbit when active */}
                  {isActive && (
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke={`url(#orbit-grad-${app.slug})`}
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  )}
                </g>
              )
            })}
          </svg>

          {/* Central Sun */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            {/* Sun glow layers */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
              style={{
                width: "200px",
                height: "200px",
                background:
                  "radial-gradient(circle, rgba(255,200,100,0.3) 0%, rgba(255,150,50,0.15) 40%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "160px",
                height: "160px",
                background:
                  "conic-gradient(from 0deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0, #D93025)",
                opacity: 0.4,
                filter: "blur(30px)",
                animation: "spin 30s linear infinite",
              }}
            />

            {/* Sun body */}
            <div
              className="relative h-28 w-28 rounded-full md:h-36 md:w-36"
              style={{
                background:
                  "radial-gradient(circle at 35% 25%, #fff 0%, #fef3c7 10%, #fbbf24 30%, #f59e0b 50%, #d97706 70%, #92400e 100%)",
                boxShadow:
                  "0 0 60px rgba(251,191,36,0.5), 0 0 120px rgba(251,191,36,0.3), inset 0 -20px 40px rgba(146,64,14,0.5), inset 0 10px 30px rgba(255,255,255,0.3)",
              }}
            >
              {/* Corona effect */}
              <div
                aria-hidden
                className="absolute inset-[-20px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, transparent 35%, rgba(251,191,36,0.1) 50%, transparent 70%)",
                  animation: "pulse 4s ease-in-out infinite",
                }}
              />

              {/* Center logo area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display text-4xl font-bold md:text-5xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #fff 0%, #fef3c7 50%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                >
                  S
                </span>
              </div>

              {/* Surface details */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at 70% 30%, transparent 0%, rgba(0,0,0,0.3) 100%)",
                }}
              />
            </div>

            {/* Label */}
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              SoloSuccess Core
            </div>
          </div>

          {/* Orbiting planets (apps) */}
          {dimensions.width > 0 &&
            APPS.map((app, i) => {
              const angle = anglesRef.current[i]
              const radius = maxRadius * app.orbitRadius
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              const isActive = isMobile ? selectedApp === app.slug : hoveredApp === app.slug

              return (
                <Link
                  key={app.slug}
                  href={isActive && !isMobile ? app.href : "#"}
                  onClick={(e) => {
                    if (isMobile) {
                      e.preventDefault()
                      if (selectedApp === app.slug) {
                        // Second tap - navigate
                        window.location.href = app.href
                      } else {
                        // First tap - select and show info
                        setSelectedApp(app.slug)
                        setIsPaused(true)
                      }
                    }
                  }}
                  className="group absolute left-1/2 top-1/2 z-20 block transition-transform duration-300"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.15 : 1})`,
                  }}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHoveredApp(app.slug)
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredApp(null)
                    }
                  }}
                  aria-label={`${app.name} - ${app.tagline}`}
                >
                  {/* Planet glow */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{
                      width: app.size * 2,
                      height: app.size * 2,
                      background: `radial-gradient(circle, ${app.accent}${isActive ? "50" : "20"} 0%, transparent 70%)`,
                      filter: "blur(10px)",
                    }}
                  />

                  {/* Planet body with placeholder image */}
                  <div
                    className="relative overflow-hidden rounded-full transition-all duration-300"
                    style={{
                      width: app.size,
                      height: app.size,
                      background: `radial-gradient(circle at 30% 25%, ${app.accent}99 0%, ${app.accent}66 40%, ${app.accent}33 100%)`,
                      boxShadow: isActive
                        ? `0 0 30px ${app.accent}60, 0 0 60px ${app.accent}30, inset 0 -10px 20px rgba(0,0,0,0.5), inset 0 5px 15px rgba(255,255,255,0.3)`
                        : `0 10px 30px rgba(0,0,0,0.5), inset 0 -8px 16px rgba(0,0,0,0.4), inset 0 4px 12px rgba(255,255,255,0.2)`,
                    }}
                  >
                    {/* Logo image - placeholder that will be replaced with transparent logos */}
                    <div className="absolute inset-1 overflow-hidden rounded-full">
                      <Image
                        src={app.placeholder}
                        alt={`${app.name} logo`}
                        fill
                        className="object-cover opacity-90 mix-blend-lighten"
                        sizes={`${app.size}px`}
                      />
                    </div>

                    {/* Highlight */}
                    <div
                      aria-hidden
                      className="absolute left-[15%] top-[10%] h-[30%] w-[40%] rounded-full bg-white/30"
                      style={{ filter: "blur(4px)" }}
                    />
                  </div>

                  {/* Planet label */}
                  <div
                    className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? app.accent : "rgba(0,0,0,0.6)",
                      color: isActive ? "#000" : "#fff",
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    {app.name.split(" ").pop()}
                  </div>

                  {/* Info card on hover/tap - positioned based on planet location */}
                  {isActive && (
                    <div
                      className="absolute z-30 w-48 rounded-xl border border-white/10 bg-black/90 p-3 backdrop-blur-xl sm:w-56 sm:p-4"
                      style={{
                        boxShadow: `0 0 40px ${app.accent}20`,
                        // Position card based on where the planet is
                        ...(x > 0
                          ? { right: "100%", marginRight: "12px" }
                          : { left: "100%", marginLeft: "12px" }),
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <div
                        className="mb-2 h-1 w-8 rounded-full"
                        style={{ backgroundColor: app.accent }}
                      />
                      <h3 className="mb-1 text-sm font-bold text-white">
                        {app.name}
                      </h3>
                      <p
                        className="mb-2 text-xs font-medium"
                        style={{ color: app.accent }}
                      >
                        {app.tagline}
                      </p>
                      <p className="mb-3 text-xs leading-relaxed text-white/70">
                        {app.desc}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-white">
                        Explore
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                </Link>
              )
            })}
        </div>

        {/* Subtitle */}
        <p className="relative z-10 mt-8 text-center text-xs font-medium uppercase tracking-widest text-white/40">
          <span className="hidden sm:inline">Hover to pause</span>
          <span className="sm:hidden">Tap to explore</span>
          <span className="hidden sm:inline"> &bull; Click to enter</span>
          <span className="sm:hidden"> &bull; Tap again to enter</span>
        </p>

        {/* Scroll indicator */}
        <button
          onClick={() => {
            const nextSection = document.querySelector("section:nth-of-type(2)")
            nextSection?.scrollIntoView({ behavior: "smooth" })
          }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/70"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown
            className="h-5 w-5 animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </button>
      </div>

    </section>
  )
}
