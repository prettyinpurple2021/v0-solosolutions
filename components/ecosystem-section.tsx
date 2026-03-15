import { ArrowUpRight, Brain, BookOpen, Film, Users, PenLine } from "lucide-react"

const companies = [
  {
    icon: Brain,
    name: "SoloSuccess AI",
    tagline: "AI-Powered Productivity for Entrepreneurs",
    description:
      "Cutting-edge artificial intelligence tools designed specifically for solo founders and small teams. Automate workflows, generate content, analyze data, and make smarter business decisions — all without a full team behind you.",
    color: "#005FA3",
    glowColor: "#005FA344",
    featured: true,
  },
  {
    icon: BookOpen,
    name: "SoloSuccess Academy",
    tagline: "Education Built for the Solo Journey",
    description:
      "Practical courses, coaching programs, and learning resources that teach real skills for building and scaling a solo business. No fluff — just actionable frameworks from founders who have done it.",
    color: "#2D9E2A",
    glowColor: "#2D9E2A44",
    featured: false,
  },
  {
    icon: Film,
    name: "SoloSuccess Content Factory",
    tagline: "Content Strategy & Creation at Scale",
    description:
      "Done-for-you and done-with-you content solutions that help entrepreneurs show up consistently across platforms. From short-form video to long-form articles, we turn your expertise into content that converts.",
    color: "#F07B1F",
    glowColor: "#F07B1F44",
    featured: false,
  },
  {
    icon: Users,
    name: "SoloSuccess Connect",
    tagline: "Community & Networking for Solo Builders",
    description:
      "A curated network of like-minded entrepreneurs, collaborators, and mentors. Find accountability partners, referral partners, and real relationships that accelerate your growth.",
    color: "#D93025",
    glowColor: "#D9302544",
    featured: false,
  },
  {
    icon: PenLine,
    name: "SoloScribe",
    tagline: "Writing & Copywriting for Your Brand",
    description:
      "Professional writing services and tools for solo entrepreneurs who need compelling copy. Sales pages, email sequences, social content, and brand voice development — written to convert.",
    color: "#6B44A0",
    glowColor: "#6B44A044",
    featured: false,
  },
]

export function EcosystemSection() {
  return (
    <section id="companies" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-32 -left-32 h-[600px] w-[600px] rounded-full opacity-18 blur-[130px]"
          style={{ background: "radial-gradient(circle, #005FA3, transparent 70%)" }}
        />
        <div
          className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full opacity-12 blur-[110px]"
          style={{ background: "radial-gradient(circle, #6B44A0, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span
            className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest glass-card"
            style={{ color: "#009B94", borderColor: "#009B9440" }}
          >
            Our Companies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Five brands. One{" "}
            <span style={{ color: "#6B44A0" }}>mission.</span>
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground leading-relaxed">
            Each company in the SoloSuccess family is purpose-built to serve a specific need of the solo entrepreneur
            — from AI tools to education, content, community, and copywriting.
          </p>
        </div>

        {/* Featured card — SoloSuccess AI */}
        {companies.filter((c) => c.featured).map((company) => (
          <div
            key={company.name}
            className="group relative mb-6 flex flex-col sm:flex-row items-start gap-6 rounded-2xl p-8 glass-card transition-all duration-300 hover:border-white/20 overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-30 blur-[70px]"
              style={{ background: company.color }}
              aria-hidden="true"
            />
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `${company.color}22` }}
            >
              <company.icon size={28} style={{ color: company.color }} aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">{company.name}</h3>
                <span
                  className="rounded-md px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: `${company.color}22`, color: company.color }}
                >
                  Flagship
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: company.color }}>{company.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
            </div>
            <button
              className="mt-4 sm:mt-0 shrink-0 inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-200 hover:opacity-90"
              style={{ background: `${company.color}22`, color: company.color }}
              aria-label={`Learn more about ${company.name}`}
            >
              Learn More
              <ArrowUpRight size={13} aria-hidden="true" />
            </button>
          </div>
        ))}

        {/* Grid — remaining four companies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {companies.filter((c) => !c.featured).map((company) => (
            <div
              key={company.name}
              className="group relative flex flex-col gap-4 rounded-2xl p-7 glass-card transition-all duration-300 hover:border-white/20 overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-25 blur-[60px]"
                style={{ background: company.color }}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${company.color}22` }}
                >
                  <company.icon size={22} style={{ color: company.color }} aria-hidden="true" />
                </div>
                <button
                  className="inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                  style={{ color: company.color }}
                  aria-label={`Learn more about ${company.name}`}
                >
                  Learn More
                  <ArrowUpRight size={12} aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-foreground">{company.name}</h3>
                <p className="text-xs font-medium" style={{ color: company.color }}>{company.tagline}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-7 right-7 h-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
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
