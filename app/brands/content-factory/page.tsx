import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function ContentFactoryPage() {
  const brand = getBrandBySlug("content-factory")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloSuccess Content Factory — Content Strategy & Creation at Scale",
  description: "Done-for-you and done-with-you content solutions. We turn your expertise into content that converts.",
}
