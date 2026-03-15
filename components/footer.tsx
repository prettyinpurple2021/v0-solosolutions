import Link from "next/link"
import Image from "next/image"

const footerColors = ["#D93025", "#2D9E2A", "#F07B1F", "#009B94", "#6B44A0"]

const footerLinks = [
  { label: "SoloSuccess AI", href: "/brands/ai", color: "#005FA3" },
  { label: "SoloSuccess Academy", href: "/brands/academy", color: "#2D9E2A" },
  { label: "Content Factory", href: "/brands/content-factory", color: "#F07B1F" },
  { label: "SoloSuccess Connect", href: "/brands/connect", color: "#D93025" },
  { label: "SoloScribe", href: "/brands/soloscribe", color: "#6B44A0" },
]

export function Footer() {
  return (
    <footer className="relative border-t px-6 py-12"
      style={{ borderColor: "#ffffff14" }}>
      {/* Rainbow border top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
              alt="SoloSuccess Solutions"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="font-bold text-sm tracking-tight">
              {"SoloSuccess".split("").map((char, i) => (
                <span key={i} style={{ color: footerColors[i % footerColors.length] }}>{char}</span>
              ))}
              <span style={{ color: "#9CA3AF" }}> Solutions</span>
            </span>
          </div>
          <p className="text-xs max-w-xs text-center sm:text-left" style={{ color: "#6b7280" }}>
            The parent company powering a family of brands built for the solo entrepreneur.
          </p>
        </div>

        {/* Companies nav */}
        <nav aria-label="Footer company links">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-center sm:text-left rainbow-text font-display">
            Our Companies
          </p>
          <ul className="flex flex-col gap-2 text-center sm:text-left" role="list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: link.color }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <nav aria-label="Footer legal links">
            <ul className="flex gap-4" role="list">
              {[
                { label: "Privacy", href: "#", color: "#009B94" },
                { label: "Terms", href: "#", color: "#F07B1F" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: l.color }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            &copy; {new Date().getFullYear()} SoloSuccess Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
