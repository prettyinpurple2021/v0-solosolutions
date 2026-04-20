"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate API call — replace with actual newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // For now, always succeed (replace with real logic)
    setStatus("success")
    setMessage("You're in! Check your inbox for a welcome email.")
    setEmail("")
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0D] py-20 md:py-28">
      {/* Rainbow gradient accent line at top */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)",
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(107,68,160,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Icon */}
        <div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-white/20 bg-[#0F0F11]"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          <Mail className="h-6 w-6 text-white" />
        </div>

        {/* Header */}
        <h2
          className="mb-4 text-balance font-sans text-2xl font-black leading-tight tracking-tight text-white md:text-4xl"
          style={{ textShadow: "3px 3px 0 #000" }}
        >
          Get the Solo Success Letter
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-pretty text-sm leading-relaxed text-white/70 md:text-base">
          Weekly insights, tools, and strategies for building a thriving solo business. No spam, unsubscribe anytime.
        </p>

        {/* Form */}
        {status === "success" ? (
          <div className="mx-auto flex max-w-md items-center justify-center gap-3 border border-[#2D9E2A]/50 bg-[#2D9E2A]/10 px-6 py-4">
            <Check className="h-5 w-5 text-[#2D9E2A]" />
            <span className="text-sm font-medium text-[#2D9E2A]">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === "loading"}
                className="h-12 w-full border border-white/20 bg-[#0F0F11] px-4 font-sans text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none disabled:opacity-50"
                style={{ boxShadow: "4px 4px 0 0 #000" }}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex h-12 items-center justify-center gap-2 border border-white bg-white px-6 font-mono text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ boxShadow: "4px 4px 0 0 #000" }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">{message}</p>
        )}

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>Join 2,500+ solopreneurs</span>
          <span className="hidden sm:inline">·</span>
          <span>Weekly tips</span>
          <span className="hidden sm:inline">·</span>
          <span>100% free</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/email-preferences" className="hover:text-white/60 transition-colors">
            Manage preferences
          </Link>
        </div>
      </div>
    </section>
  )
}
