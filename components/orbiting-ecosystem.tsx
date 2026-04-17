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
  Icon: typeof Brain
  startAngle: number
  orbitSpeed: number
}

// Five satellites evenly distributed around the core
const SATELLITES: Satellite[] = [
  {
    slug: "ai",
    chip: "AI",
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity",
    desc: "Automations, content, and insight calibrated for solo operators.",
    href: "/brands/ai",
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
    Icon: PenLine,
    startAngle: -Math.PI / 2 + (8 * Math.PI) / 5,
    orbitSpeed: 0.047,
  },
]

export function OrbitingEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<Array<HTMLElement | null>>([])
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [cardSide, setCardSide] = useState<"left" | "right">("right")
  const hoveredRef = useRef<number | null>(null)

  // Per-orb physics state — lives in a ref so we don't re-render per frame.
  // Seed with a reasonable orbital position so SSR and first paint don't
  // pile all spheres at the center before the rAF loop takes over.
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
  const sizeRef = useRef({ width: 800, height: 600 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      sizeRef.current = { width: rect.width, height: rect.height }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    const handleMove = (e: PointerEvent) => {
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
    el.addEventListener("pointermove", handleMove)
    el.addEventListener("pointerleave", handleLeave)

    // Respect reduced motion — lock orbs to static orbit positions
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

      physicsRef.current.forEach((st, i) => {
        if (!reduceMotion) {
          // Advance orbital angle for gentle rotation around the core
          st.angle += SATELLITES[i].orbitSpeed * dt
        }

        // Add a subtle breathing to the orbit radius per orb
        const rMod = baseRadius * (1 + Math.sin(t / 2400 + i * 1.3) * 0.025)
        const tx = Math.cos(st.angle) * rMod
        const ty = Math.sin(st.angle) * rMod

        // Spring force toward the current orbital target
        const k = 9
        const damping = 0.82
        let ax = (tx - st.currentX) * k
        let ay = (ty - st.currentY) * k

        // Mouse repulsion — skip for the currently hovered orb so it stays put
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
      el.removeEventListener("pointermove", handleMove)
      el.removeEventListener("pointerleave", handleLeave)
    }
  }, [])

  const handleEnter = (i: number) => {
    hoveredRef.current = i
    const x = physicsRef.current[i].currentX
    // Card flips to the side that points toward center — keeps it in view.
    setCardSide(x >= 0 ? "left" : "right")
    setHoveredIdx(i)
  }
  const handleLeave = () => {
    hoveredRef.current = null
    setHoveredIdx(null)
  }

  return (
    <section
      id="ecosystem"
      className="relative isolate w-full overflow-hidden"
      style={{ backgroundColor: "#141416" }}
      aria-label="SoloSuccess brand ecosystem"
    >
      {/* Matte charcoal atmospheric layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(0,255,255,0.04) 0%, transparent 40%), radial-gradient(ellipse at 85% 10%, rgba(255,0,255,0.04) 0%, transparent 45%)",
        }}
      />
      {/* Fine grain dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center px-6 py-24">
        {/* Title block — Liquid Neo-Brutalism */}
        <div className="relative z-20 mb-10 flex flex-col items-center gap-5 text-center md:mb-12">
          <NeoBadge>The Ecosystem</NeoBadge>
          <h1
            className="max-w-3xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl"
            style={{ textShadow: "4px 4px 0 #000" }}
          >
            A living system
            <br />
            for solo creators.
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/75 md:text-base">
            Five brands drifting around a single idea — independence, amplified.
            Hover a sphere to step inside.
          </p>
        </div>

        {/* Physics stage */}
        <div
          ref={containerRef}
          className="relative z-10 aspect-square w-full max-w-[760px]"
        >
          {/* Orbit rings — whisper-thin guides */}
          <OrbitRings />

          {/* Core */}
          <CentralOrb />

          {/* Satellites */}
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
              className="absolute left-1/2 top-1/2 block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141416]"
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
          )})}
        </div>

        {/* Footnote hint */}
        <p className="relative z-10 mt-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
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
      className="inline-flex items-center gap-2 border border-white bg-[#141416] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white"
      style={{ boxShadow: "4px 4px 0 0 #000" }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
      {children}
    </div>
  )
}

function OrbitRings() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: "1px dashed rgba(255,255,255,0.06)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.04)" }}
      />
    </>
  )
}

function CentralOrb() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
        {/* Iridescent aurora halo */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl md:h-[320px] md:w-[320px]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(0,255,255,0.35), rgba(255,0,255,0.35), rgba(190,242,100,0.35), rgba(255,215,0,0.35), rgba(0,255,255,0.35))",
            animation: "orb-spin 18s linear infinite",
          }}
        />
        {/* Pulsing core */}
        <div
          className="relative h-32 w-32 rounded-full border border-white/25 md:h-44 md:w-44"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 22%, rgba(20,20,22,0.9) 62%, rgba(0,0,0,0.98) 100%)",
            boxShadow:
              "0 0 60px rgba(125,211,252,0.28), 0 0 120px rgba(240,171,252,0.2), inset 0 -22px 40px rgba(0,0,0,0.85), inset 0 10px 30px rgba(255,255,255,0.12)",
            animation: "core-pulse 4.2s ease-in-out infinite",
          }}
        >
          {/* Iridescent inner sheen */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-40 mix-blend-screen"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(0,255,255,0.5), rgba(255,0,255,0.5), rgba(190,242,100,0.5), rgba(255,215,0,0.5), rgba(0,255,255,0.5))",
              animation: "orb-spin 9s linear infinite reverse",
            }}
          />
          {/* Specular highlight */}
          <div
            aria-hidden="true"
            className="absolute left-[22%] top-[18%] h-5 w-8 rounded-full bg-white/70"
            style={{ filter: "blur(6px)" }}
          />
          {/* Label */}
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="font-black text-[9px] tracking-[0.35em] text-white md:text-[11px]"
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.95)" }}
            >
              SOLOSUCCESS
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SatelliteSphere({ sat, active }: { sat: Satellite; active: boolean }) {
  const Icon = sat.Icon
  return (
    <div className="relative">
      {/* Metallic rainbow glow — cyan / magenta / lime / gold */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 md:h-[170px] md:w-[170px]"
        style={{
          opacity: active ? 1 : 0,
          background:
            "conic-gradient(from 0deg, #00ffff, #ff00ff, #bef264, #ffd700, #00ffff)",
          filter: "blur(28px)",
          animation: active ? "orb-spin 3.5s linear infinite" : "none",
        }}
      />
      {/* Sphere body */}
      <div
        className="relative h-[72px] w-[72px] rounded-full border border-white/25 transition-transform duration-300 md:h-[88px] md:w-[88px]"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45), rgba(255,255,255,0.08) 30%, rgba(20,20,22,0.95) 80%)",
          boxShadow: active
            ? "0 0 0 1px rgba(255,255,255,0.9), 0 12px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.28), inset 0 -12px 20px rgba(0,0,0,0.6), inset 0 6px 18px rgba(255,255,255,0.18)"
            : "0 10px 28px rgba(0,0,0,0.55), inset 0 -14px 20px rgba(0,0,0,0.6), inset 0 6px 14px rgba(255,255,255,0.12)",
          transform: active ? "scale(1.08)" : "scale(1)",
        }}
      >
        {/* Iridescent conic sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full transition-opacity duration-300 mix-blend-screen"
          style={{
            opacity: active ? 0.75 : 0.28,
            background:
              "conic-gradient(from 120deg, rgba(0,255,255,0.55), rgba(255,0,255,0.55), rgba(190,242,100,0.55), rgba(255,215,0,0.55), rgba(0,255,255,0.55))",
            animation: "orb-spin 6s linear infinite",
          }}
        />
        {/* Specular highlight */}
        <div
          aria-hidden="true"
          className="absolute left-[22%] top-[18%] h-3 w-5 rounded-full bg-white/75"
          style={{ filter: "blur(3px)" }}
        />
        {/* Icon */}
        <div className="absolute inset-0 grid place-items-center">
          <Icon
            className="h-5 w-5 text-white md:h-6 md:w-6"
            strokeWidth={2.25}
            style={{ filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.95))" }}
          />
        </div>
      </div>

      {/* Chip label — brutalist */}
      <div
        className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap border border-white bg-[#141416] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-white md:text-[10px]"
        style={{ boxShadow: "3px 3px 0 0 #000" }}
      >
        {sat.chip}
      </div>
    </div>
  )
}

function DataCard({ sat, side }: { sat: Satellite; side: "left" | "right" }) {
  const Icon = sat.Icon
  return (
    <div
      className="pointer-events-none absolute top-1/2 hidden w-[260px] -translate-y-1/2 text-left md:block"
      style={
        side === "right"
          ? {
              left: "calc(100% + 28px)",
              animation:
                "card-snap-right 240ms cubic-bezier(0.2,1,0.3,1) both",
            }
          : {
              right: "calc(100% + 28px)",
              animation:
                "card-snap-left 240ms cubic-bezier(0.2,1,0.3,1) both",
            }
      }
    >
      <div
        className="relative overflow-hidden border border-white p-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.12) 100%)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          boxShadow:
            "6px 6px 0 0 #000, inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      >
        {/* Pearlescent sheen sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, transparent 38%, rgba(0,255,255,0.12) 48%, rgba(255,0,255,0.10) 58%, rgba(190,242,100,0.10) 68%, rgba(255,215,0,0.10) 78%, transparent 90%)",
            mixBlendMode: "screen",
          }}
        />

        <div className="relative flex items-start gap-3">
          <div
            className="grid h-8 w-8 shrink-0 place-items-center border border-white bg-[#141416]"
            style={{ boxShadow: "2px 2px 0 0 #000" }}
          >
            <Icon className="h-4 w-4 text-white" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
              Brand · {sat.chip}
            </p>
            <p className="mt-1 text-sm font-black text-white">{sat.name}</p>
          </div>
        </div>

        <p
          className="relative mt-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/95"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.9)" }}
        >
          {sat.tagline}
        </p>
        <p className="relative mt-2 text-xs leading-relaxed text-white/75">
          {sat.desc}
        </p>

        <div className="relative mt-4 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
            Enter
          </span>
          <div
            className="grid h-6 w-6 place-items-center border border-white bg-[#141416]"
            style={{ boxShadow: "2px 2px 0 0 #000" }}
          >
            <ArrowUpRight className="h-3 w-3 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  )
}
