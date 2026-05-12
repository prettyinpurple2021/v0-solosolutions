import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function SoloScoutPage() {
  const brand = getBrandBySlug("soloscout")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloScout — AI-Driven Market Intelligence for Solo Founders",
  description:
    "Stop building in the dark. SoloScout autonomously scans high-intent communities, scores real pain points, and surfaces validated business opportunities so you build what the market actually wants.",
}
