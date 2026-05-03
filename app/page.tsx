import { Navbar } from "@/components/navbar"
import { SolarSystemHero } from "@/components/solar-system-hero"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { ResourcesSection } from "@/components/resources-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030308] font-sans relative">
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <SolarSystemHero />
          <FeaturesSection />
          <PricingSection />
          <ResourcesSection />
          <NewsletterSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
