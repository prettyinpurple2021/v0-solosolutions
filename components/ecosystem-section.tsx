import Link from "next/link"
import { ArrowUpRight, Brain, BookOpen, Film, Users, PenLine } from "lucide-react"

const companies = [
  {
    icon: Brain,
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity for Entrepreneurs",
    description:
      "Cutting-edge artificial intelligence tools designed specifically for solo founders and small teams. Automate workflows, generate content, analyze data, and make smarter business decisions — all without a full team behind you.",
    color: "#005FA3",
    href: "/brands/ai",
    featured: true,
  },
  {
    icon: BookOpen,
    name: "SoloSuccess Academy",
    tagline: "Education Built for the Solo Journey",
    description:
      "Practical courses, coaching programs, and learning resources that teach real skills for building and scaling a solo business. No fluff — just actionable frameworks from founders who have done it.",
    color: "#2D9E2A",
    href: "/brands/academy",
    featured: false,
  },
  {
    icon: Film,
    name: "SoloSuccess Content Factory",
    tagline: "Content Strategy & Creation at Scale",
    description:
      "Done-for-you and done-with-you content solutions that help entrepreneurs show up consistently across platforms. From short-form video to long-form articles, we turn your expertise into content that converts.",
    color: "#F07B1F",
    href: "/brands/content-factory",
    featured: false,
  },
  {
    icon: Users,
    name: "SoloSuccess Connect",
    tagline: "Community & Networking for Solo Builders",
    description:
      "A curated network of like-minded entrepreneurs, collaborators, and mentors. Find accountability partners, referral partners, and real relationships that accelerate your growth.",
    color: "#D93025",
    href: "/brands/connect",
    featured: false,
  },
  {
    icon: PenLine,
    name: "SoloScribe",
    tagline: "Writing & Copywriting for Your Brand",
    description:
      "Professional writing services and tools for solo entrepreneurs who need compelling copy. Sales pages, email sequences, social content, and brand voice development — written to convert.",
    color: "#6B44A0",
    href: "/brands/soloscribe",
    featured: false,
  },
]

// Rainbow spectrum for section heading letters
const spectrumColors = ["#D93025", "#F07B1F", "#F5C400", "#2D9E2A", "#009B94", "#005FA3", "#6B44A0"]

export function EcosystemSection() {
  return (
    <section id="companies" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Full-spectrum background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -left-40 h-[700px] w-[700px] rounded-full opacity-16 blur-[140px]"
          style={{ background: "radial-gradient(circle, #005FA3, transparent 65%)" }} />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-14 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6B44A0, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] rounded-full opacity-10 blur-[110px]"
          style={{ background: "radial-gradient(circle, #F5C400, transparent 65%)" }} />
        <div className="absolute bottom-0 right-1/3 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #D93025, transparent 65%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span className="font-display text-xl font-semibold rainbow-text">
            Our Companies
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance">
            {"Five brands. One ".split("").map((char, i) => (
              <span key={i} style={{ color: char === " " ? "transparent" : spectrumColors[i % spectrumColors.length] }}>
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
            <span style={{ color: "#9CA3AF" }}>mission.</span>
          </h2>
          <p className="max-w-lg text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>
            Each company in the SoloSuccess family is purpose-built to serve a specific need of the solo entrepreneur
            — from AI tools to education, content, community, and copywriting.
          </p>
        </div>

        {/* Featured card */}
        {companies.filter((c) => c.featured).map((company) => (
          <div
            key={company.name}
            className="group relative mb-6 flex flex-col sm:flex-row items-start gap-6 rounded-2xl p-8 glass-card overflow-hidden transition-all duration-700"
            style={{ borderColor: `${company.color}44` }}
          >
            {/* Animated hover glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-0 transition-opacity duration-900 group-hover:opacity-30 blur-[80px]"
              style={{ background: company.color }}
              aria-hidden="true"
            />
            {/* Rainbow top border line */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
              aria-hidden="true"
            />
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `${company.color}25`, border: `1px solid ${company.color}55` }}
            >
              <company.icon size={30} style={{ color: company.color }} aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-extrabold" style={{ color: company.color }}>{company.name}</h3>
                <span
                  className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider font-display"
                  style={{ background: `${company.color}25`, color: company.color, border: `1px solid ${company.color}44` }}
                >
                  Flagship
                </span>
              </div>
              <p className="text-sm font-semibold" style={{ color: `${company.color}cc` }}>{company.tagline}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>{company.description}</p>
            </div>
            <Link
              href={company.href}
              className="mt-4 sm:mt-0 shrink-0 inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-500 hover:opacity-80"
              style={{ color: company.color, border: `2px solid ${company.color}`, background: `${company.color}14` }}
              aria-label={`Learn more about ${company.name}`}
            >
              Learn More
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        ))}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {companies.filter((c) => !c.featured).map((company) => (
            <div
              key={company.name}
              className="group relative flex flex-col gap-4 rounded-2xl p-7 glass-card overflow-hidden transition-all duration-700"
              style={{ borderColor: `${company.color}33` }}
            >
              {/* Top accent line per company color */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-70"
                style={{ background: `linear-gradient(90deg, ${company.color}, transparent)` }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-0 transition-opacity duration-900 group-hover:opacity-30 blur-[60px]"
                style={{ background: company.color }}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${company.color}22`, border: `1px solid ${company.color}44` }}
                >
                  <company.icon size={22} style={{ color: company.color }} aria-hidden="true" />
                </div>
                <Link
                  href={company.href}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-500 hover:opacity-80"
                  style={{ color: company.color, border: `2px solid ${company.color}`, background: `${company.color}14` }}
                  aria-label={`Learn more about ${company.name}`}
                >
                  Learn More
                  <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-extrabold" style={{ color: company.color }}>{company.name}</h3>
                <p className="text-xs font-semibold" style={{ color: `${company.color}cc` }}>{company.tagline}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>{company.description}</p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-7 right-7 h-px rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: company.color }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
