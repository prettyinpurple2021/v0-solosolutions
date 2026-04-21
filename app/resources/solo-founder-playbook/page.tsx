import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Clock, FileText, CheckCircle2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "The Solo Founder Playbook — SoloSuccess Solutions",
  description: "A comprehensive guide to building, launching, and scaling your solo business from scratch. Free 15-minute read packed with actionable strategies.",
}

const CHAPTERS = [
  {
    number: "01",
    title: "Mindset: The Solo Advantage",
    content: [
      "Why being solo is a superpower, not a limitation",
      "The compound effect of focused execution",
      "Building systems that scale without employees",
      "Managing energy, not just time",
    ],
    color: "#D93025",
  },
  {
    number: "02",
    title: "Finding Your Profitable Niche",
    content: [
      "The intersection of passion, skill, and market demand",
      "How to validate your idea before building anything",
      "Identifying your 'minimum viable audience'",
      "Positioning yourself as the obvious choice",
    ],
    color: "#F07B1F",
  },
  {
    number: "03",
    title: "Building Your Offer Stack",
    content: [
      "Creating a value ladder from free to premium",
      "Pricing strategies that maximize revenue per customer",
      "Packaging services vs. products vs. hybrid models",
      "The 'productized service' goldilocks zone",
    ],
    color: "#F5C400",
  },
  {
    number: "04",
    title: "Marketing as a Solo Founder",
    content: [
      "Content-first marketing: building in public",
      "The 80/20 of social media for solopreneurs",
      "Email list building without paid ads",
      "Strategic partnerships and collaborations",
    ],
    color: "#2D9E2A",
  },
  {
    number: "05",
    title: "Systems & Automation",
    content: [
      "The tools that actually matter (and which to skip)",
      "Automating repetitive tasks with no-code tools",
      "Creating SOPs for your future self",
      "When to hire help vs. automate vs. eliminate",
    ],
    color: "#009B94",
  },
  {
    number: "06",
    title: "Scaling Without Burning Out",
    content: [
      "Setting boundaries that protect your energy",
      "The revenue vs. freedom tradeoff",
      "Building recurring revenue streams",
      "Planning your exit or evolution",
    ],
    color: "#005FA3",
  },
]

const KEY_TAKEAWAYS = [
  "Start with a 'minimum viable offer' — you can always expand later",
  "Your personal brand IS your company brand as a solo founder",
  "Document everything — your future self will thank you",
  "Revenue solves most problems; prioritize getting to profitability fast",
  "Build assets (content, email list, products) not just income",
  "Say no to 90% of opportunities to say yes to the right 10%",
]

export default function SoloFounderPlaybookPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0A0A0C] pb-16 pt-32 md:pb-24 md:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(182,255,60,0.08) 0%, transparent 50%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Link
              href="/#resources"
              className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Resources
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: "#B6FF3C20", color: "#B6FF3C" }}
              >
                <FileText className="h-3 w-3" />
                Free Guide
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white/50">
                <Clock className="h-3 w-3" />
                15 min read
              </span>
            </div>

            <h1
              className="mb-6 text-balance font-sans text-4xl font-black leading-tight tracking-tight text-white md:text-6xl"
              style={{ textShadow: "4px 4px 0 #000" }}
            >
              The Solo Founder Playbook
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              A comprehensive guide to building, launching, and scaling your solo business from scratch. 
              No fluff, no theory — just actionable strategies that work.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            {/* Introduction */}
            <div className="mb-16 border-l-2 border-white/20 pl-6">
              <p className="text-lg leading-relaxed text-white/80">
                Being a solo founder is one of the most rewarding paths you can take — full creative control, 
                no corporate politics, and the freedom to build exactly what you want. But it also comes with 
                unique challenges: you wear every hat, make every decision, and carry the full weight of success or failure.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                This playbook distills years of lessons from successful solo founders into a practical framework 
                you can follow. Whether you are just starting out or looking to scale what you have already built, 
                these principles will help you build a sustainable, profitable business on your own terms.
              </p>
            </div>

            {/* Chapters */}
            <div className="space-y-12">
              {CHAPTERS.map((chapter) => (
                <article
                  key={chapter.number}
                  className="group relative border border-white/10 bg-[#0F0F11]/60 p-8 transition-all hover:border-white/20"
                  style={{ boxShadow: "6px 6px 0 0 #000" }}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1 transition-all"
                    style={{ backgroundColor: chapter.color }}
                  />
                  <div className="flex items-start gap-6">
                    <span
                      className="flex-shrink-0 font-mono text-4xl font-black"
                      style={{ color: chapter.color, textShadow: "2px 2px 0 #000" }}
                    >
                      {chapter.number}
                    </span>
                    <div className="flex-1">
                      <h2
                        className="mb-4 font-sans text-xl font-bold text-white md:text-2xl"
                        style={{ textShadow: "2px 2px 0 #000" }}
                      >
                        {chapter.title}
                      </h2>
                      <ul className="space-y-3">
                        {chapter.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/70">
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 flex-shrink-0"
                              style={{ color: chapter.color }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="mt-16 border border-white/10 bg-[#0F0F11]/60 p-8" style={{ boxShadow: "6px 6px 0 0 #000" }}>
              <h2
                className="mb-6 font-sans text-2xl font-bold text-white"
                style={{ textShadow: "2px 2px 0 #000" }}
              >
                Key Takeaways
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {KEY_TAKEAWAYS.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-black"
                      style={{ backgroundColor: "#B6FF3C" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-white/80">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="mb-6 text-white/60">
                Ready to put these principles into action? Explore our other resources or connect with our community.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/resources/brand-voice-worksheet"
                  className="group inline-flex items-center gap-2 border border-white bg-white px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-white"
                  style={{ boxShadow: "4px 4px 0 0 #000" }}
                >
                  Get Brand Voice Worksheet
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/#resources"
                  className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white hover:text-black"
                  style={{ boxShadow: "4px 4px 0 0 #000" }}
                >
                  View All Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
