"use client"

import Link from "next/link"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, BookOpen, Brain, Film, PenLine, Users, Palette, ChevronDown } from "lucide-react"

/* ────────────────────────────────────────────────────────────────────────────
 * Ecosystem data — the six satellites that orbit the SoloSuccess core.
 * Each has ONE confident accent color. No gradient stacks on the orbs.
 * ──────────────────────────────────────────────────────────────────────── */
type Satellite = {
  slug: string
  chip: string
  name: string
  tagline: string
  desc: string
  href: string
  accent: string
  Icon: typeof Brain
  startAngle: number
  logo?: string
}

const SATELLITES: Satellite[] = [
  {
    slug: "ai",
    chip: "AI",
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity",
    desc: "Automations, content, and insight calibrated for solo operators.",
    href: "/brands/ai",
    accent: "#00E5FF",
    Icon: Brain,
    startAngle: -Math.PI / 2,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1776685256545-smPzRBOjF1SY6bfuokfIeKPFelkiuR.png",
  },
  {
    slug: "academy",
    chip: "Academy",
    name: "SoloSuccess Academy",
    tagline: "Education for the Solo Journey",
    desc: "Courses, coaching, and playbooks that teach real-world skills.",
    href: "/brands/academy",
    accent: "#B6FF3C",
    Icon: BookOpen,
    startAngle: -Math.PI / 2 + (2 * Math.PI) / 6,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1776685248518-Wkl6uOdwhlotAqnP5moVCgbRnI5Aj7.png",
  },
  {
    slug: "content-factory",
    chip: "Factory",
    name: "Content Factory",
    tagline: "Story at Scale",
    desc: "Done-for-you content that helps you show up with confidence.",
    href: "/brands/content-factory",
    accent: "#FFC53D",
    Icon: Film,
    startAngle: -Math.PI / 2 + (4 * Math.PI) / 6,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1776685242602-ZK0BIdZxkzJDeuRUUiB6eUc0R1C5P9.png",
  },
  {
    slug: "connect",
    chip: "Connect",
    name: "SoloSuccess Connect",
    tagline: "Community & Networking",
    desc: "A curated circle of collaborators, mentors, and partners.",
    href: "/brands/connect",
    accent: "#FF3DAE",
    Icon: Users,
    startAngle: -Math.PI / 2 + (6 * Math.PI) / 6,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SoloConnect_20260419_231708_0000-hKH1sNaJ21M3ZCGoIZxmdvQudL2yge.png",
  },
  {
    slug: "soloscribe",
    chip: "Scribe",
    name: "SoloScribe",
    tagline: "Writing That Converts",
    desc: "Copy, emails, and brand voice written to move readers.",
    href: "/brands/soloscribe",
    accent: "#A78BFA",
    Icon: PenLine,
    startAngle: -Math.PI / 2 + (8 * Math.PI) / 6,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SoloScribe_20260419_233306_0000-uJWqRWTz2PtywX6BwVDfY6H2Qc9rNF.png",
  },
  {
    slug: "solodesign",
    chip: "Design",
    name: "SoloDesign",
    tagline: "Visual Excellence",
    desc: "Brand, web, and creative design that stands out.",
    href: "/brands/solodesign",
    accent: "#FF6B9D",
    Icon: Palette,
    startAngle: -Math.PI / 2 + (10 * Math.PI) / 6,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SoloDesign_20260419_225525_0000-LbokV2tfsnH8rYIE5pqg09OsoMTfcb.png",
  },
]

/* Physics constants — calm, deliberate motion.
   TILT flattens the circle into a horizontal carousel disc seen at an angle. */
const ORBIT_SPEED = 0.00022 // rad / ms
const REPEL_RADIUS = 170
const REPEL_STRENGTH = 0.48
const SPRING = 0.02
const DAMPING = 0.86
const INITIAL_RADIUS = 260
const TILT = 0.32 // vertical squish of the orbit path (1 = flat circle, 0.32 ≈ carousel disc)

export function OrbitingEcosystem() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const orbRefs = useRef<Array<HTMLElement | null>>([])
  const rippleRef = useRef<HTMLDivElement | null>(null)

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [cardSide, setCardSide] = useState<"left" | "right">("right")

  const pointerRef = useRef({ x: -9999, y: -9999, inside: false })
  const rippleStateRef = useRef({ x: 0.5, y: 0.5 })
  const hoveredRef = useRef<number | null>(null)
  const radiusRef = useRef(INITIAL_RADIUS)
  const pausedRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const physicsRef = useRef(
    SATELLITES.map((s) => ({
      angle: s.startAngle,
      currentX: Math.cos(s.startAngle) * INITIAL_RADIUS,
      currentY: Math.sin(s.startAngle) * INITIAL_RADIUS * TILT,
      velX: 0,
      velY: 0,
    })),
  )

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    pointerRef.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
      inside: true,
    }
  }, [])

  const onPointerLeave = useCallback(() => {
    pointerRef.current = { x: -9999, y: -9999, inside: false }
  }, [])

  // Section-wide pointer for the mercury pool — tracks the whole backdrop.
  const onSectionMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 100
    const ny = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty("--mx", `${nx}%`)
    el.style.setProperty("--my", `${ny}%`)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const rect = el.getBoundingClientRect()
      radiusRef.current = Math.max(140, Math.min(280, Math.min(rect.width, rect.height) * 0.36))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    if (reduceMotion) {
      physicsRef.current.forEach((p, i) => {
        const sat = SATELLITES[i]
        const r = radiusRef.current
        const tx = Math.cos(sat.startAngle) * r
        const ty = Math.sin(sat.startAngle) * r * TILT
        p.currentX = tx
        p.currentY = ty
        const node = orbRefs.current[i]
        if (node) {
          const depth = (Math.sin(sat.startAngle) + 1) / 2 // 0 = back, 1 = front
          const scale = 0.62 + depth * 0.56
          node.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), 0)`
          node.style.setProperty("--s", String(scale))
          node.style.setProperty("--o", String(0.55 + depth * 0.45))
          node.style.zIndex = String(Math.round(depth * 20))
        }
      })
      return () => ro.disconnect()
    }

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(48, now - last)
      last = now
      const radius = radiusRef.current
      const { x: px, y: py, inside } = pointerRef.current

      physicsRef.current.forEach((p, i) => {
        // Pause carousel rotation when hovering any satellite
        if (!pausedRef.current) {
          p.angle += ORBIT_SPEED * dt
        }
        // Carousel math: ellipse wider than tall, seen at a tilt.
        const tx = Math.cos(p.angle) * radius
        const ty = Math.sin(p.angle) * radius * TILT

        let ax = (tx - p.currentX) * SPRING
        let ay = (ty - p.currentY) * SPRING

        if (inside && hoveredRef.current !== i) {
          const dx = p.currentX - px
          const dy = p.currentY - py
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const falloff = 1 - dist / REPEL_RADIUS
            const force = falloff * falloff * REPEL_STRENGTH
            ax += (dx / dist) * force
            ay += (dy / dist) * force
          }
        }

        p.velX = (p.velX + ax) * DAMPING
        p.velY = (p.velY + ay) * DAMPING
        p.currentX += p.velX
        p.currentY += p.velY

        // Depth from the angle itself (not the displaced position) so hover
        // repulsion doesn't flicker the scale.
        const depth = (Math.sin(p.angle) + 1) / 2 // 0 = back of disc, 1 = front
        const baseScale = 0.62 + depth * 0.56 // 0.62 at back → 1.18 at front
        const baseOpacity = 0.55 + depth * 0.45
        const z = Math.round(depth * 20) // back orbs slide behind the core (z=10)
        // Hovered orb pops to full readable size regardless of carousel position.
        const isHovered = hoveredRef.current === i
        const scale = isHovered ? Math.max(1.15, baseScale) : baseScale
        const opacity = isHovered ? 1 : baseOpacity

        const node = orbRefs.current[i]
        if (node) {
          // Translate on the link itself; scale + opacity handed to an inner
          // wrapper via CSS vars so the hover data-card isn't scaled with it.
          node.style.transform = `translate3d(calc(-50% + ${p.currentX}px), calc(-50% + ${p.currentY}px), 0)`
          node.style.setProperty("--s", String(scale))
          node.style.setProperty("--o", String(opacity))
          node.style.zIndex = String(isHovered ? 30 : z)
        }
      })

      if (rippleRef.current && inside) {
        const rect = el.getBoundingClientRect()
        const targetX = (px + rect.width / 2) / rect.width
        const targetY = (py + rect.height / 2) / rect.height
        rippleStateRef.current.x += (targetX - rippleStateRef.current.x) * 0.08
        rippleStateRef.current.y += (targetY - rippleStateRef.current.y) * 0.08
        rippleRef.current.style.setProperty("--rx", `${rippleStateRef.current.x * 100}%`)
        rippleRef.current.style.setProperty("--ry", `${rippleStateRef.current.y * 100}%`)
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const handleEnter = useCallback((i: number) => {
    hoveredRef.current = i
    pausedRef.current = true
    const p = physicsRef.current[i]
    setCardSide(p.currentX > 0 ? "left" : "right")
    setHoveredIdx(i)
  }, [])

  const handleLeaveOrb = useCallback(() => {
    hoveredRef.current = null
    pausedRef.current = false
    setHoveredIdx(null)
  }, [])

  // Keyboard navigation — arrow keys cycle through satellites
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      const next = focusedIdx === null ? 0 : (focusedIdx + 1) % SATELLITES.length
      setFocusedIdx(next)
      orbRefs.current[next]?.focus()
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      const prev = focusedIdx === null ? SATELLITES.length - 1 : (focusedIdx - 1 + SATELLITES.length) % SATELLITES.length
      setFocusedIdx(prev)
      orbRefs.current[prev]?.focus()
    } else if (e.key === "Escape") {
      pausedRef.current = false
      setHoveredIdx(null)
      setFocusedIdx(null)
    }
  }, [focusedIdx])

  // Touch gestures — swipe to rotate carousel
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dt = Date.now() - touchStartRef.current.time
    touchStartRef.current = null

    // Only count as swipe if horizontal movement > 50px and < 500ms
    if (Math.abs(dx) > 50 && dt < 500) {
      const direction = dx > 0 ? -1 : 1
      // Rotate all orbs by ~60 degrees (one satellite position)
      physicsRef.current.forEach((p) => {
        p.angle += direction * (Math.PI / 3)
      })
    }
  }, [])

  // Preload orb images
  useEffect(() => {
    const images = ["/orb-core.jpg", "/orb-satellite.jpg"]
    let loaded = 0
    images.forEach((src) => {
      const img = new window.Image()
      img.onload = () => {
        loaded++
        if (loaded === images.length) setImagesLoaded(true)
      }
      img.onerror = () => {
        loaded++
        if (loaded === images.length) setImagesLoaded(true)
      }
      img.src = src
    })
  }, [])

  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() < 0.85 ? 1 : 1.5,
        opacity: 0.12 + Math.random() * 0.2,
      })),
    [],
  )

  return (
    <section
      ref={stageRef}
      onPointerMove={onSectionMove}
      aria-label="SoloSuccess ecosystem"
      className="relative isolate w-full overflow-hidden"
      style={
        {
          backgroundColor: "#0B0B0D",
          ["--mx" as string]: "50%",
          ["--my" as string]: "50%",
        } as React.CSSProperties
      }
    >
      {/* Mercury pool — quiet, single radial follows the cursor across the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(180,200,230,0.055) 0%, rgba(90,110,140,0.025) 42%, transparent 72%)",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 0%, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center px-6 py-24">
        {/* Header */}
        <div className="relative z-20 mb-12 flex flex-col items-center gap-5 text-center md:mb-14">
          <span
            className="inline-flex items-center gap-2 border border-white bg-[#0B0B0D] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            The Ecosystem
          </span>
          <h1
            className="max-w-3xl text-balance font-sans text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ textShadow: "4px 4px 0 #000" }}
          >
            A living system
            <br />
            for solo creators.
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/85 md:text-base">
            Six practices drifting around a single intelligent core. Hover a sphere to step inside.
          </p>
        </div>

        {/* Physics stage */}
        <div
          ref={containerRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          role="region"
          aria-label="Interactive ecosystem carousel. Use arrow keys to navigate between brands, or swipe on touch devices."
          className="relative z-10 aspect-square w-full max-w-[720px] outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B0B0D]"
        >
          {/* Loading shimmer overlay */}
          {!imagesLoaded && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <div
                className="h-40 w-40 animate-pulse rounded-full md:h-52 md:w-52"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 100%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 1.5s ease-in-out infinite",
                }}
              />
            </div>
          )}
          {/* Carousel guide ring — flattened ellipse matching the disc tilt */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
            style={{
              height: `${78 * TILT}%`,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "inset 0 0 60px rgba(255,255,255,0.02)",
            }}
          />
          {/* Trailing mercury ripple */}
          <div
            ref={rippleRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={
              {
                ["--rx" as string]: "50%",
                ["--ry" as string]: "50%",
                background:
                  "radial-gradient(260px circle at var(--rx) var(--ry), rgba(160,180,210,0.08) 0%, transparent 70%)",
              } as React.CSSProperties
            }
          />

          <CoreOrb />

          {SATELLITES.map((s, i) => {
            const ix = Math.cos(s.startAngle) * INITIAL_RADIUS
            const iy = Math.sin(s.startAngle) * INITIAL_RADIUS * TILT
            const depth = (Math.sin(s.startAngle) + 1) / 2
            const iScale = 0.62 + depth * 0.56
            const iZ = Math.round(depth * 20)
            const iOpacity = 0.55 + depth * 0.45
            return (
              <Link
                key={s.slug}
                href={s.href}
                ref={(el) => {
                  orbRefs.current[i] = el as unknown as HTMLElement | null
                }}
                className="group absolute left-1/2 top-1/2 block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
                style={
                  {
                    transform: `translate3d(calc(-50% + ${ix}px), calc(-50% + ${iy}px), 0)`,
                    zIndex: iZ,
                    willChange: "transform",
                    ["--s" as string]: iScale,
                    ["--o" as string]: iOpacity,
                  } as React.CSSProperties
                }
                onPointerEnter={() => handleEnter(i)}
                onPointerLeave={handleLeaveOrb}
                onFocus={() => handleEnter(i)}
                onBlur={handleLeaveOrb}
                aria-label={`Enter ${s.name} — ${s.tagline}`}
              >
                {/* Inner wrapper carries the carousel depth scale + opacity so
                    the data-card (a sibling) stays at full readable size. */}
                <div
                  className="transition-[transform,opacity] duration-300 ease-out"
                  style={{
                    transform: "scale(var(--s, 1))",
                    opacity: "var(--o, 1)" as unknown as number,
                    willChange: "transform, opacity",
                  }}
                >
                  <SatelliteOrb sat={s} active={hoveredIdx === i} />
                </div>
                {hoveredIdx === i && <DataCard sat={s} side={cardSide} />}
              </Link>
            )
          })}
        </div>

        <p className="relative z-10 mt-12 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-white/55">
          Drift&nbsp;&nbsp;·&nbsp;&nbsp;Hover&nbsp;&nbsp;·&nbsp;&nbsp;Explore
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <button
            onClick={() => {
              const nextSection = document.querySelector("section:nth-of-type(2)")
              nextSection?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white/80 focus:outline-none focus-visible:text-white"
            aria-label="Scroll to next section"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDuration: "2s" }} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * CoreOrb — uses a real rendered iridescent glass sphere image.
 * ──────────────────────────────────────────────────────────────────────── */
function CoreOrb() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 10 }}
    >
      <div className="relative">
        {/* Ambient bloom around the core */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(0,229,255,0.25), rgba(255,61,174,0.25), rgba(182,255,60,0.20), rgba(255,197,61,0.22), rgba(0,229,255,0.25))",
            animation: "orb-spin 40s linear infinite",
          }}
        />
        {/* Orb body — real image */}
        <div
          className="relative h-40 w-40 overflow-hidden rounded-full md:h-52 md:w-52"
          style={{
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.18)",
            animation: "core-pulse 5.6s ease-in-out infinite",
          }}
        >
          <Image
            src="/orb-core.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 160px, 208px"
            className="object-cover"
          />

          {/* SoloSuccess Solutions logo overlay */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1776685267325-EQZR6T6PrrQwPdbCwgoXueun8g3Ml9.png"
            alt="SoloSuccess Solutions"
            fill
            sizes="(max-width: 768px) 160px, 208px"
            className="object-contain p-4"
            style={{
              opacity: 0.8,
              mixBlendMode: "screen",
            }}
          />

          {/* Crisp specular */}
          <div
            aria-hidden
            className="absolute rounded-full bg-white"
            style={{
              top: "16%",
              left: "22%",
              width: "18%",
              height: "10%",
              filter: "blur(3px)",
              opacity: 0.7,
            }}
          />
        </div>
        {/* Wordmark chip under core */}
        <div
          className="absolute left-1/2 top-[calc(100%+14px)] -translate-x-1/2 whitespace-nowrap border border-white bg-[#0B0B0D] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.32em] text-white"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          SoloSuccess · Core
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * SatelliteOrb — dark glass sphere image, accent halo + icon on top.
 * ──────────────────────────────────────────────────────────────────────── */
function SatelliteOrb({ sat, active }: { sat: Satellite; active: boolean }) {
  const Icon = sat.Icon
  return (
    <div className="relative">
      {/* Accent halo — tinted with the orb's color, only on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-400"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(circle, ${sat.accent}55 0%, ${sat.accent}22 38%, transparent 70%)`,
          filter: "blur(12px)",
        }}
      />

      {/* Orb body — real rendered sphere */}
      <div
        className="relative h-[84px] w-[84px] overflow-hidden rounded-full transition-transform duration-400 ease-out md:h-[98px] md:w-[98px]"
        style={{
          transform: active ? "scale(1.1)" : "scale(1)",
          boxShadow: active
            ? `0 18px 40px -12px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px ${sat.accent}cc`
            : "0 16px 34px -12px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        <Image
          src="/orb-satellite.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 84px, 98px"
          className="object-cover"
        />

        {/* Logo overlay — if satellite has a logo, display it as a subtle centered emblem */}
        {sat.logo && (
          <Image
            src={sat.logo}
            alt={sat.name}
            fill
            sizes="(max-width: 768px) 84px, 98px"
            className="object-contain p-1 opacity-85 transition-opacity duration-400"
            style={{
              opacity: active ? 1 : 0.65,
              mixBlendMode: "screen",
            }}
          />
        )}

        {/* Accent color wash — blended onto the glass only when active */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full transition-opacity duration-400"
          style={{
            background: `radial-gradient(circle at 32% 30%, ${sat.accent}, transparent 65%)`,
            mixBlendMode: "overlay",
            opacity: active ? 0.75 : 0,
          }}
        />

        {/* Crisp specular */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            top: "16%",
            left: "22%",
            width: "18%",
            height: "10%",
            filter: "blur(2px)",
            opacity: 0.6,
          }}
        />

        {/* Icon */}
        <div className="absolute inset-0 grid place-items-center">
          <Icon
            className="h-5 w-5 text-white md:h-6 md:w-6"
            strokeWidth={1.75}
            style={{ filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.9))" }}
          />
        </div>
      </div>

      {/* Chip label */}
      <div
        className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap border border-white bg-[#0B0B0D] px-2 py-[3px] font-mono text-[9px] font-black uppercase tracking-[0.22em] text-white transition-opacity"
        style={{
          boxShadow: "3px 3px 0 0 #000",
          opacity: active ? 1 : 0.78,
        }}
      >
        {sat.chip}
      </div>
    </div>
  )
}

/* ──────────────────────────��─────────────���───────────────────────────────────
 * DataCard — Neo-Brutalist glass card with slow iridescent border cycle.
 * ──────────────────────────────────────────────────────────────────────── */
function DataCard({ sat, side }: { sat: Satellite; side: "left" | "right" }) {
  const isRight = side === "right"
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute top-1/2 z-30 w-[260px] border bg-[#0B0B0D]/92 p-4 backdrop-blur-md"
      style={{
        [isRight ? "left" : "right"]: "calc(100% + 22px)",
        transform: "translateY(-50%)",
        animation: `${isRight ? "card-snap-right" : "card-snap-left"} 200ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards, border-iridescent 14s linear infinite`,
        borderColor: sat.accent,
        boxShadow: `6px 6px 0 0 #000, 0 0 0 1px ${sat.accent}`,
      }}
    >
      {/* Accent stripe */}
      <div
        aria-hidden
        className="mb-3 h-[3px] w-10"
        style={{ backgroundColor: sat.accent }}
      />

      <div className="mb-1 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
        {sat.slug === "ai" ? "Intelligent Core" : "Practice"}
      </div>
      <div className="mb-1.5 font-sans text-lg font-black leading-tight text-white">
        {sat.name}
      </div>
      <div
        className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: sat.accent }}
      >
        {sat.tagline}
      </div>
      <p className="mb-3 text-sm leading-relaxed text-white/90">{sat.desc}</p>

      <div className="flex items-center gap-1.5 font-mono text-[11px] font-black uppercase tracking-[0.22em] text-white">
        <span>Enter</span>
        <ArrowUpRight className="h-3.5 w-3.5" style={{ color: sat.accent }} strokeWidth={2.5} />
      </div>
    </div>
  )
}
