"use client"

import { useEffect, useRef } from "react"

/**
 * Liquid chrome background.
 *
 * Fixed, full-viewport canvas that renders a slow-drifting mesh of large
 * iridescent radial gradients in the SoloSuccess spectrum plus a few chrome
 * (cool silver) orbs. The result reads as an "oil-slick on polished metal"
 * wash sitting behind the rest of the content.
 *
 * Kept to a small number of orbs (no per-pixel math) so it renders at 60fps
 * on modest hardware and is unobtrusive behind the glass UI.
 */
interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: [number, number, number]
  alpha: number
  pulseSpeed: number
  pulseOffset: number
}

// Logo spectrum (red → purple) plus chrome cools
const SPECTRUM: Array<[number, number, number]> = [
  [217, 48, 37], // red
  [240, 123, 31], // orange
  [245, 196, 0], // yellow
  [45, 158, 42], // green
  [0, 155, 148], // teal
  [0, 95, 163], // blue
  [107, 68, 160], // purple
]
const CHROME: Array<[number, number, number]> = [
  [200, 206, 216], // platinum
  [120, 132, 152], // steel
  [220, 226, 235], // highlight
]

function rgba(c: [number, number, number], a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationId = 0
    let orbs: Orb[] = []
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createOrbs = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      // 10 spectrum + 4 chrome — large & soft
      const all: Orb[] = []
      for (let i = 0; i < 10; i++) {
        all.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: 280 + Math.random() * 360,
          color: SPECTRUM[i % SPECTRUM.length],
          alpha: 0.06 + Math.random() * 0.08,
          pulseSpeed: 0.0018 + Math.random() * 0.0032,
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }
      for (let i = 0; i < 4; i++) {
        all.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: 240 + Math.random() * 280,
          color: CHROME[i % CHROME.length],
          alpha: 0.04 + Math.random() * 0.05,
          pulseSpeed: 0.0014 + Math.random() * 0.0022,
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }
      orbs = all
    }

    const draw = (time: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      // Screen-blend-style accumulation using "lighter" composite
      ctx.globalCompositeOperation = "lighter"

      for (const orb of orbs) {
        orb.x += orb.vx
        orb.y += orb.vy

        // Wrap
        if (orb.x < -orb.radius) orb.x = w + orb.radius
        if (orb.x > w + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = h + orb.radius
        if (orb.y > h + orb.radius) orb.y = -orb.radius

        // Gentle alpha pulse
        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulseOffset)
        const a = orb.alpha + pulse * 0.025

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, rgba(orb.color, a * 1.6))
        gradient.addColorStop(0.45, rgba(orb.color, a * 0.55))
        gradient.addColorStop(1, rgba(orb.color, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = "source-over"

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createOrbs()
    animationId = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      createOrbs()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base deep-space wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.14 0.04 275 / 0.55) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, oklch(0.12 0.04 220 / 0.45) 0%, transparent 55%), oklch(0.07 0.014 260)",
        }}
      />
      {/* Canvas mesh of iridescent + chrome orbs */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Subtle vignette to keep edges dark and focus content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, oklch(0 0 0 / 0.45) 100%)",
        }}
      />
      {/* Film grain — fine noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  )
}
