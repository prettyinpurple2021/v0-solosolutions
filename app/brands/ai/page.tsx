import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function SoloSuccessAIPage() {
  const brand = getBrandBySlug("ai")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloSuccess AI — AI-Powered Productivity for Entrepreneurs",
  description: "Cutting-edge AI tools designed for solo founders. Automate workflows, generate content, and make smarter decisions.",
}
