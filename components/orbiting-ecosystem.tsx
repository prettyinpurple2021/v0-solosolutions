"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowUpRight, BookOpen, Brain, Film, PenLine, Users } from "lucide-react"

type Satellite = {
  slug: string
  chip: string
  name: string
  tagline: string
  desc: string
  href: string
  color: string
  Icon: typeof Brain
  startAngle: number
  orbitSpeed: number
}

// Five satellites evenly distributed around the core.
// Each owns a single accent color from the brand palette — used for the
// subtle rim-light and the iridescent arc on hover so the visual reads as
// "clean glass orb" instead of "muddy rainbow puddle".
const SATELLITES: Satellite[] = [
  {
    slug: "ai",
    chip: "AI",
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity",
    desc: "Automations, content, and insight calibrated for solo operators.",
    href: "/brands/ai",
    color: "#3AA6FF",
    Icon: Brain,
    startAngle: -Math.PI / 2,
    orbitSpeed: 0.045,
  },
  {
    slug: "academy",
    chip: "Academy",
    name: "SoloSuccess Academy",
    tagline: "Education for the Solo Journey",
    desc: "Courses, coaching, and playbooks that teach real-world skills.",
    href: "/brands/academy",
    color: "#4FD37A",
    Icon: BookOpen,
    startAngle: -Math.PI / 2 + (2 * Math.PI) / 5,
    orbitSpeed: 0.04,
  },
  {
    slug: "content-factory",
    chip: "Factory",
    name: "Content Factory",
    tagline: "Story at Scale",
    desc: "Done-for-you content that helps you show up with confidence.",
    href: "/brands/content-factory",
    color: "#FFA63A",
    Icon: Film,
    startAngle: -Math.PI / 2 + (4 * Math.PI) / 5,
    orbitSpeed: 0.038,
  },
  {
    slug: "connect",
    chip: "Connect",
    name: "SoloSuccess Connect",
    tagline: "Community & Networking",
    desc: "A curated circle of collaborators, mentors, and partners.",
    href: "/brands/connect",
    color: "#FF5A6A",
    Icon: Users,
    startAngle: -Math.PI / 2 + (6 * Math.PI) / 5,
    orbitSpeed: 0.042,
  },
  {
    slug: "soloscribe",
    chip: "Scribe",
    name: "SoloScribe",
    tagline: "Writing That Converts",
    desc: "Copy, emails, and brand voice written to move readers.",
    href: "/brands/soloscribe",
    color: "#B481FF",
    Icon: PenLine,
    startAngle: -Math.PI / 2 + (8 * Math.PI) / 5,
    orbitSpeed: 0.047,
  },
]

export function OrbitingEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const mercuryRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<Array<HTMLElement | null>>([])
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [cardSide, setCardSide] = useState<"left" | "right">("right")
  const hoveredRef = useRef<number | null>(null)

  const INITIAL_RADIUS = 240
  const physicsRef = useRef(
    SATELLITES.map((s) => ({
      angle: s.startAngle,
      currentX: Math.cos(s.startAngle) * INITIAL_RADIUS,
      currentY: Math.sin(s.startAngle) * INITIAL_RADIUS,
      velX: 0,
      velY: 0,
    })),
  )
  const mouseRef = useRef({ x: 99999, y: 99999, inside: false })
  const rippleRef = useRef({ x: 0, y: 0 })
  const sizeRef = useRef({ width: 800, height: 600 })

  useEffect(() => {
    const stage = stageRef.current
    const el = containerRef.current
    if (!el || !stage) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      sizeRef.current = { width: rect.width, height: rect.height }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    const handleMove = (e: PointerEvent) => {
      const stageRect = stage.getBoundingClientRect()
      stage.style.setProperty("--mx", `${e.clientX - stageRect.left}px`)
      stage.style.setProperty("--my", `${e.clientY - stageRect.top}px`)

      const rect = el.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
        inside: true,
      }
    }
    const handleLeave = () => {
      mouseRef.current.inside = false
      mouseRef.current.x = 99999
      mouseRef.current.y = 99999
    }
    stage.addEventListener("pointermove", handleMove)
    stage.addEventListener("pointerleave", handleLeave)

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    let last = performance.now()

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.04)
      last = t

      const { width, height } = sizeRef.current
      const baseRadius = Math.max(150, Math.min(width, height) * 0.36)

      if (mouseRef.current.inside) {
        rippleRef.current.x += (mouseRef.current.x - rippleRef.current.x) * 0.06
        rippleRef.current.y += (mouseRef.current.y - rippleRef.current.y) * 0.06
      } else {
        rippleRef.current.x *= 0.96
        rippleRef.current.y *= 0.96
      }
      const mercury = mercuryRef.current
      if (mercury) {
        mercury.style.setProperty("--rx", `${rippleRef.current.x}px`)
        mercury.style.setProperty("--ry", `${rippleRef.current.y}px`)
      }

      physicsRef.current.forEach((st, i) => {
        if (!reduceMotion) {
          st.angle += SATELLITES[i].orbitSpeed * dt
        }

        const rMod = baseRadius * (1 + Math.sin(t / 2400 + i * 1.3) * 0.025)
        const tx = Math.cos(st.angle) * rMod
        const ty = Math.sin(st.angle) * rMod

        const k = 9
        const damping = 0.82
        let ax = (tx - st.currentX) * k
        let ay = (ty - st.currentY) * k

        if (!reduceMotion && mouseRef.current.inside && hoveredRef.current !== i) {
          const dx = st.currentX - mouseRef.current.x
          const dy = st.currentY - mouseRef.current.y
          const d = Math.hypot(dx, dy)
          const range = 150
          if (d < range && d > 0.001) {
            const strength = (1 - d / range) * 1100
            ax += (dx / d) * strength
            ay += (dy / d) * strength
          }
        }

        st.velX = (st.velX + ax * dt) * damping
        st.velY = (st.velY + ay * dt) * damping
        st.currentX += st.velX * dt
        st.currentY += st.velY * dt

        const node = orbRefs.current[i]
        if (node) {
          node.style.transform = `translate3d(calc(-50% + ${st.currentX}px), calc(-50% + ${st.currentY}px), 0)`
        }
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      stage.removeEventListener("pointermove", handleMove)
      stage.removeEventListener("pointerleave", handleLeave)
    }
  }, [])

  const handleEnter = (i: number) => {
    hoveredRef.current = i
    const x = physicsRef.current[i].currentX
    setCardSide(x >= 0 ? "left" : "right")
    setHoveredIdx(i)
  }
  const handleLeave = () => {
    hoveredRef.current = null
    setHoveredIdx(null)
  }

  return (
    <section
      ref={stageRef}
      id="ecosystem"
      className="relative isolate w-full overflow-hidden"
      style={
        {
          backgroundColor: "#0b0b0d",
          ["--mx" as string]: "50%",
          ["--my" as string]: "50%",
        } as React.CSSProperties
      }
      aria-label="SoloSuccess brand ecosystem"
    >
      {/* Mercury pool — a single, very subtle cursor-following pool of light.
          Intentionally low-contrast so it reads as atmosphere, not decoration. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(180,200,230,0.06) 0%, rgba(90,110,140,0.03) 40%, transparent 70%)",
        }}
      />
      {/* One soft vignette for depth — no more, no grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 0%, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center px-6 py-24">
        {/* Title block — Liquid Neo-Brutalism */}
        <div className="relative z-20 mb-12 flex flex-col items-center gap-5 text-center md:mb-14">
          <NeoBadge>The Ecosystem</NeoBadge>
          <h1
            className="max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl"
            style={{ textShadow: "4px 4px 0 #000" }}
          >
            A living system
            <br />
            for solo creators.
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/80 md:text-base">
            Five brands drifting around a single idea — independence, amplified.
            Hover a sphere to step inside.
          </p>
        </div>

        {/* Physics stage */}
        <div
          ref={containerRef}
          className="relative z-10 aspect-square w-full max-w-[760px]"
        >
          {/* Concentric mercury ripple — trails the eased ripple point */}
          <div
            ref={mercuryRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={
              {
                ["--rx" as string]: "0px",
                ["--ry" as string]: "0px",
                background:
                  "radial-gradient(180px circle at calc(50% + var(--rx)) calc(50% + var(--ry)), rgba(160,180,210,0.08) 0%, rgba(80,100,130,0.03) 45%, transparent 70%)",
              } as React.CSSProperties
            }
          />

          {/* Orbit ring — one whisper-thin guide */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          />

          <CentralOrb />

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
                className="absolute left-1/2 top-1/2 block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0d]"
                style={{
                  transform: `translate3d(calc(-50% + ${ix}px), calc(-50% + ${iy}px), 0)`,
                  willChange: "transform",
                }}
                onPointerEnter={() => handleEnter(i)}
                onPointerLeave={handleLeave}
                onFocus={() => handleEnter(i)}
                onBlur={handleLeave}
                aria-label={`Enter ${s.name} — ${s.tagline}`}
              >
                <SatelliteSphere sat={s} active={hoveredIdx === i} />
                {hoveredIdx === i && <DataCard sat={s} side={cardSide} />}
              </Link>
            )
          })}
        </div>

        <p className="relative z-10 mt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
          Drift&nbsp;&nbsp;·&nbsp;&nbsp;Hover&nbsp;&nbsp;·&nbsp;&nbsp;Explore
        </p>
      </div>
    </section>
  )
}

/* ---------- Pieces ---------- */

function NeoBadge({ children }: { children: ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 border border-white bg-[#0b0b0d] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white"
      style={{ boxShadow: "4px 4px 0 0 #000" }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
      {children}
    </div>
  )
}

/* Central orb — a real glass sphere.
   Structure (back to front):
     1. slow iridescent halo behind the sphere
     2. sphere body: dark radial with off-center highlight → reads as 3D
     3. a single thin iridescent rim (anisotropic arc, not all-over streaks)
     4. crisp white specular highlight at top-left
     5. soft bottom shadow inside the sphere
     6. centered wordmark */
function CentralOrb() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
        {/* Slow ambient halo — one color at a time, rotates */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl md:h-[320px] md:w-[320px]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(58,166,255,0.35), rgba(180,129,255,0.35), rgba(255,90,106,0.30), rgba(255,166,58,0.30), rgba(79,211,122,0.30), rgba(58,166,255,0.35))",
            animation: "orb-spin 40s linear infinite",
          }}
        />
        {/* Sphere body */}
        <div
          className="relative h-36 w-36 overflow-hidden rounded-full md:h-48 md:w-48"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #2a2d36 0%, #16171c 42%, #0a0b0f 80%)",
            boxShadow:
              "inset 0 -24px 40px rgba(0,0,0,0.9), inset 0 10px 24px rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.6)",
            animation: "core-pulse 4.8s ease-in-out infinite",
          }}
        >
          {/* Thin iridescent rim — conic gradient, slow rotation.
              This is the only place color lives on the orb body, so it reads
              as a crisp metallic edge instead of a muddy surface. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              padding: "1px",
              background:
                "conic-gradient(from 0deg, #3AA6FF, #B481FF, #FF5A6A, #FFA63A, #4FD37A, #3AA6FF)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              opacity: 0.55,
              animation: "orb-spin 18s linear infinite",
            }}
          />
          {/* Specular highlight — the "this is glass" tell */}
          <div
            aria-hidden="true"
            className="absolute h-8 w-16 rounded-full bg-white/70"
            style={{
              top: "14%",
              left: "20%",
              filter: "blur(8px)",
              transform: "rotate(-24deg)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute h-2 w-5 rounded-full bg-white"
            style={{
              top: "22%",
              left: "30%",
              filter: "blur(1.5px)",
            }}
          />
          {/* Wordmark */}
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="font-black text-[10px] tracking-[0.32em] text-white md:text-[12px]"
              style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.9)" }}
            >
              SOLOSUCCESS
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Satellite sphere — same glass recipe as the core, scaled down, with:
   - one accent-colored rim light that intensifies on hover
   - a single sharp iridescent arc that rotates across the top on hover
     (this is the anisotropic "streak" — ONE clean band, not five) */
function SatelliteSphere({ sat, active }: { sat: Satellite; active: boolean }) {
  const Icon = sat.Icon

  return (
    <div className="relative">
      {/* Hover halo — tinted with the orb's accent color, crisp not muddy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 md:h-[170px] md:w-[170px]"
        style={{
          opacity: active ? 0.9 : 0,
          background: `radial-gradient(circle, ${sat.color}55 0%, ${sat.color}22 40%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Sphere body */}
      <div
        className="relative h-[76px] w-[76px] overflow-hidden rounded-full transition-transform duration-300 md:h-[92px] md:w-[92px]"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #2a2d36 0%, #16171c 45%, #0a0b0f 85%)",
          boxShadow: active
            ? `inset 0 -14px 22px rgba(0,0,0,0.85), inset 0 6px 14px rgba(255,255,255,0.12), 0 0 0 1px ${sat.color}aa, 0 18px 40px rgba(0,0,0,0.6)`
            : "inset 0 -14px 22px rgba(0,0,0,0.85), inset 0 6px 14px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.06), 0 12px 28px rgba(0,0,0,0.55)",
          transform: active ? "scale(1.08)" : "scale(1)",
        }}
      >
        {/* Iridescent rim — conic gradient, very thin, becomes prominent on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            padding: "1px",
            background:
              "conic-gradient(from 0deg, #3AA6FF, #B481FF, #FF5A6A, #FFA63A, #4FD37A, #3AA6FF)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: active ? 0.85 : 0.25,
            animation: `orb-spin ${active ? "6s" : "22s"} linear infinite`,
          }}
        />

        {/* Anisotropic streak — a single sharp iridescent arc across the top.
            Only appears on hover. Clipped to the sphere. */}
        {active && (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(58,166,255,0.9) 46%, rgba(180,129,255,0.9) 50%, rgba(255,90,106,0.9) 54%, rgba(255,166,58,0.9) 58%, transparent 64%)",
              backgroundSize: "220% 100%",
              mixBlendMode: "screen",
              opacity: 0.7,
              filter: "blur(0.5px)",
              animation: "aniso-sweep 2.4s linear infinite",
            }}
          />
        )}

        {/* Specular highlight */}
        <div
          aria-hidden="true"
          className="absolute h-4 w-8 rounded-full bg-white/60"
          style={{
            top: "14%",
            left: "22%",
            filter: "blur(4px)",
            transform: "rotate(-24deg)",
          }}
        />

        {/* Icon */}
        <div className="absolute inset-0 grid place-items-center">
          <Icon
            className="h-5 w-5 text-white/90 md:h-6 md:w-6"
            strokeWidth={1.75}
            style={{ filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.9))" }}
          />
        </div>
      </div>

      {/* Neo-brutalist chip label beneath the orb */}
      <div
        className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap border border-white bg-[#0b0b0d] px-2 py-[3px] text-[9px] font-black uppercase tracking-[0.22em] text-white transition-opacity"
        style={{
          boxShadow: "3px 3px 0 0 #000",
          opacity: active ? 1 : 0.75,
        }}
      >
        {sat.chip}
      </div>
    </div>
  )
}

/* Data card — Neo-Brutalist glass with slow iridescent border cycle.
   High contrast white-on-dark-glass for legibility. */
function DataCard({
  sat,
  side,
}: {
  sat: Satellite
  side: "left" | "right"
}) {
  const isRight = side === "right"
  return (
    <div
      className="pointer-events-none absolute top-1/2 z-30 w-[240px]"
      style={{
        [isRight ? "left" : "right"]: "calc(100% + 20px)",
        transform: "translateY(-50%)",
        animation: `${isRight ? "card-snap-right" : "card-snap-left"} 180ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
      }}
    >
      <div
        className="relative border border-white p-4 text-white"
        style={{
          background: "rgba(12,13,16,0.88)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          animation: "border-iridescent 14s linear infinite",
        }}
      >
        {/* Pearlescent top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 28%)",
          }}
        />
        {/* Thin accent stripe */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{ background: sat.color }}
        />

        <div className="relative flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 border border-white bg-black px-2 py-[2px] text-[9px] font-black uppercase tracking-[0.22em] text-white">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: sat.color }}
            />
            {sat.chip}
          </span>
          <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>

        <h3
          className="relative mt-3 text-balance text-[15px] font-black leading-tight text-white"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          {sat.name}
        </h3>
        <p className="relative mt-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">
          {sat.tagline}
        </p>
        <p className="relative mt-3 text-[12px] leading-relaxed text-white/85">
          {sat.desc}
        </p>

        <div className="relative mt-4 flex items-center gap-2 border-t border-white/25 pt-3">
          <span className="text-[9px] font-black uppercase tracking-[0.28em] text-white">
            Enter
          </span>
          <span className="h-px flex-1 bg-white/40" />
          <span className="text-[9px] font-black uppercase tracking-[0.28em] text-white/70">
            {sat.slug}
          </span>
        </div>
      </div>
    </div>
  )
}
