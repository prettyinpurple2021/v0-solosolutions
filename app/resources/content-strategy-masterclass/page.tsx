import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Video, Clock, Play, CheckCircle2, ArrowRight, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Content Strategy Masterclass — SoloSuccess Solutions",
  description: "Learn how to create a 90-day content plan that drives engagement and builds authority. Free 6-episode video series for solo founders.",
}

const EPISODES = [
  {
    number: 1,
    title: "The Content Flywheel",
    description: "Understanding how content compounds over time and builds lasting authority in your niche.",
    duration: "12 min",
    topics: [
      "Why 'content is king' is only half the story",
      "The compound effect of consistent publishing",
      "Building a content flywheel that works while you sleep",
      "Metrics that actually matter for solo founders",
    ],
    color: "#D93025",
    available: true,
  },
  {
    number: 2,
    title: "Finding Your Content Pillars",
    description: "Identify the 3-5 topics you'll own and become known for in your space.",
    duration: "15 min",
    topics: [
      "The intersection of expertise, audience needs, and search demand",
      "Mapping your pillar content to your offer stack",
      "Creating topic clusters that dominate search",
      "The 'content moat' strategy",
    ],
    color: "#F07B1F",
    available: true,
  },
  {
    number: 3,
    title: "The 90-Day Content Calendar",
    description: "Build a realistic, sustainable content schedule that fits your solo founder life.",
    duration: "18 min",
    topics: [
      "Batch creation: the secret weapon of prolific creators",
      "Weekly, monthly, and quarterly content rhythms",
      "Template: The 90-day content calendar (downloadable)",
      "Buffer content and emergency reserves",
    ],
    color: "#F5C400",
    available: true,
  },
  {
    number: 4,
    title: "Repurposing Like a Pro",
    description: "Turn one piece of content into 10+ assets across multiple platforms.",
    duration: "14 min",
    topics: [
      "The content waterfall: long-form to micro-content",
      "Platform-specific optimization without extra work",
      "Tools for efficient repurposing",
      "Case study: One blog post, 15 pieces of content",
    ],
    color: "#2D9E2A",
    available: true,
  },
  {
    number: 5,
    title: "Distribution That Drives Results",
    description: "Get your content in front of the right people without paid ads.",
    duration: "16 min",
    topics: [
      "Organic distribution channels ranked by ROI",
      "Building relationships with amplifiers",
      "Email list integration with content strategy",
      "The 80/20 of social media for solopreneurs",
    ],
    color: "#009B94",
    available: true,
  },
  {
    number: 6,
    title: "Measuring & Iterating",
    description: "Track what works, cut what doesn't, and continuously improve your content engine.",
    duration: "13 min",
    topics: [
      "The solo founder's content dashboard",
      "Leading vs. lagging indicators",
      "Monthly content reviews that take 30 minutes",
      "When to pivot your content strategy",
    ],
    color: "#005FA3",
    available: true,
  },
]

const BONUSES = [
  "90-Day Content Calendar Template (Notion + Google Sheets)",
  "50 Headline Formulas That Convert",
  "Content Repurposing Checklist",
  "Platform-Specific Best Practices Cheat Sheet",
]

export default function ContentStrategyMasterclassPage() {
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
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,197,61,0.08) 0%, transparent 50%)",
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
                style={{ backgroundColor: "#FFC53D20", color: "#FFC53D" }}
              >
                <Video className="h-3 w-3" />
                Video Series
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white/50">
                <Clock className="h-3 w-3" />
                6 episodes • 88 min total
              </span>
            </div>

            <h1
              className="mb-6 text-balance font-sans text-4xl font-black leading-tight tracking-tight text-white md:text-6xl"
              style={{ textShadow: "4px 4px 0 #000" }}
            >
              Content Strategy Masterclass
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              Learn how to create a 90-day content plan that drives engagement and builds authority. 
              A complete system for solo founders who want to grow through content without burning out.
            </p>
          </div>
        </section>

        {/* Episodes */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2
              className="mb-8 font-sans text-2xl font-bold text-white"
              style={{ textShadow: "2px 2px 0 #000" }}
            >
              Course Episodes
            </h2>

            <div className="space-y-6">
              {EPISODES.map((episode) => (
                <article
                  key={episode.number}
                  className="group relative border border-white/10 bg-[#0F0F11]/60 transition-all hover:border-white/20"
                  style={{ boxShadow: "6px 6px 0 0 #000" }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Episode thumbnail/number */}
                    <div
                      className="flex flex-shrink-0 items-center justify-center p-8 md:w-48"
                      style={{ backgroundColor: `${episode.color}15` }}
                    >
                      <div className="relative">
                        <span
                          className="font-mono text-5xl font-black"
                          style={{ color: episode.color, textShadow: "2px 2px 0 #000" }}
                        >
                          {String(episode.number).padStart(2, "0")}
                        </span>
                        {episode.available && (
                          <div
                            className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: episode.color }}
                          >
                            <Play className="h-4 w-4 text-black ml-0.5" fill="currentColor" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Episode content */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="mb-2 flex items-center gap-3">
                        <h3
                          className="font-sans text-lg font-bold text-white md:text-xl"
                          style={{ textShadow: "1px 1px 0 #000" }}
                        >
                          {episode.title}
                        </h3>
                        <span className="font-mono text-[10px] text-white/40">{episode.duration}</span>
                      </div>
                      <p className="mb-4 text-sm text-white/60">{episode.description}</p>

                      <ul className="space-y-2">
                        {episode.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                              style={{ color: episode.color }}
                            />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>

                      {episode.available && (
                        <button
                          className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:text-white"
                          style={{ color: episode.color }}
                        >
                          <Play className="h-3.5 w-3.5" />
                          Watch Episode
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bonuses */}
            <div
              className="mt-12 border border-white/10 bg-[#0F0F11]/60 p-8"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <h2
                className="mb-6 font-sans text-xl font-bold text-white"
                style={{ textShadow: "2px 2px 0 #000" }}
              >
                Included Bonuses
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {BONUSES.map((bonus, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 border border-white/10 bg-[#0A0A0C] p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FFC53D]" />
                    <span className="text-sm text-white/80">{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="mb-6 text-white/60">
                Ready to build your content engine? Start with Episode 1 or explore our other resources.
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
                  href="/resources/solo-founder-playbook"
                  className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white hover:text-black"
                  style={{ boxShadow: "4px 4px 0 0 #000" }}
                >
                  Read Solo Founder Playbook
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
