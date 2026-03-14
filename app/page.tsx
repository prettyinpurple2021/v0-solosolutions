import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <EcosystemSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
