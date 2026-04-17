import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { FeaturesSection } from "@/components/features-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <AnimatedBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSection />
          <EcosystemSection />
          <FeaturesSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
