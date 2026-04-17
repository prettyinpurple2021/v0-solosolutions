import Link from "next/link"
import { ArrowUpRight, Brain, BookOpen, Film, Users, PenLine } from "lucide-react"
import { LiquidBlob } from "@/components/liquid-blob"

const companies = [
  {
    icon: Brain,
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity for Entrepreneurs",
    description:
      "Cutting-edge artificial intelligence tools designed specifically for solo founders and small teams. Automate workflows, generate content, analyze data, and make smarter business decisions — all without a full team behind you.",
    color: "#4A9BE8",
    accent: "#005FA3",
    href: "/brands/ai",
    featured: true,
  },
  {
    icon: BookOpen,
    name: "SoloSuccess Academy",
    tagline: "Education Built for the Solo Journey",
    description:
      "Practical courses, coaching programs, and learning resources that teach real skills for building and scaling a solo business. No fluff — just actionable frameworks from founders who have done it.",
    color: "#5DC95A",
    accent: "#2D9E2A",
    href: "/brands/academy",
    featured: false,
  },
  {
    icon: Film,
    name: "SoloSuccess Content Factory",
    tagline: "Content Strategy & Creation at Scale",
    description:
      "Done-for-you and done-with-you content solutions that help entrepreneurs show up consistently across platforms. From short-form video to long-form articles, we turn your expertise into content that converts.",
    color: "#F5A34E",
    accent: "#F07B1F",
    href: "/brands/content-factory",
    featured: false,
  },
  {
    icon: Users,
    name: "SoloSuccess Connect",
    tagline: "Community & Networking for Solo Builders",
    description:
      "A curated network of like-minded entrepreneurs, collaborators, and mentors. Find accountability partners, referral partners, and real relationships that accelerate your growth.",
    color: "#EA5A50",
    accent: "#D93025",
    href: "/brands/connect",
    featured: false,
  },
  {
    icon: PenLine,
    name: "SoloScribe",
    tagline: "Writing & Copywriting for Your Brand",
    description:
      "Professional writing services and tools for solo entrepreneurs who need compelling copy. Sales pages, email sequences, social content, and brand voice development — written to convert.",
    color: "#9A7BD1",
    accent: "#6B44A0",
    href: "/brands/soloscribe",
    featured: false,
  },
]

export function EcosystemSection() {
  const featured = companies.find((c) => c.featured)!
  const rest = companies.filter((c) => !c.featured)

  return (
    <section id="companies" className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* Decorative liquid blobs */}
      <LiquidBlob size={540} variant="a" opacity={0.22} blur={100} className="-top-40 -right-40" />
      <LiquidBlob size={480} variant="b" opacity={0.20} blur={100} className="-bottom-32 -left-32" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 glass-card chrome-edge">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C400]" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] chrome-text">
              Our Companies
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-balance leading-[1.05]">
            <span className="chrome-iridescent">Five brands.</span>
            <br />
            <span className="chrome-text">One mission.</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-body">
            Each company in the SoloSuccess family is purpose-built to serve a specific need of the
            solo entrepreneur — from AI tools to education, content, community, and copywriting.
          </p>
        </div>

        {/* Featured card */}
        <div
          className="group relative mb-6 flex flex-col sm:flex-row items-start gap-7 rounded-3xl p-8 sm:p-10 glass-card-deep glass-shimmer chrome-edge magnetic-hover shimmer-sweep overflow-hidden"
          style={{ borderColor: `${featured.color}55` }}
        >
          <span className="sweep" aria-hidden="true" />
          {/* Hover color wash */}
          <div
            className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 transition-opacity duration-700 group-hover:opacity-45 blur-[100px]"
            style={{ background: featured.accent }}
            aria-hidden="true"
          />
          {/* Iridescent hairline top */}
          <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe" aria-hidden="true" />

          <div
            className="relative chrome-ring rounded-2xl h-20 w-20 shrink-0 transition-transform duration-700 group-hover:scale-105"
          >
            <div className="flex h-full w-full items-center justify-center rounded-2xl">
              <featured.icon size={34} style={{ color: featured.color }} aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold chrome-text tracking-tight">
                {featured.name}
              </h3>
              <span
                className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] chrome-surface"
              >
                Flagship
              </span>
            </div>
            <p className="text-sm font-semibold" style={{ color: featured.color }}>
              {featured.tagline}
            </p>
            <p className="text-sm leading-relaxed text-body">{featured.description}</p>
          </div>

          <Link
            href={featured.href}
            className="btn-chrome-ghost mt-4 sm:mt-0 shrink-0 inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em]"
            aria-label={`Learn more about ${featured.name}`}
          >
            Learn More
            <ArrowUpRight
              size={13}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map((company) => (
            <div
              key={company.name}
              className="group relative flex flex-col gap-5 rounded-3xl p-7 sm:p-8 glass-card glass-shimmer chrome-edge magnetic-hover shimmer-sweep overflow-hidden"
              style={{ borderColor: `${company.color}44` }}
            >
              <span className="sweep" aria-hidden="true" />
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${company.color}aa 50%, transparent 100%)`,
                }}
                aria-hidden="true"
              />
              {/* Color wash */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-30 blur-[70px]"
                style={{ background: company.accent }}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-3">
                <div
                  className="relative chrome-ring rounded-2xl h-14 w-14 transition-transform duration-700 group-hover:scale-110"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-2xl">
                    <company.icon size={22} style={{ color: company.color }} aria-hidden="true" />
                  </div>
                </div>
                <Link
                  href={company.href}
                  className="btn-chrome-ghost inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
                  aria-label={`Learn more about ${company.name}`}
                >
                  Learn
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-extrabold chrome-text tracking-tight">
                  {company.name}
                </h3>
                <p className="text-xs font-semibold" style={{ color: company.color }}>
                  {company.tagline}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-body">{company.description}</p>

              {/* Hover bottom glow */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-70"
                style={{
                  background: `linear-gradient(90deg, transparent, ${company.color}, transparent)`,
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
