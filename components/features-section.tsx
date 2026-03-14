import { Layers, Cpu, Globe, Shield, BarChart2, Zap } from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "Modular Architecture",
    description:
      "Stack and compose project modules with precision. Every component of your ecosystem plugs in seamlessly.",
    accent: "oklch(0.58 0.22 255)",
  },
  {
    icon: Cpu,
    title: "AI-Powered Insights",
    description:
      "Harness intelligent automation that learns your workflow and surfaces opportunities before you see them.",
    accent: "oklch(0.45 0.22 300)",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Deploy from anywhere. Your solutions reach every corner of the planet with sub-100ms latency guarantees.",
    accent: "oklch(0.62 0.14 185)",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Zero-trust architecture from day one. Your data, your rules — protected by multi-layer encryption.",
    accent: "oklch(0.58 0.22 255)",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Live dashboards that distill signal from noise, giving you the clarity to make bold, informed decisions.",
    accent: "oklch(0.62 0.14 185)",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description:
      "From concept to live in minutes. The launchpad handles the complexity so you stay focused on impact.",
    accent: "oklch(0.45 0.22 300)",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Faint nebula orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-15 blur-[130px]"
          style={{ background: "radial-gradient(circle, oklch(0.45 0.22 300), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span
            className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest glass-card"
            style={{ color: "oklch(0.62 0.14 185)", borderColor: "oklch(0.62 0.14 185 / 0.25)" }}
          >
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Every tool you need.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, oklch(0.45 0.22 300) 0%, oklch(0.62 0.14 185) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nothing you don&apos;t.
            </span>
          </h2>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Built specifically for solo founders and small teams who need enterprise-grade power without the overhead.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group relative rounded-2xl p-6 glass-card transition-all duration-300 hover:border-primary/30"
            >
              {/* Icon */}
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${feat.accent}22` }}
              >
                <feat.icon size={20} style={{ color: feat.accent }} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>

              {/* Subtle hover glow line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{ background: feat.accent }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
