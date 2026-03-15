import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function SoloScribePage() {
  const brand = getBrandBySlug("soloscribe")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloScribe — Writing & Copywriting for Your Brand",
  description: "Professional copywriting for solo entrepreneurs. Sales pages, email sequences, and brand voice — written to convert.",
}
