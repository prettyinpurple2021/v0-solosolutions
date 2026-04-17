import { Lightbulb, Target, Heart } from "lucide-react"
import Image from "next/image"
import { LiquidBlob } from "@/components/liquid-blob"

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
    color: "#EA5A50",
  },
]

export function FeaturesSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* Decorative liquid blobs */}
      <LiquidBlob size={500} variant="a" opacity={0.18} blur={100} className="top-1/3 -left-40" />
      <LiquidBlob size={420} variant="b" opacity={0.16} blur={100} className="-bottom-20 right-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 glass-card chrome-edge">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F07B1F]" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] chrome-text">
              About the Founder
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-balance leading-[1.05] chrome-iridescent">
            Building the future of solo entrepreneurship.
          </h2>
        </div>

        {/* Founder bio card */}
        <div
          className="mb-16 rounded-3xl p-8 sm:p-12 glass-card-deep glass-shimmer chrome-edge relative overflow-hidden"
        >
          {/* Rainbow hairline */}
          <div className="absolute top-0 left-0 right-0 h-px rainbow-stripe" aria-hidden="true" />
          {/* Warm inner glow */}
          <div
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full blur-[80px] opacity-20"
            style={{ background: "#F07B1F" }}
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Iridescent chrome avatar — uses the brand diamond logo */}
            <div className="relative flex-shrink-0">
              <div className="iridescent-ring rounded-[1.75rem] h-28 w-28">
                <div className="flex h-full w-full items-center justify-center rounded-[1.75rem] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
                    alt=""
                    width={96}
                    height={96}
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold chrome-iridescent tracking-tight">
                  The Vision Behind SoloSuccess
                </h3>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F07B1F]">
                  Founder &amp; CEO, SoloSuccess Solutions
                </p>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-body">
                SoloSuccess Solutions was founded on a simple but powerful belief: that a single
                person with the right tools, knowledge, and community can build something
                remarkable. The modern solo entrepreneur faces the same challenges as a full
                enterprise — marketing, operations, technology, education, and community — but
                without the team or budget to match.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-body">
                That gap is exactly what this ecosystem was designed to close. Each company under
                the SoloSuccess umbrella was created to tackle one specific piece of that puzzle —
                giving solo builders access to enterprise-level resources without the
                enterprise-level overhead.
              </p>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((val) => (
            <div
              key={val.title}
              className="group relative rounded-3xl p-7 glass-card glass-shimmer chrome-edge magnetic-hover shimmer-sweep transition-all duration-700 overflow-hidden"
              style={{ borderColor: `${val.color}44` }}
            >
              <span className="sweep" aria-hidden="true" />
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${val.color}aa 50%, transparent 100%)`,
                }}
                aria-hidden="true"
              />
              {/* Color wash on hover */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-30 blur-[60px]"
                style={{ background: val.color }}
                aria-hidden="true"
              />

              {/* Icon in chrome ring */}
              <div className="relative mb-5 chrome-ring rounded-xl h-12 w-12 inline-flex">
                <div className="flex h-full w-full items-center justify-center rounded-xl">
                  <val.icon size={20} style={{ color: val.color }} aria-hidden="true" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-extrabold chrome-text tracking-tight">
                {val.title}
              </h3>
              <p className="text-sm leading-relaxed text-body">{val.description}</p>

              {/* Hover bottom glow */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${val.color}, transparent)`,
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
