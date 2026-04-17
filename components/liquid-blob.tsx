/**
 * LiquidBlob — decorative iridescent chrome shape
 *
 * Renders a morphing conic-gradient blob with heavy blur, used as a
 * signature accent across hero and section headers. Purely decorative.
 */
type LiquidBlobProps = {
  /** Size in pixels (square). */
  size?: number
  /** 'a' = slow counter-clockwise morph, 'b' = faster clockwise morph. */
  variant?: "a" | "b"
  /** Opacity of the blob (0–1). */
  opacity?: number
  /** Extra classes for positioning (e.g. "-top-20 -right-20"). */
  className?: string
  /** Blur amount in px. Defaults to 60. */
  blur?: number
}

export function LiquidBlob({
  size = 420,
  variant = "a",
  opacity = 0.55,
  className = "",
  blur = 60,
}: LiquidBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size, opacity, filter: `blur(${blur}px)` }}
    >
      <div
        className={variant === "a" ? "liquid-blob-a h-full w-full" : "liquid-blob-b h-full w-full"}
        style={{
          background:
            // Iridescent oil-slick — brand rainbow spun as a conic sheen
            "conic-gradient(from 220deg, #6B44A0 0deg, #005FA3 60deg, #009B94 110deg, #2D9E2A 160deg, #F5C400 210deg, #F07B1F 260deg, #D93025 310deg, #6B44A0 360deg)",
        }}
      />
    </div>
  )
}
