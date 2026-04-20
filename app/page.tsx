import { Navbar } from "@/components/navbar"
import { OrbitingEcosystem } from "@/components/orbiting-ecosystem"
import { FeaturesSection } from "@/components/features-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <OrbitingEcosystem />
          <FeaturesSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
