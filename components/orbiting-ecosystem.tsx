"use client"

import Link from "next/link"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, BookOpen, Brain, Film, PenLine, Users } from "lucide-react"

/* ────────────────────────────────────────────────────────────────────────────
 * Ecosystem data — the five satellites that orbit the SoloSuccess core.
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
    startAngle: -Math.PI / 2 + (2 * Math.PI) / 5,
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
    startAngle: -Math.PI / 2 + (4 * Math.PI) / 5,
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
    startAngle: -Math.PI / 2 + (6 * Math.PI) / 5,
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
    startAngle: -Math.PI / 2 + (8 * Math.PI) / 5,
  },
]

/* Physics constants — calm, deliberate motion. */
const ORBIT_SPEED = 0.00016 // rad / ms
const REPEL_RADIUS = 170
const REPEL_STRENGTH = 0.48
const SPRING = 0.02
const DAMPING = 0.86
const INITIAL_RADIUS = 240

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

  const physicsRef = useRef(
    SATELLITES.map((s) => ({
      angle: s.startAngle,
      currentX: Math.cos(s.startAngle) * INITIAL_RADIUS,
      currentY: Math.sin(s.startAngle) * INITIAL_RADIUS,
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
        const ty = Math.sin(sat.startAngle) * r
        p.currentX = tx
        p.currentY = ty
        const node = orbRefs.current[i]
        if (node) node.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), 0)`
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
        p.angle += ORBIT_SPEED * dt
        const tx = Math.cos(p.angle) * radius
        const ty = Math.sin(p.angle) * radius

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

        const node = orbRefs.current[i]
        if (node) {
          node.style.transform = `translate3d(calc(-50% + ${p.currentX}px), calc(-50% + ${p.currentY}px), 0)`
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
    const p = physicsRef.current[i]
    setCardSide(p.currentX > 0 ? "left" : "right")
    setHoveredIdx(i)
  }, [])

  const handleLeaveOrb = useCallback(() => {
    hoveredRef.current = null
    setHoveredIdx(null)
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
            Five practices drifting around a single intelligent core. Hover a sphere to step inside.
          </p>
        </div>

        {/* Physics stage */}
        <div
          ref={containerRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative z-10 aspect-square w-full max-w-[720px]"
        >
          {/* Orbital guide ring */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ border: "1px solid rgba(255,255,255,0.05)" }}
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
            const iy = Math.sin(s.startAngle) * INITIAL_RADIUS
            return (
              <Link
                key={s.slug}
                href={s.href}
                ref={(el) => {
                  orbRefs.current[i] = el as unknown as HTMLElement | null
                }}
                className="group absolute left-1/2 top-1/2 block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D]"
                style={{
                  transform: `translate3d(calc(-50% + ${ix}px), calc(-50% + ${iy}px), 0)`,
                  willChange: "transform",
                }}
                onPointerEnter={() => handleEnter(i)}
                onPointerLeave={handleLeaveOrb}
                onFocus={() => handleEnter(i)}
                onBlur={handleLeaveOrb}
                aria-label={`Enter ${s.name} — ${s.tagline}`}
              >
                <SatelliteOrb sat={s} active={hoveredIdx === i} />
                {hoveredIdx === i && <DataCard sat={s} side={cardSide} />}
              </Link>
            )
          })}
        </div>

        <p className="relative z-10 mt-12 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-white/55">
          Drift&nbsp;&nbsp;·&nbsp;&nbsp;Hover&nbsp;&nbsp;·&nbsp;&nbsp;Explore
        </p>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * CoreOrb — uses a real rendered iridescent glass sphere image.
 * ──────────────────────────────────────────────────────────────────────── */
function CoreOrb() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

/* ────────────────────────────────────────────────────────────────────────────
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
