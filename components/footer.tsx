import Link from "next/link"

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground text-xs font-bold"
            style={{ background: "oklch(0.58 0.22 255)" }}
            aria-hidden="true"
          >
            S
          </span>
          <span className="font-bold text-sm text-foreground">
            SoloSuccess<span style={{ color: "oklch(0.58 0.22 255)" }}> Solutions</span>
          </span>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-6" role="list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SoloSuccess Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
