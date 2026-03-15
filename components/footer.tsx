import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  { label: "SoloSuccess AI", href: "#companies" },
  { label: "SoloSuccess Academy", href: "#companies" },
  { label: "Content Factory", href: "#companies" },
  { label: "SoloSuccess Connect", href: "#companies" },
  { label: "SoloScribe", href: "#companies" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finished%20solutions%20logo-El6oq26ejF7UHHNShHv1OEp3Gg4m4e.jpg"
              alt="SoloSuccess Solutions"
              width={32}
              height={32}
              className="rounded-md object-contain"
            />
            <span className="font-bold text-sm text-foreground tracking-tight">
              SoloSuccess Solutions
            </span>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs text-center sm:text-left">
            The parent company powering a family of brands built for the solo entrepreneur.
          </p>
        </div>

        {/* Companies nav */}
        <nav aria-label="Footer company links">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center sm:text-left">
            Our Companies
          </p>
          <ul className="flex flex-col gap-2 text-center sm:text-left" role="list">
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

        {/* Legal */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <nav aria-label="Footer legal links">
            <ul className="flex gap-4" role="list">
              {[{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SoloSuccess Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
