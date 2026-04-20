import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PDFDownloadButton } from "@/components/pdf-download-button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service — SoloSuccess Solutions",
  description: "Read the terms and conditions governing your use of SoloSuccess Solutions services and all associated brands.",
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
            style={{ color: "#F07B1F" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 rainbow-text font-display">
              Terms of Service
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "#D9302533", color: "#D93025" }}>
                Legally Binding
              </span>
              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "#F07B1F33", color: "#F07B1F" }}>
                Fair Terms
              </span>
              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "#6B44A033", color: "#6B44A0" }}>
                User-Friendly
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div>
                <p className="text-muted-foreground">
                  Last updated: <time dateTime="2026-04-20">{/* USER_INPUT: UPDATE_DATE */}[UPDATE WITH CURRENT DATE]</time>
                </p>
              </div>
              <PDFDownloadButton filename="solosuccess-terms-of-service.pdf" documentTitle="Terms of Service" />
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Agreement */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#D93025" }}>1. Agreement to Terms</h2>
              <p className="text-body leading-relaxed mb-4">
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and SoloSuccess Solutions (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) governing your access to and use of the websites, applications, and services operated by SoloSuccess Solutions and its family of brands, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body mb-4">
                <li>SoloSuccess AI</li>
                <li>SoloSuccess Academy</li>
                <li>Content Factory</li>
                <li>SoloSuccess Connect</li>
                <li>SoloScribe</li>
                <li>SoloDesign</li>
              </ul>
              <p className="text-body leading-relaxed">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F07B1F" }}>2. Eligibility</h2>
              <p className="text-body leading-relaxed">
                You must be at least {/* USER_INPUT: MINIMUM_AGE */}18 years of age to use our Services. By using our Services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms. If you are using the Services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F5C400" }}>3. Account Registration</h2>
              <p className="text-body leading-relaxed mb-4">
                Some of our Services may require you to create an account. When you register, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="text-body leading-relaxed mt-4">
                We reserve the right to suspend or terminate your account if any information provided is inaccurate, false, or no longer current.
              </p>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#2D9E2A" }}>4. Description of Services</h2>
              <p className="text-body leading-relaxed mb-4">
                SoloSuccess Solutions provides a suite of services designed for solo entrepreneurs, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li><strong>SoloSuccess AI:</strong> AI-powered productivity tools and automation</li>
                <li><strong>SoloSuccess Academy:</strong> Educational courses, coaching, and resources</li>
                <li><strong>Content Factory:</strong> Content creation and production services</li>
                <li><strong>SoloSuccess Connect:</strong> Community and networking platform</li>
                <li><strong>SoloScribe:</strong> Copywriting and content writing services</li>
                <li><strong>SoloDesign:</strong> Brand and design services</li>
              </ul>
              <p className="text-body leading-relaxed mt-4">
                We reserve the right to modify, suspend, or discontinue any Service at any time with or without notice.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#009B94" }}>5. Payment Terms</h2>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">5.1 Pricing</h3>
              <p className="text-body leading-relaxed mb-4">
                Prices for our Services are listed on our websites and are subject to change. We will provide notice of price changes before they take effect for existing subscriptions.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">5.2 Payment Processing</h3>
              <p className="text-body leading-relaxed mb-4">
                Payments are processed through secure third-party payment processors. By providing payment information, you represent that you are authorized to use the payment method. {/* USER_INPUT: PAYMENT_PROCESSOR */}
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">5.3 Subscriptions and Renewals</h3>
              <p className="text-body leading-relaxed mb-4">
                Subscription services automatically renew at the end of each billing period unless cancelled. You may cancel your subscription at any time through your account settings or by contacting us.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">5.4 Refunds</h3>
              <p className="text-body leading-relaxed">
                {/* USER_INPUT: REFUND_POLICY */}Refund policies vary by service. Please refer to the specific service terms or contact us for refund requests. Generally, digital products and services may have limited or no refunds once accessed or delivered.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#005FA3" }}>6. Intellectual Property</h2>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">6.1 Our Content</h3>
              <p className="text-body leading-relaxed mb-4">
                All content, features, and functionality of our Services—including but not limited to text, graphics, logos, icons, images, audio, video, software, and code—are owned by SoloSuccess Solutions or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">6.2 Your Content</h3>
              <p className="text-body leading-relaxed mb-4">
                You retain ownership of content you submit to our Services. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display your content in connection with providing our Services.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">6.3 Deliverables</h3>
              <p className="text-body leading-relaxed">
                {/* USER_INPUT: IP_OWNERSHIP */}For paid services (e.g., design work, copywriting), ownership of deliverables transfers to you upon full payment, unless otherwise specified in a separate agreement.
              </p>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#6B44A0" }}>7. Acceptable Use Policy</h2>
              <p className="text-body leading-relaxed mb-4">
                You agree not to use our Services to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Transmit harmful, fraudulent, or deceptive content</li>
                <li>Upload viruses, malware, or other malicious code</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Attempt to gain unauthorized access to any systems</li>
                <li>Collect user information without consent</li>
                <li>Use automated systems (bots, scrapers) without permission</li>
                <li>Impersonate any person or entity</li>
                <li>Engage in harassment, spam, or abusive behavior</li>
                <li>Resell or redistribute our Services without authorization</li>
              </ul>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#D93025" }}>8. Disclaimers</h2>
              <p className="text-body leading-relaxed mb-4 uppercase text-sm">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-body leading-relaxed mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>The Services will be uninterrupted, secure, or error-free</li>
                <li>Results from using the Services will be accurate or reliable</li>
                <li>Any defects or errors will be corrected</li>
                <li>The Services will meet your specific requirements</li>
              </ul>
              <p className="text-body leading-relaxed mt-4">
                Educational content and business advice provided through our Services are for informational purposes only and do not constitute professional, legal, financial, or tax advice.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F07B1F" }}>9. Limitation of Liability</h2>
              <p className="text-body leading-relaxed mb-4 uppercase text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SOLOSUCCESS SOLUTIONS AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
              </p>
              <p className="text-body leading-relaxed">
                {/* USER_INPUT: LIABILITY_CAP */}Our total liability for any claims arising from these Terms or your use of the Services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F5C400" }}>10. Indemnification</h2>
              <p className="text-body leading-relaxed">
                You agree to indemnify, defend, and hold harmless SoloSuccess Solutions and its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys&apos; fees) arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#2D9E2A" }}>11. Termination</h2>
              <p className="text-body leading-relaxed mb-4">
                We may suspend or terminate your access to the Services at any time, with or without cause, with or without notice. You may terminate your account at any time by contacting us.
              </p>
              <p className="text-body leading-relaxed">
                Upon termination, your right to use the Services will immediately cease. Sections of these Terms that by their nature should survive termination will remain in effect.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#009B94" }}>12. Governing Law and Disputes</h2>
              <p className="text-body leading-relaxed mb-4">
                {/* USER_INPUT: GOVERNING_LAW */}These Terms shall be governed by and construed in accordance with the laws of [YOUR STATE/COUNTRY], without regard to its conflict of law provisions.
              </p>
              <p className="text-body leading-relaxed">
                {/* USER_INPUT: DISPUTE_RESOLUTION */}Any disputes arising from these Terms or your use of the Services shall be resolved through [binding arbitration / the courts of YOUR JURISDICTION]. You agree to waive any right to a jury trial or to participate in a class action.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#005FA3" }}>13. Modifications to Terms</h2>
              <p className="text-body leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the &quot;Last updated&quot; date. Your continued use of the Services after changes become effective constitutes your acceptance of the revised Terms.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#6B44A0" }}>14. Severability</h2>
              <p className="text-body leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#D93025" }}>15. Entire Agreement</h2>
              <p className="text-body leading-relaxed">
                These Terms, together with our Privacy Policy and any service-specific terms, constitute the entire agreement between you and SoloSuccess Solutions regarding your use of the Services and supersede all prior agreements and understandings.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F07B1F" }}>16. Contact Information</h2>
              <p className="text-body leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="glass-card rounded-xl p-6 space-y-2">
                <p className="text-foreground font-semibold">SoloSuccess Solutions</p>
                {/* USER_INPUT: COMPANY_ADDRESS */}
                <p className="text-body">[YOUR BUSINESS ADDRESS]</p>
                {/* USER_INPUT: CONTACT_EMAIL */}
                <p className="text-body">Email: <span style={{ color: "#F07B1F" }}>[YOUR EMAIL ADDRESS]</span></p>
                {/* USER_INPUT: CONTACT_PHONE */}
                <p className="text-body">Phone: <span style={{ color: "#F07B1F" }}>[YOUR PHONE NUMBER]</span></p>
              </div>
            </section>
          </div>

          {/* Version History */}
          <aside className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-lg font-bold mb-6 text-foreground">Terms Version History</h2>
            <div className="space-y-4">
              {[
                { date: "April 20, 2026", version: "1.0", changes: "Initial publication on launch" },
              ].map((entry, idx) => (
                <div key={idx} className="glass-card rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{entry.date}</p>
                      <p className="text-xs text-muted-foreground">Version {entry.version}</p>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded" style={{ background: "#005FA333", color: "#005FA3" }}>
                      Current
                    </span>
                  </div>
                  <p className="text-sm text-body mt-2">{entry.changes}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-body-dim mt-6">
              All historical versions are archived and available upon request. We will notify you of material changes to these terms.
            </p>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  )
}
