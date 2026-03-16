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
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-12 blur-[130px]"
          style={{ background: "radial-gradient(circle, #2D9E2A, transparent 65%)" }} />
        <div className="absolute top-0 right-1/4 h-[350px] w-[350px] rounded-full opacity-10 blur-[110px]"
          style={{ background: "radial-gradient(circle, #F07B1F, transparent 65%)" }} />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #6B44A0, transparent 65%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span className="font-display text-xl font-semibold rainbow-text">
            About the Founder
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance rainbow-text">
            Building the future of solo entrepreneurship.
          </h2>
        </div>

        {/* Founder bio card */}
        <div
          className="mb-14 rounded-2xl p-8 sm:p-10 glass-card-deep glass-shimmer relative overflow-hidden"
          style={{ borderColor: "#F07B1F55" }}
        >
            {/* Rainbow top border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
              aria-hidden="true"
            />
            {/* Warm inner glow */}
            <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full blur-[60px] opacity-20"
              style={{ background: "#F07B1F" }}
              aria-hidden="true"
            />
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className="flex-shrink-0 flex h-24 w-24 items-center justify-center rounded-2xl text-5xl font-extrabold"
              style={{
                background: "linear-gradient(135deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)",
                color: "#fff",
              }}
              aria-hidden="true"
            >
              S
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-extrabold rainbow-text">The Vision Behind SoloSuccess</h3>
                <p className="text-sm mt-0.5 font-display font-semibold" style={{ color: "#F07B1F" }}>
                  Founder &amp; CEO, SoloSuccess Solutions
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>
                SoloSuccess Solutions was founded on a simple but powerful belief: that a single person with the right
                tools, knowledge, and community can build something remarkable. The modern solo entrepreneur faces the
                same challenges as a full enterprise — marketing, operations, technology, education, and community —
                but without the team or budget to match.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>
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
              className="group relative rounded-2xl p-6 glass-card glass-shimmer transition-all duration-700 overflow-hidden hover:glass-card-deep"
              style={{ borderColor: `${val.color}44` }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${val.color}, transparent)` }}
                aria-hidden="true"
              />
              {/* Icon with glow */}
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${val.color}22`, border: `2px solid ${val.color}55`, boxShadow: `0 0 18px ${val.color}44` }}
              >
                <val.icon size={20} style={{ color: val.color }} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-extrabold" style={{ color: val.color }}>{val.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8a8fa8" }}>{val.description}</p>

              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-50"
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
