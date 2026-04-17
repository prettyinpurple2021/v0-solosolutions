import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  { label: "SoloSuccess AI", href: "/brands/ai", color: "#4A9BE8" },
  { label: "SoloSuccess Academy", href: "/brands/academy", color: "#5DC95A" },
  { label: "Content Factory", href: "/brands/content-factory", color: "#F5A34E" },
  { label: "SoloSuccess Connect", href: "/brands/connect", color: "#EA5A50" },
  { label: "SoloScribe", href: "/brands/soloscribe", color: "#9A7BD1" },
]

export function Footer() {
  return (
    <footer className="relative glass-panel chrome-edge px-6 py-14">
      {/* Iridescent hairline top */}
      <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe" aria-hidden="true" />

      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg, #6B44A0, #005FA3, #009B94, #2D9E2A, #F5C400, #F07B1F, #D93025, #6B44A0)",
                }}
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
                alt="SoloSuccess Solutions"
                width={40}
                height={40}
                className="relative object-contain"
              />
            </div>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-tight chrome-iridescent">SoloSuccess</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] chrome-text">
                Solutions
              </span>
            </span>
          </Link>
          <p className="text-xs max-w-xs text-center sm:text-left text-body-dim leading-relaxed">
            The parent company powering a family of brands built for the solo entrepreneur.
          </p>
        </div>

        {/* Companies nav */}
        <nav aria-label="Footer company links">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-center sm:text-left chrome-text">
            Our Companies
          </p>
          <ul className="flex flex-col gap-2.5 text-center sm:text-left" role="list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="link-rise text-xs font-semibold text-body transition-colors hover:text-foreground"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full mr-2 align-middle"
                    style={{ background: link.color }}
                    aria-hidden="true"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <div className="flex flex-col items-center sm:items-end gap-3">
          <nav aria-label="Footer legal links">
            <ul className="flex gap-6" role="list">
              {[
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="link-rise text-xs font-semibold uppercase tracking-[0.16em] text-body transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-body-dim">
            &copy; {new Date().getFullYear()} SoloSuccess Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
