'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { ArrowUpRight } from 'lucide-react'

// ─── Orbit radii — 7 strictly escalating rings (px at BASE_SIZE = 800) ────────
// Innermost: 120px, step 40px → 120, 160, 200, 240, 280, 320, 360
// Start angles are evenly distributed: 360 / 7 ≈ 51.43° apart
const BASE_SIZE = 800 // design canvas size — all radii are relative to this

const ORBIT_RADII = [120, 160, 200, 240, 280, 320, 360] as const

// Even angular spacing: 360 / 7 ≈ 51.43°
const ANGULAR_STEP = 360 / 7

const PLANETS = [
  {
    slug:        'ai',
    name:        'SoloSuccess AI',
    tagline:     'AI-Powered Productivity',
    desc:        'Automations, content, and insight calibrated for solo operators.',
    href:        '/brands/ai',
    accent:      '#00E5FF',
    orbitIndex:  0, // ring 1 — innermost, radius 120px
    duration:    20, // seconds per full orbit
    startAngle:  0,  // 0 × 51.43°
    size:        38,
    placeholder: '/logos/ai-placeholder.jpg',
  },
  {
    slug:        'academy',
    name:        'SoloSuccess Academy',
    tagline:     'Education for the Solo Journey',
    desc:        'Courses, coaching, and playbooks that teach real-world skills.',
    href:        '/brands/academy',
    accent:      '#B6FF3C',
    orbitIndex:  1, // ring 2 — radius 160px
    duration:    28,
    startAngle:  Math.round(ANGULAR_STEP * 1), // ~51°
    size:        42,
    placeholder: '/logos/academy-placeholder.jpg',
  },
  {
    slug:        'content-factory',
    name:        'Content Factory',
    tagline:     'Story at Scale',
    desc:        'Done-for-you content that helps you show up with confidence.',
    href:        '/brands/content-factory',
    accent:      '#FFC53D',
    orbitIndex:  2, // ring 3 — radius 200px
    duration:    36,
    startAngle:  Math.round(ANGULAR_STEP * 2), // ~103°
    size:        44,
    placeholder: '/logos/content-factory-placeholder.jpg',
  },
  {
    slug:        'connect',
    name:        'SoloSuccess Connect',
    tagline:     'Community & Networking',
    desc:        'A curated circle of collaborators, mentors, and partners.',
    href:        '/brands/connect',
    accent:      '#FF3DAE',
    orbitIndex:  3, // ring 4 — radius 240px
    duration:    46,
    startAngle:  Math.round(ANGULAR_STEP * 3), // ~154°
    size:        44,
    placeholder: '/logos/connect-placeholder.jpg',
  },
  {
    slug:        'soloscribe',
    name:        'SoloScribe',
    tagline:     'Writing That Converts',
    desc:        'Copy, emails, and brand voice written to move readers.',
    href:        '/brands/soloscribe',
    accent:      '#A78BFA',
    orbitIndex:  4, // ring 5 — radius 280px
    duration:    58,
    startAngle:  Math.round(ANGULAR_STEP * 4), // ~206°
    size:        42,
    placeholder: '/logos/soloscribe-placeholder.jpg',
  },
  {
    slug:        'soloscout',
    name:        'SoloScout',
    tagline:     'Market Intelligence Agent',
    desc:        'AI-driven opportunity scouting — real-world demand signals.',
    href:        '/brands/soloscout',
    accent:      '#00D4AA',
    orbitIndex:  5, // ring 6 — radius 320px
    duration:    72,
    startAngle:  Math.round(ANGULAR_STEP * 5), // ~257°
    size:        44,
    placeholder: '/logos/soloscout-placeholder.jpg',
  },
  {
    slug:        'solodesign',
    name:        'SoloDesign',
    tagline:     'Visual Excellence',
    desc:        'Brand, web, and creative design that stands out.',
    href:        '/brands/solodesign',
    accent:      '#FF6B9D',
    orbitIndex:  6, // ring 7 — outermost, radius 360px
    duration:    90,
    startAngle:  Math.round(ANGULAR_STEP * 6), // ~309°
    size:        44,
    placeholder: '/logos/solodesign-placeholder.jpg',
  },
] as const

// ─── Stars ───────────────────────────────────────────────────────────────────
const sr = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}
const STARS = Array.from({ length: 110 }, (_, i) => ({
  id:       i,
  left:     sr(i * 1.1) * 100,
  top:      sr(i * 2.3) * 100,
  size:     sr(i * 3.7) < 0.65 ? 1 : sr(i * 3.7) < 0.88 ? 1.5 : 2,
  opacity:  0.15 + sr(i * 4.9) * 0.55,
  duration: 2 + sr(i * 5.5) * 4,
  delay:    sr(i * 6.1) * 6,
}))

// The sun is always z=20. Planets in front are 30, behind are 10.
const Z_SUN = 20

type PlanetState = { x: number; y: number; angle: number; zIndex: number }

export function SolarSystemHero() {
  const [hovered, setHovered]           = useState<string | null>(null)
  // scale is stored as state so rings + planet positions re-render on resize
  const [scale, setScale]               = useState<number>(1)
  const pausedRef                       = useRef(false)
  const stageRef                        = useRef<HTMLDivElement>(null)
  const halfSizeRef                     = useRef<number>(BASE_SIZE / 2)
  const anglesRef                       = useRef<number[]>(PLANETS.map(p => p.startAngle))
  const lastTimeRef                     = useRef<number | null>(null)
  const rafRef                          = useRef<number>(0)

  // Initial planet states — computed from startAngle so they are spread from frame 0
  const [planetStates, setPlanetStates] = useState<PlanetState[]>(() =>
    PLANETS.map((p) => {
      const r     = ORBIT_RADII[p.orbitIndex]
      const rad   = (p.startAngle * Math.PI) / 180
      const x     = Math.sin(rad) * r
      const y     = -Math.cos(rad) * r
      return { x, y, angle: p.startAngle, zIndex: y > 0 ? Z_SUN + 10 : Z_SUN - 10 }
    })
  )

  // Measure stage and recompute scale when it resizes
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      halfSizeRef.current = w / 2
      setScale(w / BASE_SIZE)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Animation loop — advances each planet along its own ring
  const tick = useCallback((ts: number) => {
    if (lastTimeRef.current === null) lastTimeRef.current = ts
    const dt = Math.min(ts - lastTimeRef.current, 50)
    lastTimeRef.current = ts

    if (!pausedRef.current) {
      const angles = anglesRef.current
      for (let i = 0; i < angles.length; i++) {
        const angle = angles[i]
        const degsPerSec = 360 / PLANETS[i].duration
        angles[i] = (angle + degsPerSec * (dt / 1000)) % 360
      }

      setPlanetStates(
        angles.map((angle, i) => {
          const r   = ORBIT_RADII[PLANETS[i].orbitIndex]
          const rad = (angle * Math.PI) / 180
          const x   = Math.sin(rad) * r  // design-space pixels
          const y   = -Math.cos(rad) * r
          return {
            x,
            y,
            angle,
            zIndex: y > 0 ? Z_SUN + 10 : Z_SUN - 10,
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

  const handleMouseEnter = useCallback(() => { pausedRef.current = true  }, [])
  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false
    setHovered(null)
  }, [])

  const starsElement = useMemo(() => (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left:      `${s.left}%`,
            top:       `${s.top}%`,
            width:     s.size,
            height:    s.size,
            opacity:   s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  ), [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030308]">

      {/* Deep space gradient */}
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

      {/* Nebula clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-nebula-drift-1 absolute" style={{ width: '50vw', height: '40vh', left: '-5%', top: '10%', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.13) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="animate-nebula-drift-2 absolute" style={{ width: '45vw', height: '50vh', right: '-10%', top: '30%', background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.10) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="animate-nebula-pulse absolute" style={{ width: '60vw', height: '35vh', left: '20%', bottom: '5%', background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="animate-nebula-drift-1 absolute" style={{ width: '35vw', height: '30vh', right: '10%', top: '5%', background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.07) 0%, transparent 70%)', filter: 'blur(55px)', animationDelay: '-30s' }} />
      </div>

      {/* Iridescent horizontal line */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2" style={{ height: '3px' }}>
        <div className="animate-iridescent-shimmer absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, #D93025 8%, #F07B1F 18%, #F5C400 28%, #2D9E2A 40%, #009B94 52%, #005FA3 64%, #6B44A0 76%, #D93025 88%, transparent 100%)', backgroundSize: '200% 100%', opacity: 0.65 }} />
        <div className="animate-iridescent-shimmer absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, #D93025 8%, #F07B1F 18%, #F5C400 28%, #2D9E2A 40%, #009B94 52%, #005FA3 64%, #6B44A0 76%, #D93025 88%, transparent 100%)', backgroundSize: '200% 100%', filter: 'blur(14px)', opacity: 0.45, animationDelay: '-4s' }} />
        <div className="animate-iridescent-shimmer absolute -inset-y-2 inset-x-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 25%, rgba(236,72,153,0.3) 50%, rgba(0,229,255,0.3) 75%, transparent 100%)', backgroundSize: '200% 100%', filter: 'blur(22px)', opacity: 0.4, animationDelay: '-2s' }} />
      </div>

      {starsElement}

      {/* Page content */}
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

        {/* ── Solar system stage ─────────────────────────────────────────────── */}
        {/*
          The outermost ring is 360px radius → diameter 720px at BASE_SIZE=800.
          We add planet size (≤44px) + label (≈20px) as padding → ~800px total.
          aspect-ratio 1/1 keeps it square; max-w-[800px] caps at design size.
          overflow-hidden strictly clips everything to this box.
        */}
        <div
          ref={stageRef}
          className="relative mx-auto w-full overflow-hidden"
          style={{
            maxWidth:    BASE_SIZE,
            aspectRatio: '1 / 1',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          {/* ── Orbit rings ──────────────────────────────────────────────────── */}
          {/*
            Each ring is centered on the stage using left/top 50% + translate -50%.
            Size = radius * 2, scaled via CSS transform to match the rendered stage.
            We use transform:scale so they always stay centered perfectly.
          */}
          {ORBIT_RADII.map((r, i) => {
          {ORBIT_RADII.map((r, i) => {
            const planet = PLANETS.find(p => p.orbitIndex === i)
            if (!planet) return null
            const isActive = hovered === planet.slug
            // diameter in design-space px; scale to rendered size
            const diam = r * 2
            return (
              <div
                key={`ring-${i}`}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width:     diam,
                  height:    diam,
                  // Scale from design-space to rendered size using CSS transform
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  border:    isActive
                    ? `1.5px solid ${planet.accent}55`
                    : '1px dashed rgba(255,255,255,0.10)',
                  boxShadow: isActive
                    ? `0 0 20px ${planet.accent}22, inset 0 0 20px ${planet.accent}11`
                    : 'none',
                  transition: 'border 0.3s, box-shadow 0.3s',
                  zIndex:    2,
                }}
              />
            )
          })}

          {/* ── Central Sun ──────────────────────────────────────────────────── */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width:     80,
              height:    80,
              transform: 'translate(-50%, -50%)',
              zIndex:    Z_SUN,
            }}
          >
            {/* Corona glow */}
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
                background:  'radial-gradient(circle at 30% 25%, #fef9c3 0%, #fde047 25%, #fbbf24 50%, #f59e0b 75%, #b45309 100%)',
                boxShadow:   '0 0 60px rgba(251,191,36,0.7), 0 0 120px rgba(251,191,36,0.35), inset -8px -8px 20px rgba(180,83,9,0.5), inset 4px 4px 16px rgba(254,249,195,0.65)',
              }}
            >
              <span className="text-3xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(180,83,9,0.9)' }}>S</span>
            </div>
            <p className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-wider text-white/35">
              SoloSuccess Core
            </p>
          </div>

          {/* ── Planets ──────────────────────────────────────────────────────── */}
          {PLANETS.map((p, i) => {
            const state    = planetStates[i]
            if (!state) return null
            const isHovered = hovered === p.slug

            // Convert design-space coords → rendered-stage pixel offsets from center.
            // halfSizeRef tracks the live rendered half-width (updated by ResizeObserver).
            const cx = halfSizeRef.current
            const cy = halfSizeRef.current
            const px = cx + state.x * scale
            const py = cy + state.y * scale
            const zIndex = isHovered ? Z_SUN + 50 : state.zIndex

            return (
              <div
                key={p.slug}
                className="absolute left-0 top-0"
                style={{
                  width:      p.size * scale,
                  height:     p.size * scale,
                  transform:  `translate(${px - (p.size * scale) / 2}px, ${py - (p.size * scale) / 2}px)`,
                  zIndex,
                  willChange: 'transform',
                }}
              >
                <Link
                  href={p.href}
                  className="group relative block h-full w-full"
                  onMouseEnter={() => setHovered(p.slug)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(p.slug)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${p.name} — ${p.tagline}`}
                >
                  {/* Glow halo */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{
                      width:      p.size * scale * 2.4,
                      height:     p.size * scale * 2.4,
                      background: `radial-gradient(circle, ${p.accent}${isHovered ? '40' : '20'} 0%, transparent 70%)`,
                      filter:     'blur(8px)',
                    }}
                  />

                  {/* Planet body */}
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
                      sizes={`(max-width: 768px) ${(p.size / BASE_SIZE * 100).toFixed(2)}vw, ${Math.round(p.size * scale)}px`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wide transition-all duration-200"
                    style={{
                      backgroundColor: isHovered ? p.accent : 'rgba(0,0,0,0.65)',
                      color:           isHovered ? '#000' : 'rgba(255,255,255,0.65)',
                      boxShadow:       isHovered ? `0 0 10px ${p.accent}70` : 'none',
                    }}
                  >
                    {p.name.replace('SoloSuccess ', '')}
                  </span>

                  {/* Hover info card — flips left/right based on x position */}
                  {isHovered && (
                    <div
                      className="pointer-events-none absolute top-1/2 z-50 w-44 -translate-y-1/2 rounded-xl border border-white/10 bg-black/90 p-3 backdrop-blur-lg sm:w-52"
                      style={{
                        boxShadow: `0 0 30px ${p.accent}40, 0 8px 32px rgba(0,0,0,0.6)`,
                        ...(state.x > 0
                          ? { right: '100%', marginRight: 14 }
                          : { left: '100%', marginLeft: 14 }),
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

        <p className="mt-10 text-center text-[10px] font-medium uppercase tracking-widest text-white/25">
          Hover to pause &bull; Click to explore
        </p>
      </div>
    </section>
  )
}
