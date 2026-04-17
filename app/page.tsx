import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { FeaturesSection } from "@/components/features-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Reveal } from "@/components/reveal"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSection />
          <Reveal>
            <EcosystemSection />
          </Reveal>
          <Reveal>
            <FeaturesSection />
          </Reveal>
          <Reveal>
            <CtaSection />
          </Reveal>
        </main>
        <Footer />
      </div>
    </div>
  )
}
