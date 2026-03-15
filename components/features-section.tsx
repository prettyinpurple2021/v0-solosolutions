import { Lightbulb, Target, Heart } from "lucide-react"

const values = [
  {
    icon: Lightbulb,
    title: "Built from Experience",
    description:
      "Every company in the SoloSuccess family was born out of a real problem faced on the solo entrepreneur journey — not a whiteboard exercise.",
    color: "#F5C400",
  },
  {
    icon: Target,
    title: "Focused on Execution",
    description:
      "Ideas are easy. Execution is everything. SoloSuccess Solutions exists to give solo builders the same resources that large teams have access to.",
    color: "#009B94",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Solo doesn't mean alone. The entire SoloSuccess ecosystem is designed to connect, support, and elevate the community of builders around it.",
    color: "#D93025",
  },
]

export function FeaturesSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Background orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-12 blur-[130px]"
          style={{ background: "radial-gradient(circle, #2D9E2A, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span
            className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest glass-card"
            style={{ color: "#F07B1F", borderColor: "#F07B1F40" }}
          >
            About the Founder
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Building the future of{" "}
            <span style={{ color: "#F07B1F" }}>solo entrepreneurship.</span>
          </h2>
        </div>

        {/* Founder bio card */}
        <div className="mb-14 rounded-2xl p-8 sm:p-10 glass-card">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Avatar placeholder */}
            <div
              className="flex-shrink-0 flex h-24 w-24 items-center justify-center rounded-2xl text-4xl font-bold"
              style={{ background: "linear-gradient(135deg, #6B44A0, #005FA3)", color: "#fff" }}
              aria-hidden="true"
            >
              S
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">The Vision Behind SoloSuccess</h3>
                <p className="text-sm mt-0.5" style={{ color: "#6B44A0" }}>Founder &amp; CEO, SoloSuccess Solutions</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                SoloSuccess Solutions was founded on a simple but powerful belief: that a single person with the right
                tools, knowledge, and community can build something remarkable. The modern solo entrepreneur faces the
                same challenges as a full enterprise — marketing, operations, technology, education, and community —
                but without the team or budget to match.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                That gap is exactly what this ecosystem was designed to close. Each company under the SoloSuccess
                umbrella was created to tackle one specific piece of that puzzle — giving solo builders access to
                enterprise-level resources without the enterprise-level overhead.
              </p>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((val) => (
            <div
              key={val.title}
              className="group relative rounded-2xl p-6 glass-card transition-all duration-300 hover:border-white/20"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${val.color}22` }}
              >
                <val.icon size={20} style={{ color: val.color }} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{val.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>

              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                style={{ background: val.color }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
