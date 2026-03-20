import Link from "next/link"
import { Users, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "SoloSuccess Connect — Coming Soon",
  description: "SoloSuccess Connect — a curated community and networking platform for solo entrepreneurs — is coming soon.",
}

const connectColor = "#D93025"

export default function SoloSuccessConnectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-32 relative overflow-hidden">
        {/* Background orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full opacity-15 blur-[140px]"
            style={{ background: `radial-gradient(circle, ${connectColor}, transparent 65%)` }}
          />
          <div
            className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
            style={{ background: "radial-gradient(circle, #6B44A0, transparent 65%)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
            style={{ background: "radial-gradient(circle, #005FA3, transparent 65%)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-lg">
          {/* Icon badge */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl glass-card-deep"
            style={{
              border: `2px solid ${connectColor}55`,
              boxShadow: `0 0 40px ${connectColor}44`,
            }}
          >
            <Users size={36} style={{ color: connectColor }} aria-hidden="true" />
          </div>

          {/* Coming soon badge */}
          <span
            className="rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              background: `${connectColor}20`,
              color: connectColor,
              border: `1px solid ${connectColor}44`,
            }}
          >
            Coming Soon
          </span>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-balance font-display"
              style={{ color: connectColor }}
            >
              SoloSuccess Connect
            </h1>
            <p className="text-base font-semibold" style={{ color: `${connectColor}bb` }}>
              Community &amp; Networking for Solo Builders
            </p>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#c4c8d4" }}>
            We&apos;re building a curated network of like-minded entrepreneurs, collaborators, and mentors. Find
            accountability partners, referral partners, and real relationships that accelerate your growth.
          </p>

          {/* Divider */}
          <div
            className="w-24 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${connectColor}, transparent)` }}
            aria-hidden="true"
          />

          <p className="text-xs" style={{ color: "#6b7280" }}>
            Something big is on the way. Check back soon.
          </p>

          {/* Back link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-500 hover:opacity-80"
            style={{
              color: connectColor,
              border: `2px solid ${connectColor}`,
              background: `${connectColor}14`,
            }}
          >
            <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            Back to SoloSuccess Solutions
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
