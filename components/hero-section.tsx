import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

const heroLetters = [
  { char: "S", color: "#D93025" },
  { char: "o", color: "#E04B1E" },
  { char: "l", color: "#F07B1F" },
  { char: "o", color: "#F5A623" },
  { char: "S", color: "#F5C400" },
  { char: "u", color: "#8FB800" },
  { char: "c", color: "#2D9E2A" },
  { char: "c", color: "#009B6E" },
  { char: "e", color: "#009B94" },
  { char: "s", color: "#0077BB" },
  { char: "s", color: "#005FA3" },
]

const orbKeyframes = `
  @keyframes drift-a {
    0%   { transform: translate3d(0vw,   0vh,  0); }
    20%  { transform: translate3d(8vw,  -6vh,  0); }
    40%  { transform: translate3d(5vw, -12vh,  0); }
    60%  { transform: translate3d(-4vw, -8vh,  0); }
    80%  { transform: translate3d(-7vw,  3vh,  0); }
    100% { transform: translate3d(0vw,   0vh,  0); }
  }
  @keyframes drift-b {
    0%   { transform: translate3d(0vw,   0vh,  0); }
    25%  { transform: translate3d(-10vw,  7vh,  0); }
    50%  { transform: translate3d(-6vw, -10vh,  0); }
    75%  { transform: translate3d(9vw,   5vh,  0); }
    100% { transform: translate3d(0vw,   0vh,  0); }
  }
  @keyframes drift-c {
    0%   { transform: translate3d(0vw,  0vh,  0); }
    33%  { transform: translate3d(7vw,  9vh,  0); }
    66%  { transform: translate3d(-8vw, 5vh,  0); }
    100% { transform: translate3d(0vw,  0vh,  0); }
  }
`

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-label="Hero"
    >
      {/* Keyframes injected directly so they can never be overridden */}
      <style dangerouslySetInnerHTML={{ __html: orbKeyframes }} />

      {/* Soft cloud-like color washes — full logo spectrum */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple — top left */}
        <div className="absolute -top-64 -left-64 h-[1100px] w-[1100px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle at 40% 40%, #6B44A0cc, #6B44A055 45%, transparent 70%)", animationName: "drift-a", animationDuration: "240s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} />
        {/* Blue — bottom right */}
        <div className="absolute -bottom-64 -right-64 h-[1000px] w-[1000px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle at 60% 60%, #005FA3cc, #005FA355 45%, transparent 70%)", animationName: "drift-b", animationDuration: "280s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} />
        {/* Teal — center right */}
        <div className="absolute top-1/3 right-0 h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle at 50% 50%, #009B94bb, #009B9444 45%, transparent 70%)", animationName: "drift-c", animationDuration: "200s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} />
        {/* Red — bottom left */}
        <div className="absolute bottom-0 -left-32 h-[650px] w-[650px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle at 40% 60%, #D93025bb, #D9302544 45%, transparent 70%)", animationName: "drift-a", animationDuration: "300s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDirection: "reverse" }} />
        {/* Orange — top right */}
        <div className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle at 60% 40%, #F07B1Fbb, #F07B1F44 45%, transparent 70%)", animationName: "drift-b", animationDuration: "260s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-40s" }} />
        {/* Green — center */}
        <div className="absolute top-1/2 left-1/4 h-[550px] w-[550px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle at 50% 50%, #2D9E2Aaa, #2D9E2A33 45%, transparent 70%)", animationName: "drift-c", animationDuration: "290s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-90s" }} />
        {/* Yellow — center top */}
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle at 50% 40%, #F5C400aa, #F5C40033 45%, transparent 70%)", animationName: "drift-a", animationDuration: "220s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-130s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Remove%20background%20fr-AT1vFZKy7exyjmPCvKO3QfUfGKzUub.png"
            alt="SoloSuccess Solutions diamond logo"
            width={180}
            height={180}
            className="object-contain"
            priority
          />
        </div>

        {/* Tagline badge — Caveat font */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 glass-card"
          style={{ borderColor: "#F5C40055" }}
        >
          <Sparkles size={13} style={{ color: "#F5C400" }} aria-hidden="true" />
          <span className="font-display text-base font-semibold" style={{ color: "#F5C400" }}>
            Parent Company &amp; Holding Group
          </span>
          <Sparkles size={13} style={{ color: "#F5C400" }} aria-hidden="true" />
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-balance leading-none">
          {heroLetters.map((l, i) => (
            <span key={i} style={{ color: l.color }}>{l.char}</span>
          ))}
          <br />
          <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold" style={{ color: "#9CA3AF" }}>
            Solutions
          </span>
        </h1>

        {/* Sub-headline — rainbow gradient */}
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-balance" style={{ color: "#c4c8d4" }}>
          A family of{" "}
          <span className="font-bold rainbow-text">five purpose-built companies</span>
          {" "}for the modern solo entrepreneur — AI tools, education, content, community, and copywriting, all under one roof.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#companies"
            className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-500 hover:opacity-90 rainbow-border"
            style={{ background: "linear-gradient(135deg, #D93025, #F07B1F, #F5C400, #2D9E2A, #009B94, #005FA3, #6B44A0)" }}
          >
            Explore Our Companies
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold glass-card transition-all duration-500 hover:border-white/20"
            style={{ color: "#9CA3AF" }}
          >
            Meet the Founder
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40" aria-hidden="true">
        <div className="h-8 w-px rounded-full" style={{ background: "linear-gradient(to bottom, #6B44A0, transparent)" }} />
        <span className="font-display text-xs" style={{ color: "#9CA3AF" }}>scroll</span>
      </div>
    </section>
  )
}
