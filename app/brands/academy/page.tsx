import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function SoloSuccessAcademyPage() {
  const brand = getBrandBySlug("academy")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloSuccess Academy — Education Built for the Solo Journey",
  description: "Practical courses, coaching programs, and learning resources for solo entrepreneurs. No fluff — just real skills.",
}
