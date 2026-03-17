import { Brain, BookOpen, Film, Users, PenLine } from "lucide-react"

export type Brand = {
  slug: string
  name: string
  wordmark: string
  tagline: string
  description: string
  color: string
  secondaryColor: string
  icon: typeof Brain
  logoUrl?: string
  features: { title: string; description: string }[]
  benefits: { stat: string; label: string }[]
  ctaLabel: string
}

export const brands: Brand[] = [
  {
    slug: "ai",
    name: "SoloSuccess AI",
    wordmark: "SoloSuccess AI",
    tagline: "AI-Powered Productivity for Entrepreneurs",
    description:
      "Cutting-edge artificial intelligence tools designed specifically for solo founders and small teams. Automate workflows, generate content, analyze data, and make smarter business decisions — all without a full team behind you.",
    color: "#005FA3",
    secondaryColor: "#0077BB",
    icon: Brain,
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SoloSuccess%20AI%20logo%20-Fi9qyIMr0bi6OKjKgmPGMosUGRLknO.png",
    features: [
      { title: "Workflow Automation", description: "Eliminate repetitive tasks with smart automations built for solo operators." },
      { title: "AI Content Generation", description: "Generate blogs, emails, social posts, and ad copy in seconds with your brand voice." },
      { title: "Business Analytics", description: "Understand your data with plain-language AI-powered reports and insights." },
      { title: "Smart Scheduling", description: "Let AI manage your calendar, prioritize tasks, and protect your deep work time." },
      { title: "Research Assistant", description: "Competitive research, market analysis, and trend reports — on demand." },
      { title: "Custom AI Agents", description: "Build personal AI agents trained on your business processes and knowledge base." },
    ],
    benefits: [
      { stat: "10x", label: "Faster Content" },
      { stat: "80%", label: "Less Admin Work" },
      { stat: "24/7", label: "AI Availability" },
    ],
    ctaLabel: "Get Early Access",
  },
  {
    slug: "academy",
    name: "SoloSuccess Academy",
    wordmark: "SoloSuccess Academy",
    tagline: "Education Built for the Solo Journey",
    description:
      "Practical courses, coaching programs, and learning resources that teach real skills for building and scaling a solo business. No fluff — just actionable frameworks from founders who have done it.",
    color: "#2D9E2A",
    secondaryColor: "#38B835",
    icon: BookOpen,
    features: [
      { title: "On-Demand Courses", description: "Self-paced video courses covering every stage of the solo business journey." },
      { title: "Live Coaching", description: "Weekly group coaching calls with experienced solo business mentors." },
      { title: "Frameworks & Templates", description: "Proven playbooks and fill-in-the-blank templates you can deploy immediately." },
      { title: "Skill Tracks", description: "Curated learning paths for content creation, sales, operations, and mindset." },
      { title: "Certification Programs", description: "Earn credentials that validate your skills and build your professional authority." },
      { title: "Private Community", description: "Connect with fellow students, share wins, and get feedback inside a members-only space." },
    ],
    benefits: [
      { stat: "200+", label: "Video Lessons" },
      { stat: "50+", label: "Templates" },
      { stat: "1-on-1", label: "Coaching Available" },
    ],
    ctaLabel: "Enroll Now",
  },
  {
    slug: "content-factory",
    name: "SoloSuccess Content Factory",
    wordmark: "Content Factory",
    tagline: "Content Strategy & Creation at Scale",
    description:
      "Done-for-you and done-with-you content solutions that help entrepreneurs show up consistently across platforms. From short-form video to long-form articles, we turn your expertise into content that converts.",
    color: "#F07B1F",
    secondaryColor: "#F5A623",
    icon: Film,
    features: [
      { title: "Content Strategy", description: "A custom 90-day content roadmap built around your brand, audience, and goals." },
      { title: "Short-Form Video", description: "Reels, TikToks, and Shorts scripted, produced, and optimized for each platform." },
      { title: "Long-Form Articles", description: "SEO-optimized blog posts and thought leadership pieces that build authority." },
      { title: "Email Newsletters", description: "Weekly newsletter production from topic ideation to final send-ready copy." },
      { title: "Content Repurposing", description: "Turn one piece of content into 10 formats across every platform you use." },
      { title: "Brand Voice Development", description: "Define and document your unique tone, style, and messaging guidelines." },
    ],
    benefits: [
      { stat: "30+", label: "Pieces Per Month" },
      { stat: "7", label: "Platforms Covered" },
      { stat: "3x", label: "Avg. Engagement Lift" },
    ],
    ctaLabel: "Start Creating",
  },
  {
    slug: "connect",
    name: "SoloSuccess Connect",
    wordmark: "SoloSuccess Connect",
    tagline: "Community & Networking for Solo Builders",
    description:
      "A curated network of like-minded entrepreneurs, collaborators, and mentors. Find accountability partners, referral partners, and real relationships that accelerate your growth.",
    color: "#D93025",
    secondaryColor: "#E84C3D",
    icon: Users,
    features: [
      { title: "Accountability Groups", description: "Small pods of 4–6 entrepreneurs who meet weekly to set goals and report progress." },
      { title: "Referral Network", description: "A trusted marketplace to send and receive client referrals within the community." },
      { title: "Mastermind Rooms", description: "Industry-specific virtual rooms where experts share strategies and solve problems together." },
      { title: "Member Directory", description: "Search and filter a vetted directory of entrepreneurs by niche, skills, and services." },
      { title: "Live Events", description: "Virtual and in-person networking events, workshops, and community meetups." },
      { title: "Mentorship Matching", description: "Get matched with a mentor or become one — structured guidance for every stage." },
    ],
    benefits: [
      { stat: "500+", label: "Active Members" },
      { stat: "Weekly", label: "Live Events" },
      { stat: "100%", label: "Vetted Network" },
    ],
    ctaLabel: "Join the Community",
  },
  {
    slug: "soloscribe",
    name: "SoloScribe",
    wordmark: "SoloScribe",
    tagline: "Writing & Copywriting for Your Brand",
    description:
      "Professional writing services and tools for solo entrepreneurs who need compelling copy. Sales pages, email sequences, social content, and brand voice development — written to convert.",
    color: "#6B44A0",
    secondaryColor: "#8B5FC0",
    icon: PenLine,
    features: [
      { title: "Sales Page Copywriting", description: "High-converting sales pages written to turn visitors into paying customers." },
      { title: "Email Sequences", description: "Welcome series, nurture flows, and launch sequences that build trust and drive revenue." },
      { title: "Social Media Copy", description: "Platform-native captions and hooks crafted to stop the scroll and spark engagement." },
      { title: "Website Copy", description: "Homepage, about page, and service page copy that clearly communicates your value." },
      { title: "Brand Messaging Guide", description: "A complete document defining your positioning, voice, and core messaging pillars." },
      { title: "Ad Copywriting", description: "Paid ad creative for Meta, Google, and LinkedIn — tested headline and body variations." },
    ],
    benefits: [
      { stat: "48hr", label: "Turnaround" },
      { stat: "2x", label: "Avg. Conversion Lift" },
      { stat: "100%", label: "Brand-Voice Matched" },
    ],
    ctaLabel: "Get Your Copy Written",
  },
]

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}
