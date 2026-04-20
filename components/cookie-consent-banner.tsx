"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    // Check if user has already made a choice
    const consentChoice = localStorage.getItem("solo-cookie-consent")
    if (!consentChoice) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("solo-cookie-consent", "accepted")
    setIsVisible(false)
    // Track consent acceptance
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      })
    }
  }

  const handleRejectAll = () => {
    localStorage.setItem("solo-cookie-consent", "rejected")
    setIsVisible(false)
    // Update consent to rejected
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      })
    }
  }

  const handleDismiss = () => {
    localStorage.setItem("solo-cookie-consent", "dismissed")
    setIsVisible(false)
  }

  if (!isHydrated || !isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-2xl glass-card-deep rounded-lg p-5 md:p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              We use cookies to enhance your experience
            </h3>
            <p className="text-xs md:text-sm text-body-dim leading-relaxed">
              We use essential cookies to keep the site secure, functional, and fast. Analytics cookies help us understand how you use our services so we can improve them. You can manage your preferences at any time.{" "}
              <Link href="/privacy#cookies" className="underline hover:text-foreground transition-colors">
                Learn more
              </Link>
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-sm font-medium rounded-md border border-white/10 text-body hover:bg-white/5 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm font-medium rounded-md"
            style={{
              background: "linear-gradient(135deg, #005FA3 0%, #6B44A0 100%)",
              color: "white",
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
