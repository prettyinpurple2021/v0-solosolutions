"use client"

import Link from "next/link"
import { ArrowRight, FileText, Video, Download } from "lucide-react"

const RESOURCES = [
  {
    type: "guide",
    icon: FileText,
    title: "The Solo Founder Playbook",
    description: "A comprehensive guide to building, launching, and scaling your solo business from scratch.",
    category: "Guide",
    readTime: "15 min read",
    color: "#B6FF3C",
    href: "/resources/solo-founder-playbook",
  },
  {
    type: "video",
    icon: Video,
    title: "Content Strategy Masterclass",
    description: "Learn how to create a 90-day content plan that drives engagement and builds authority.",
    category: "Video Series",
    readTime: "6 episodes",
    color: "#FFC53D",
    href: "/resources/content-strategy-masterclass",
  },
  {
    type: "template",
    icon: Download,
    title: "Brand Voice Worksheet",
    description: "Define your unique tone, messaging pillars, and communication style with this fill-in template.",
    category: "Template",
    readTime: "Free download",
    color: "#A78BFA",
    href: "/resources/brand-voice-worksheet",
  },
]

export function ResourcesSection() {
  return (
    <section id="resources" className="relative w-full overflow-hidden bg-[#0A0A0C] py-24 md:py-32">
      {/* Subtle gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,229,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="flex flex-col gap-4">
            <span
              className="inline-flex w-fit items-center gap-2 border border-white bg-[#0A0A0C] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white md:self-start"
              style={{ boxShadow: "4px 4px 0 0 #000" }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
              Resources
            </span>
            <h2
              className="max-w-lg text-balance font-sans text-3xl font-black leading-tight tracking-tight text-white md:text-5xl"
              style={{ textShadow: "3px 3px 0 #000" }}
            >
              Free guides and templates
            </h2>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-white/70 md:text-base">
              Actionable resources to help you build and grow your solo business.
            </p>
          </div>

          <Link
            href="#"
            className="group inline-flex items-center gap-2 border border-white bg-[#0A0A0C] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
          >
            View All Resources
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Resources grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {RESOURCES.map((resource, i) => {
            const Icon = resource.icon
            return (
              <Link
                key={i}
                href={resource.href}
                className="group relative flex flex-col gap-4 border border-white/10 bg-[#0F0F11]/60 p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#131315]"
                style={{
                  boxShadow: "4px 4px 0 0 #000",
                }}
              >
                {/* Category badge + Icon */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${resource.color}15`,
                      color: resource.color,
                    }}
                  >
                    <Icon className="h-3 w-3" />
                    {resource.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/40">{resource.readTime}</span>
                </div>

                {/* Title */}
                <h3
                  className="font-sans text-lg font-bold leading-snug text-white"
                  style={{ textShadow: "1px 1px 0 #000" }}
                >
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/60">{resource.description}</p>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 pt-4 font-mono text-xs font-bold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
                  {resource.type === "template" ? "Download Free" : "Read Now"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Hover accent */}
                <div
                  className="absolute right-0 top-0 h-0 w-1 transition-all duration-300 group-hover:h-full"
                  style={{ backgroundColor: resource.color }}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
