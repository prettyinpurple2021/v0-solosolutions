import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    tag: "Strategy",
    title: "Orbit Planner",
    description:
      "Map your 90-day vision across milestones, deliverables, and revenue targets. Keep every launch on trajectory.",
    status: "Live",
    statusColor: "oklch(0.62 0.14 185)",
    accentColor: "oklch(0.58 0.22 255)",
    size: "lg",
  },
  {
    tag: "Automation",
    title: "Pulse Engine",
    description:
      "Automate repetitive workflows and reclaim hours every week. The engine runs while you sleep.",
    status: "Beta",
    statusColor: "oklch(0.58 0.22 255)",
    accentColor: "oklch(0.45 0.22 300)",
    size: "sm",
  },
  {
    tag: "Analytics",
    title: "Signal Dashboard",
    description:
      "Unified metrics across every channel, distilled into a single real-time command center.",
    status: "Live",
    statusColor: "oklch(0.62 0.14 185)",
    accentColor: "oklch(0.62 0.14 185)",
    size: "sm",
  },
  {
    tag: "Community",
    title: "Nexus Network",
    description:
      "Connect with fellow solo founders, share resources, and co-create solutions in a curated space.",
    status: "Coming Soon",
    statusColor: "oklch(0.45 0.22 300)",
    accentColor: "oklch(0.45 0.22 300)",
    size: "md",
  },
  {
    tag: "Finance",
    title: "Revenue Vault",
    description:
      "Track MRR, manage invoices, and forecast growth — all from one secured financial cockpit.",
    status: "Beta",
    statusColor: "oklch(0.58 0.22 255)",
    accentColor: "oklch(0.58 0.22 255)",
    size: "md",
  },
  {
    tag: "Deployment",
    title: "LaunchPad",
    description:
      "Ship products and landing pages with zero-config deployments. From idea to the world in minutes.",
    status: "Live",
    statusColor: "oklch(0.62 0.14 185)",
    accentColor: "oklch(0.62 0.14 185)",
    size: "sm",
  },
]

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Nebula background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-24 -left-24 h-[600px] w-[600px] rounded-full opacity-20 blur-[130px]"
          style={{ background: "radial-gradient(circle, oklch(0.58 0.22 255), transparent 70%)" }}
        />
        <div
          className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full opacity-15 blur-[110px]"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.14 185), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span
            className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest glass-card"
            style={{ color: "oklch(0.58 0.22 255)", borderColor: "oklch(0.58 0.22 255 / 0.25)" }}
          >
            Project Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Your complete{" "}
            <span
              style={{
                background: "linear-gradient(90deg, oklch(0.58 0.22 255) 0%, oklch(0.45 0.22 300) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              mission control.
            </span>
          </h2>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Six interconnected modules that work in concert — each one powerful alone, unstoppable together.
          </p>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative flex flex-col justify-between rounded-2xl p-7 glass-card transition-all duration-300 hover:border-primary/30 overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              {/* Accent glow top-right corner */}
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-25 blur-[60px]"
                style={{ background: project.accentColor }}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3 flex-1">
                {/* Tag + Status row */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="rounded-md px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${project.accentColor}22`,
                      color: project.accentColor,
                    }}
                  >
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: project.statusColor }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium" style={{ color: project.statusColor }}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <h3
                  className={`font-bold text-foreground tracking-tight ${
                    i === 0 ? "text-2xl" : "text-lg"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
              </div>

              {/* Launch link */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <button
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                  style={{ color: project.accentColor }}
                  aria-label={`Launch ${project.title}`}
                >
                  Launch
                  <ArrowUpRight size={13} aria-hidden="true" />
                </button>
                <span className="text-[10px] text-muted-foreground">SoloSuccess</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
