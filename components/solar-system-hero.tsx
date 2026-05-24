'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { ArrowUpRight } from 'lucide-react'

// ─── Planet definitions ───────────────────────────────────────────────────────
// Each planet has:
// - orbitRadius: distance from sun center (px at base scale)
// - orbitDuration: seconds for one complete orbit (inner planets faster)
// - startAngle: initial position in degrees (0 = top/12 o'clock, clockwise)
// - size: planet diameter in px
const PLANETS = [
  {
    slug: 'ai',
    name: 'SoloSuccess AI',
    tagline: 'AI-Powered Productivity',
    desc: 'Automations, content, and insight calibrated for solo operators.',
    href: '/brands/ai',
    accent: '#00E5FF',
    orbitRadius: 95,
    orbitDuration: 20,
    startAngle: 0,
    size: 42,
    placeholder: '/logos/ai-placeholder.jpg',
  },
  {
    slug: 'academy',
    name: 'SoloSuccess Academy',
    tagline: 'Education for the Solo Journey',
    desc: 'Courses, coaching, and playbooks that teach real-world skills.',
    href: '/brands/academy',
    accent: '#B6FF3C',
    orbitRadius: 140,
    orbitDuration: 28,
    startAngle: 51,
    size: 46,
    placeholder: '/logos/academy-placeholder.jpg',
  },
  {
    slug: 'content-factory',
    name: 'Content Factory',
    tagline: 'Story at Scale',
    desc: 'Done-for-you content that helps you show up with confidence.',
    href: '/brands/content-factory',
    accent: '#FFC53D',
    orbitRadius: 185,
    orbitDuration: 38,
    startAngle: 103,
    size: 50,
    placeholder: '/logos/content-factory-placeholder.jpg',
  },
  {
    slug: 'connect',
    name: 'SoloSuccess Connect',
    tagline: 'Community & Networking',
    desc: 'A curated circle of collaborators, mentors, and partners.',
    href: '/brands/connect',
    accent: '#FF3DAE',
    orbitRadius: 230,
    orbitDuration: 50,
    startAngle: 154,
    size: 48,
    placeholder: '/logos/connect-placeholder.jpg',
  },
  {
    slug: 'soloscribe',
    name: 'SoloScribe',
    tagline: 'Writing That Converts',
    desc: 'Copy, emails, and brand voice written to move readers.',
    href: '/brands/soloscribe',
    accent: '#A78BFA',
    orbitRadius: 275,
    orbitDuration: 64,
    startAngle: 206,
    size: 44,
    placeholder: '/logos/soloscribe-placeholder.jpg',
  },
  {
    slug: 'soloscout',
    name: 'SoloScout',
    tagline: 'Market Intelligence Agent',
    desc: 'AI-driven opportunity scouting that replaces guesswork with real-world demand signals.',
    href: '/brands/soloscout',
    accent: '#00D4AA',
    orbitRadius: 320,
    orbitDuration: 80,
    startAngle: 257,
    size: 46,
    placeholder: '/logos/soloscout-placeholder.jpg',
  },
  {
    slug: 'solodesign',
    name: 'SoloDesign',
    tagline: 'Visual Excellence',
    desc: 'Brand, web, and creative design that stands out.',
    href: '/brands/solodesign',
    accent: '#FF6B9D',
    orbitRadius: 365,
    orbitDuration: 100,
    startAngle: 309,
    size: 46,
    placeholder: '/logos/solodesign-placeholder.jpg',
  },
]

// Seeded pseudo-random — same value on server and client (no hydration mismatch)
const sr = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const STARS = Array.from({ length: 110 }, (_, i) => ({
  id: i,
  left: sr(i * 1.1) * 100,
  top: sr(i * 2.3) * 100,
  size: sr(i * 3.7) < 0.65 ? 1 : sr(i * 3.7) < 0.88 ? 1.5 : 2,
  opacity: 0.15 + sr(i * 4.9) * 0.55,
  duration: 2 + sr(i * 5.5) * 4,
  delay: sr(i * 6.1) * 6,
}))

// Sun z-index constant - planets will be above or below this
const SUN_Z_INDEX = 20

// Planet state type
type PlanetState = {
  x: number
  y: number
  angle: number
  zIndex: number
}

export function SolarSystemHero() {
  const [hovered, setHovered] = useState<string | null>(null)
  const pausedRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const anglesRef = useRef<number[]>(PLANETS.map(p => p.startAngle))
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)
  
  // Planet positions state (calculated via rAF)
  const [planets, setPlanets] = useState<PlanetState[]>(() =>
    PLANETS.map((p) => {
      const angleRad = (p.startAngle * Math.PI) / 180
      const x = Math.sin(angleRad) * p.orbitRadius
      const y = -Math.cos(angleRad) * p.orbitRadius
      return {
        x,
        y,
        angle: p.startAngle,
        zIndex: y > 0 ? SUN_Z_INDEX + 10 : SUN_Z_INDEX - 5,
      }
    })
  )

  // Calculate z-index based on y position (3D depth simulation)
  // Positive y = bottom half of orbit = in front of sun
  // Negative y = top half of orbit = behind sun
  const getZIndex = (y: number): number => {
    return y > 0 ? SUN_Z_INDEX + 10 : SUN_Z_INDEX - 5
  }

  // Animation loop
  const tick = useCallback((ts: number) => {
    if (lastTimeRef.current === null) lastTimeRef.current = ts
    const dt = Math.min(ts - lastTimeRef.current, 50) // cap at 50ms
    lastTimeRef.current = ts

    if (!pausedRef.current) {
      // Update angles based on each planet's orbital speed
      anglesRef.current = anglesRef.current.map((angle, i) => {
        const speed = 360 / PLANETS[i].orbitDuration // degrees per second
        return (angle + speed * (dt / 1000)) % 360
      })

      // Calculate new positions
      setPlanets(
        anglesRef.current.map((angle, i) => {
          const angleRad = (angle * Math.PI) / 180
          const x = Math.sin(angleRad) * PLANETS[i].orbitRadius
          const y = -Math.cos(angleRad) * PLANETS[i].orbitRadius
          return {
            x,
            y,
            angle,
            zIndex: getZIndex(y),
          }
        })
      )
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // Handle hover pause
  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false
    setHovered(null)
  }, [])

  // Scale factor for responsive sizing
  const containerSize = 800 // Base design size

  // Memoize star rendering
  const starsElement = useMemo(() => (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  ), [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030308]">

      {/* ── Deep space gradient ────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(10,5,25,1) 0%, transparent 70%),
            radial-gradient(ellipse 100% 60% at 50% 0%,   rgba(15,8,35,0.8) 0%, transparent 60%),
            linear-gradient(180deg, #030308 0%, #0a0612 50%, #030308 100%)
          `,
        }}
      />

      {/* ── Nebula clouds ─────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-nebula-drift-1 absolute" style={{ width: '50vw', height: '40vh', left: '-5%', top: '10%', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.13) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="animate-nebula-drift-2 absolute" style={{ width: '45vw', height: '50vh', right: '-10%', top: '30%', background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.10) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="animate-nebula-pulse absolute" style={{ width: '60vw', height: '35vh', left: '20%', bottom: '5%', background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="animate-nebula-drift-1 absolute" style={{ width: '35vw', height: '30vh', right: '10%', top: '5%', background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.07) 0%, transparent 70%)', filter: 'blur(55px)', animationDelay: '-30s' }} />
      </div>

      {/* ── Iridescent horizontal line ─────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2" style={{ height: '3px' }}>
        <div className="animate-iridescent-shimmer absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, #D93025 8%, #F07B1F 18%, #F5C400 28%, #2D9E2A 40%, #009B94 52%, #005FA3 64%, #6B44A0 76%, #D93025 88%, transparent 100%)', backgroundSize: '200% 100%', opacity: 0.65 }} />
        <div className="animate-iridescent-shimmer absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, #D93025 8%, #F07B1F 18%, #F5C400 28%, #2D9E2A 40%, #009B94 52%, #005FA3 64%, #6B44A0 76%, #D93025 88%, transparent 100%)', backgroundSize: '200% 100%', filter: 'blur(14px)', opacity: 0.45, animationDelay: '-4s' }} />
        <div className="animate-iridescent-shimmer absolute -inset-y-2 inset-x-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 25%, rgba(236,72,153,0.3) 50%, rgba(0,229,255,0.3) 75%, transparent 100%)', backgroundSize: '200% 100%', filter: 'blur(22px)', opacity: 0.4, animationDelay: '-2s' }} />
      </div>

      {/* ── Stars ─────────────────────────────────────────────────────────── */}
      {starsElement}

      {/* ── Page content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-24">

        {/* Heading */}
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            The Ecosystem
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Universe of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
              Solo Success
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm text-white/50 md:text-base">
            Seven powerful apps orbiting around your entrepreneurial core — each independent, all connected.
          </p>
        </div>

        {/* ── Solar system stage ─────────────────────────────────────────── */}
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{
            width: '100%',
            maxWidth: containerSize,
            aspectRatio: '1 / 1',
          }}
        >
          {/* Inner container with overflow hidden for strict boundaries */}
          <div
            className="absolute inset-0 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* ── Orbit rings (static visual guides) ──────────────────── */}
            {PLANETS.map((p) => (
              <div
                key={`ring-${p.slug}`}
                aria-hidden
                className="absolute left-1/2 top-1/2 rounded-full transition-all duration-500"
                style={{
                  width: p.orbitRadius * 2,
                  height: p.orbitRadius * 2,
                  transform: 'translate(-50%, -50%)',
                  border: hovered === p.slug
                    ? `1.5px solid ${p.accent}55`
                    : '1px dashed rgba(255,255,255,0.07)',
                  boxShadow: hovered === p.slug
                    ? `0 0 18px ${p.accent}22, inset 0 0 18px ${p.accent}11`
                    : 'none',
                }}
              />
            ))}

            {/* ── Central Sun ─────────────────────────────────────────── */}
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: 80,
                height: 80,
                transform: 'translate(-50%, -50%)',
                zIndex: SUN_Z_INDEX,
              }}
            >
              {/* Corona pulse */}
              <div
                className="animate-sun-corona absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 160, height: 160, background: 'radial-gradient(circle, rgba(251,191,36,0.28) 0%, rgba(251,191,36,0.08) 40%, transparent 70%)', filter: 'blur(16px)' }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 120, height: 120, background: 'radial-gradient(circle, rgba(251,191,36,0.38) 0%, rgba(245,158,11,0.15) 50%, transparent 70%)', filter: 'blur(9px)' }}
              />
              {/* Sun body */}
              <div
                className="relative flex h-full w-full items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 25%, #fef9c3 0%, #fde047 25%, #fbbf24 50%, #f59e0b 75%, #b45309 100%)',
                  boxShadow: '0 0 60px rgba(251,191,36,0.7), 0 0 120px rgba(251,191,36,0.35), inset -8px -8px 20px rgba(180,83,9,0.5), inset 4px 4px 16px rgba(254,249,195,0.65)',
                }}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(180,83,9,0.9)' }}>S</span>
              </div>
              <p className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-wider text-white/35">
                SoloSuccess Core
              </p>
            </div>

            {/* ── Orbiting Planets ─────────────────────────────────────── */}
            {PLANETS.map((p, i) => {
              const state = planets[i]
              const isHovered = hovered === p.slug
              // Calculate pixel position from center
              const planetLeft = containerSize / 2 + state.x - p.size / 2
              const planetTop = containerSize / 2 + state.y - p.size / 2
              // z-index: hovered planets always on top
              const zIndex = isHovered ? SUN_Z_INDEX + 50 : state.zIndex

              return (
                <div
                  key={p.slug}
                  className="absolute"
                  style={{
                    left: planetLeft,
                    top: planetTop,
                    width: p.size,
                    height: p.size,
                    zIndex,
                    willChange: 'transform',
                    transition: 'z-index 0s',
                  }}
                >
                  <Link
                    href={p.href}
                    className="group relative block h-full w-full"
                    onMouseEnter={() => setHovered(p.slug)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`${p.name} — ${p.tagline}`}
                  >
                    {/* Glow halo */}
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                      style={{
                        width: p.size * 2.2,
                        height: p.size * 2.2,
                        background: `radial-gradient(circle, ${p.accent}${isHovered ? '45' : '22'} 0%, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                    />

                    {/* Planet body — 3D gradient + specular highlight */}
                    <div
                      className="relative h-full w-full overflow-hidden rounded-full transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: `
                          radial-gradient(circle at 28% 22%, rgba(255,255,255,0.55) 0%, transparent 28%),
                          radial-gradient(circle at 30% 28%, ${p.accent} 0%, ${p.accent}cc 40%, ${p.accent}88 70%, ${p.accent}44 100%)
                        `,
                        boxShadow: isHovered
                          ? `0 0 28px ${p.accent}90, 0 0 56px ${p.accent}40, inset -5px -5px 14px rgba(0,0,0,0.55), inset 3px 3px 10px rgba(255,255,255,0.28)`
                          : `inset -4px -4px 12px rgba(0,0,0,0.5), inset 2px 2px 8px rgba(255,255,255,0.18), 0 4px 18px rgba(0,0,0,0.45)`,
                      }}
                    >
                      <Image
                        src={p.placeholder}
                        alt={p.name}
                        fill
                        className="object-cover opacity-60 mix-blend-overlay"
                        sizes={`${p.size}px`}
                      />
                    </div>

                    {/* Label below planet */}
                    <span
                      className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide transition-all duration-200"
                      style={{
                        backgroundColor: isHovered ? p.accent : 'rgba(0,0,0,0.65)',
                        color: isHovered ? '#000' : 'rgba(255,255,255,0.7)',
                        boxShadow: isHovered ? `0 0 10px ${p.accent}70` : 'none',
                      }}
                    >
                      {p.name.replace('SoloSuccess ', '')}
                    </span>

                    {/* Hover info card - positioned left or right based on planet x position */}
                    {isHovered && (
                      <div
                        className="pointer-events-none absolute top-1/2 z-50 w-48 -translate-y-1/2 rounded-xl border border-white/10 bg-black/90 p-3 backdrop-blur-lg sm:w-52"
                        style={{
                          boxShadow: `0 0 30px ${p.accent}40, 0 8px 32px rgba(0,0,0,0.6)`,
                          ...(state.x > 0
                            ? { right: '100%', marginRight: 16 }
                            : { left: '100%', marginLeft: 16 }),
                        }}
                      >
                        <div className="mb-2 h-1 w-8 rounded-full" style={{ backgroundColor: p.accent }} />
                        <p className="text-sm font-bold text-white">{p.name}</p>
                        <p className="mt-0.5 text-xs font-medium" style={{ color: p.accent }}>{p.tagline}</p>
                        <p className="mt-2 text-[11px] leading-relaxed text-white/60">{p.desc}</p>
                        <div className="pointer-events-auto mt-3 flex items-center gap-1 text-xs font-semibold text-white">
                          Explore <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-medium uppercase tracking-widest text-white/25">
          Hover to pause &bull; Click to explore
        </p>
      </div>
    </section>
  )
}
