"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function EmailPreferences() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [preferences, setPreferences] = useState({
    marketing: true,
    productUpdates: true,
    communityDigest: true,
    courses: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send an API request to update preferences
    console.log("Email preferences updated:", { email, preferences })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail("")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <article className="mx-auto max-w-2xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
            style={{ color: "#009B94" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 rainbow-text font-display">
              Email Preferences
            </h1>
            <p className="text-body">
              Manage your email subscription preferences and unsubscribe from any SoloSuccess Solutions communications.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-8">
            {/* Success Message */}
            {submitted && (
              <div className="glass-card rounded-lg p-6 border-l-4" style={{ borderLeftColor: "#2D9E2A" }}>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-5 w-5" style={{ color: "#2D9E2A" }} />
                  <h3 className="font-semibold text-foreground">Preferences Updated</h3>
                </div>
                <p className="text-sm text-body">
                  Your email preferences have been updated. Check your email for confirmation.
                </p>
              </div>
            )}

            {/* Preferences Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="glass-card rounded-lg p-6">
                <label htmlFor="email" className="block text-sm font-medium mb-3 text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <p className="text-xs text-body-dim mt-2">
                  Enter the email address associated with your SoloSuccess account.
                </p>
              </div>

              {/* Preferences Checkboxes */}
              <div className="glass-card rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground mb-4">Subscription Preferences</h2>

                {[
                  {
                    id: "marketing",
                    label: "Marketing & Promotions",
                    description: "New features, special offers, and product announcements.",
                  },
                  {
                    id: "productUpdates",
                    label: "Product Updates",
                    description: "Important updates about services you use.",
                  },
                  {
                    id: "communityDigest",
                    label: "Community Digest",
                    description: "Weekly or monthly updates from SoloSuccess Connect.",
                  },
                  {
                    id: "courses",
                    label: "Course & Academy Updates",
                    description: "New courses, materials, and educational content.",
                  },
                ].map((pref) => (
                  <label key={pref.id} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={preferences[pref.id as keyof typeof preferences]}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          [pref.id]: e.target.checked,
                        }))
                      }
                      className="mt-1 w-4 h-4 rounded border-border bg-input accent-accent"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {pref.label}
                      </p>
                      <p className="text-xs text-body-dim">{pref.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Warning */}
              <div className="glass-card rounded-lg p-4 border-l-4" style={{ borderLeftColor: "#F07B1F" }}>
                <p className="text-xs md:text-sm text-body">
                  Note: We'll always send you critical account and service emails regardless of these preferences. This only controls marketing and non-essential communications.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-md font-medium transition-all"
                  style={{
                    background: "linear-gradient(135deg, #005FA3 0%, #6B44A0 100%)",
                    color: "white",
                  }}
                >
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={() => setPreferences({ marketing: false, productUpdates: false, communityDigest: false, courses: false })}
                  className="px-6 py-2.5 rounded-md font-medium border border-white/10 text-body hover:bg-white/5 transition-colors"
                >
                  Unsubscribe All
                </button>
              </div>
            </form>

            {/* Help */}
            <div className="glass-card rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-3">Having trouble?</h3>
              <p className="text-sm text-body mb-3">
                If you're unable to manage your preferences here, you can reply to any email from us with "unsubscribe" or contact our support team.
              </p>
              <Link href="/privacy#contact" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#005FA3" }}>
                View Contact Info
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
