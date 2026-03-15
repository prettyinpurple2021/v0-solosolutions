import { getBrandBySlug } from "@/lib/brands"
import { BrandPageLayout } from "@/components/brand-page-layout"
import { notFound } from "next/navigation"

export default function SoloSuccessConnectPage() {
  const brand = getBrandBySlug("connect")
  if (!brand) notFound()
  return <BrandPageLayout brand={brand} />
}

export const metadata = {
  title: "SoloSuccess Connect — Community & Networking for Solo Builders",
  description: "A curated network of like-minded entrepreneurs, collaborators, and mentors for solo business owners.",
}
