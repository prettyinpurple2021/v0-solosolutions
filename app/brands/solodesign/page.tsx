import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function SoloDesignPage() {
  const brand = getBrandBySlug("solodesign")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloDesign — Visual Excellence for Solo Entrepreneurs",
  description: "Premium brand, web, and creative design services. Logos, websites, and marketing materials that make you stand out.",
}
