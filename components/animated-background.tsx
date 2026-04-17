"use client"

import { useEffect, useRef } from "react"

interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  alphaDir: number
  pulseSpeed: number
  pulseOffset: number
}

const COLORS = [
  "#D93025", // red
  "#F07B1F", // orange
  "#F5C400", // yellow
  "#2D9E2A", // green
  "#009B94", // teal
  "#005FA3", // blue
  "#6B44A0", // purple
]

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let orbs: Orb[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createOrbs = () => {
      orbs = Array.from({ length: 18 }, (_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 120 + Math.random() * 220,
        color: COLORS[i % COLORS.length],
        alpha: 0.06 + Math.random() * 0.10,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        pulseSpeed: 0.004 + Math.random() * 0.006,
        pulseOffset: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const orb of orbs) {
        // Drift
        orb.x += orb.vx
        orb.y += orb.vy

        // Wrap around edges
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        // Pulsing alpha
        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulseOffset)
        const currentAlpha = orb.alpha + pulse * 0.04

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, orb.color + Math.round(Math.max(0, Math.min(1, currentAlpha * 2.2)) * 255).toString(16).padStart(2, "0"))
        gradient.addColorStop(0.5, orb.color + Math.round(Math.max(0, Math.min(1, currentAlpha)) * 255).toString(16).padStart(2, "0"))
        gradient.addColorStop(1, orb.color + "00")

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createOrbs()
    animationId = requestAnimationFrame(draw)

    window.addEventListener("resize", () => {
      resize()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
