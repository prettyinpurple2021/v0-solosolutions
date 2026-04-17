"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Reveal — wraps children with an IntersectionObserver that adds `revealed`
 * to enable the CSS fade-up animation defined in globals.css.
 */
type RevealProps = {
  children: ReactNode
  /** Add `reveal-children` for staggered children animation instead of single. */
  stagger?: boolean
  /** Optional className appended to the wrapper. */
  className?: string
  /** Semantic element to render as. Defaults to div. */
  as?: "div" | "section" | "article"
  /** Threshold (0–1) to trigger reveal. Defaults to 0.12. */
  threshold?: number
}

export function Reveal({
  children,
  stagger = false,
  className = "",
  as: Tag = "div",
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion — show immediately.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      el.classList.add("revealed")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed")
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const baseClass = stagger ? "reveal-children" : "reveal"

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={`${baseClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
