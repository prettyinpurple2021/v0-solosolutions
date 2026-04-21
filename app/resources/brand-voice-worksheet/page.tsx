"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Download, CheckCircle2, ArrowRight, Printer } from "lucide-react"

const WORKSHEET_SECTIONS = [
  {
    id: "brand-personality",
    title: "1. Brand Personality",
    description: "If your brand were a person, how would they show up?",
    color: "#D93025",
    prompts: [
      { label: "Three adjectives that describe your brand:", placeholder: "e.g., Bold, Approachable, Expert" },
      { label: "Three adjectives your brand is NOT:", placeholder: "e.g., Corporate, Stuffy, Generic" },
      { label: "If your brand were a celebrity, who would it be and why?", placeholder: "e.g., Oprah — warm but authoritative, relatable yet aspirational" },
    ],
  },
  {
    id: "tone-attributes",
    title: "2. Tone Attributes",
    description: "Define where your voice sits on these spectrums.",
    color: "#F07B1F",
    spectrums: [
      { left: "Formal", right: "Casual" },
      { left: "Serious", right: "Playful" },
      { left: "Humble", right: "Confident" },
      { left: "Matter-of-fact", right: "Enthusiastic" },
      { left: "Reserved", right: "Irreverent" },
    ],
  },
  {
    id: "messaging-pillars",
    title: "3. Messaging Pillars",
    description: "The 3-4 core themes you always return to in your content.",
    color: "#F5C400",
    prompts: [
      { label: "Pillar 1:", placeholder: "e.g., Independence — Building on your own terms" },
      { label: "Pillar 2:", placeholder: "e.g., Simplicity — Cutting through complexity" },
      { label: "Pillar 3:", placeholder: "e.g., Growth — Continuous improvement" },
      { label: "Pillar 4 (optional):", placeholder: "e.g., Community — Learning together" },
    ],
  },
  {
    id: "vocabulary",
    title: "4. Vocabulary Guide",
    description: "Words and phrases that define your brand language.",
    color: "#2D9E2A",
    prompts: [
      { label: "Power words we use often:", placeholder: "e.g., Build, Launch, Thrive, Solo, Freedom" },
      { label: "Words we avoid:", placeholder: "e.g., Synergy, Leverage, Disrupt, Hustle" },
      { label: "Our signature phrases:", placeholder: "e.g., 'Build your empire of one', 'Success on your terms'" },
    ],
  },
  {
    id: "audience",
    title: "5. Audience Connection",
    description: "How you speak directly to your ideal customer.",
    color: "#009B94",
    prompts: [
      { label: "We call our audience:", placeholder: "e.g., Solo founders, Solopreneurs, Independents" },
      { label: "Their biggest pain point in one sentence:", placeholder: "e.g., 'Feeling overwhelmed trying to do everything alone'" },
      { label: "The transformation we promise:", placeholder: "e.g., 'From scattered to systematic, from surviving to thriving'" },
    ],
  },
  {
    id: "examples",
    title: "6. Voice in Action",
    description: "Examples of how your brand voice sounds in different contexts.",
    color: "#005FA3",
    prompts: [
      { label: "Social media bio (160 chars):", placeholder: "e.g., Helping solo founders build profitable businesses without the burnout. Tools, tips, and real talk." },
      { label: "Email subject line style:", placeholder: "e.g., Direct and benefit-focused: 'The 3-hour workweek hack'" },
      { label: "How we handle mistakes/apologies:", placeholder: "e.g., Direct acknowledgment, no excuses, focus on fix" },
    ],
  },
]

export default function BrandVoiceWorksheetPage() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [spectrumValues, setSpectrumValues] = useState<Record<string, number>>({
    "Formal-Casual": 3,
    "Serious-Playful": 3,
    "Humble-Confident": 4,
    "Matter-of-fact-Enthusiastic": 3,
    "Reserved-Irreverent": 2,
  })

  const handlePrint = () => {
    window.print()
  }

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
              background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 50%)",
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
                style={{ backgroundColor: "#A78BFA20", color: "#A78BFA" }}
              >
                <Download className="h-3 w-3" />
                Free Template
              </span>
            </div>

            <h1
              className="mb-6 text-balance font-sans text-4xl font-black leading-tight tracking-tight text-white md:text-6xl"
              style={{ textShadow: "4px 4px 0 #000" }}
            >
              Brand Voice Worksheet
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              Define your unique tone, messaging pillars, and communication style. 
              Fill in this interactive worksheet to create a brand voice guide you can reference for all your content.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handlePrint}
                className="group inline-flex items-center gap-2 border border-white bg-white px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-white print:hidden"
                style={{ boxShadow: "4px 4px 0 0 #000" }}
              >
                <Printer className="h-4 w-4" />
                Print Worksheet
              </button>
            </div>
          </div>
        </section>

        {/* Worksheet */}
        <section className="py-16 md:py-24 print:py-8">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-12 print:space-y-8">
              {WORKSHEET_SECTIONS.map((section) => (
                <div
                  key={section.id}
                  className="border border-white/10 bg-[#0F0F11]/60 p-8 print:border-gray-300 print:bg-white print:break-inside-avoid"
                  style={{ boxShadow: "6px 6px 0 0 #000" }}
                >
                  <div
                    className="mb-2 h-1 w-16"
                    style={{ backgroundColor: section.color }}
                  />
                  <h2
                    className="mb-2 font-sans text-xl font-bold text-white print:text-black md:text-2xl"
                    style={{ textShadow: "2px 2px 0 #000" }}
                  >
                    {section.title}
                  </h2>
                  <p className="mb-6 text-white/60 print:text-gray-600">{section.description}</p>

                  {/* Prompts */}
                  {section.prompts && (
                    <div className="space-y-6">
                      {section.prompts.map((prompt, i) => (
                        <div key={i}>
                          <label className="mb-2 block text-sm font-medium text-white/80 print:text-gray-800">
                            {prompt.label}
                          </label>
                          <textarea
                            value={formData[`${section.id}-${i}`] || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                [`${section.id}-${i}`]: e.target.value,
                              }))
                            }
                            placeholder={prompt.placeholder}
                            rows={2}
                            className="w-full resize-none border border-white/20 bg-[#0A0A0C] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none print:border-gray-300 print:bg-gray-50 print:text-black print:placeholder:text-gray-400"
                            style={{ boxShadow: "2px 2px 0 0 #000" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Spectrums */}
                  {section.spectrums && (
                    <div className="space-y-6">
                      {section.spectrums.map((spectrum) => {
                        const key = `${spectrum.left}-${spectrum.right}`
                        return (
                          <div key={key}>
                            <div className="mb-3 flex items-center justify-between text-sm">
                              <span className="text-white/60 print:text-gray-600">{spectrum.left}</span>
                              <span className="text-white/60 print:text-gray-600">{spectrum.right}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((val) => (
                                <button
                                  key={val}
                                  onClick={() =>
                                    setSpectrumValues((prev) => ({ ...prev, [key]: val }))
                                  }
                                  className={`h-10 flex-1 border transition-all ${
                                    spectrumValues[key] === val
                                      ? "border-white bg-white text-black"
                                      : "border-white/20 bg-transparent text-white/40 hover:border-white/40"
                                  } print:border-gray-300`}
                                  style={{ boxShadow: spectrumValues[key] === val ? "2px 2px 0 0 #000" : "none" }}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="mt-12 border border-white/10 bg-[#0F0F11]/60 p-8 print:border-gray-300 print:bg-white"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <h2
                className="mb-4 font-sans text-xl font-bold text-white print:text-black"
                style={{ textShadow: "2px 2px 0 #000" }}
              >
                Quick Reference: Your Brand Voice Summary
              </h2>
              <p className="mb-6 text-white/60 print:text-gray-600">
                Once completed, use this as a quick reference card for all content creation.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-white/10 bg-[#0A0A0C] p-4 print:border-gray-200 print:bg-gray-50">
                  <h3 className="mb-2 text-sm font-bold text-white print:text-black">We Are:</h3>
                  <p className="text-sm text-white/60 print:text-gray-600">
                    {formData["brand-personality-0"] || "[Your 3 adjectives]"}
                  </p>
                </div>
                <div className="border border-white/10 bg-[#0A0A0C] p-4 print:border-gray-200 print:bg-gray-50">
                  <h3 className="mb-2 text-sm font-bold text-white print:text-black">We Are NOT:</h3>
                  <p className="text-sm text-white/60 print:text-gray-600">
                    {formData["brand-personality-1"] || "[Your 3 anti-adjectives]"}
                  </p>
                </div>
                <div className="border border-white/10 bg-[#0A0A0C] p-4 print:border-gray-200 print:bg-gray-50">
                  <h3 className="mb-2 text-sm font-bold text-white print:text-black">Our Pillars:</h3>
                  <p className="text-sm text-white/60 print:text-gray-600">
                    {formData["messaging-pillars-0"] || "[Pillar 1]"}, {formData["messaging-pillars-1"] || "[Pillar 2]"}, {formData["messaging-pillars-2"] || "[Pillar 3]"}
                  </p>
                </div>
                <div className="border border-white/10 bg-[#0A0A0C] p-4 print:border-gray-200 print:bg-gray-50">
                  <h3 className="mb-2 text-sm font-bold text-white print:text-black">Power Words:</h3>
                  <p className="text-sm text-white/60 print:text-gray-600">
                    {formData["vocabulary-0"] || "[Your power words]"}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center print:hidden">
              <p className="mb-6 text-white/60">
                Want to dive deeper into building your solo business? Check out our other resources.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/resources/solo-founder-playbook"
                  className="group inline-flex items-center gap-2 border border-white bg-white px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-white"
                  style={{ boxShadow: "4px 4px 0 0 #000" }}
                >
                  Read Solo Founder Playbook
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
