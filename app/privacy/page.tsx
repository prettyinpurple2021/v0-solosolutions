import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PDFDownloadButton } from "@/components/pdf-download-button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy — SoloSuccess Solutions",
  description: "Learn how SoloSuccess Solutions collects, uses, and protects your personal information across all our brands and services.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
            style={{ color: "#009B94" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 rainbow-text font-display">
              Privacy Policy
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "#009B9433", color: "#009B94" }}>
                GDPR Compliant
              </span>
              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "#005FA333", color: "#005FA3" }}>
                CCPA Compliant
              </span>
              <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded" style={{ background: "#2D9E2A33", color: "#2D9E2A" }}>
                Privacy First
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div>
                <p className="text-muted-foreground">
                  Last updated: <time dateTime="2026-04-20">{/* USER_INPUT: UPDATE_DATE */}[UPDATE WITH CURRENT DATE]</time>
                </p>
              </div>
              <PDFDownloadButton filename="solosuccess-privacy-policy.pdf" documentTitle="Privacy Policy" />
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#D93025" }}>1. Introduction</h2>
              <p className="text-body leading-relaxed mb-4">
                SoloSuccess Solutions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates a family of brands including SoloSuccess AI, SoloSuccess Academy, Content Factory, SoloSuccess Connect, SoloScribe, and SoloDesign (collectively, the &quot;Services&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our websites or use our services.
              </p>
              <p className="text-body leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F07B1F" }}>2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">2.1 Personal Information You Provide</h3>
              <p className="text-body leading-relaxed mb-4">We may collect personal information that you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 space-y-2 text-body mb-6">
                <li>Register for an account or subscribe to our services</li>
                <li>Sign up for our newsletter or email communications</li>
                <li>Fill out a contact form or request information</li>
                <li>Purchase products or services</li>
                <li>Participate in surveys, promotions, or contests</li>
                <li>Post comments or engage with our community features</li>
              </ul>
              <p className="text-body leading-relaxed mb-4">
                This information may include: {/* USER_INPUT: PERSONAL_DATA_TYPES */}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body mb-6">
                <li>Name (first and last)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and shipping address</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Business name and information</li>
                <li>Social media handles</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 text-foreground">2.2 Information Automatically Collected</h3>
              <p className="text-body leading-relaxed mb-4">
                When you access our Services, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li><strong>Device Information:</strong> Browser type, operating system, device type, and unique device identifiers</li>
                <li><strong>Log Data:</strong> IP address, access times, pages viewed, and referring URLs</li>
                <li><strong>Usage Data:</strong> How you interact with our Services, features used, and time spent</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                <li><strong>Cookies and Similar Technologies:</strong> See Section 6 for details</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F5C400" }}>3. How We Use Your Information</h2>
              <p className="text-body leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Provide, operate, and maintain our Services</li>
                <li>Process transactions and send related information</li>
                <li>Send you newsletters, marketing communications, and updates (with your consent)</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Analyze usage patterns to improve our Services</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Personalize your experience and deliver targeted content</li>
                <li>Facilitate account creation and authentication</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#2D9E2A" }}>4. How We Share Your Information</h2>
              <p className="text-body leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-body">
                <li>
                  <strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, email delivery, hosting, analytics) {/* USER_INPUT: SERVICE_PROVIDERS */}
                </li>
                <li>
                  <strong>Between Our Brands:</strong> Information may be shared among SoloSuccess Solutions brands to provide integrated services and improve your experience
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights, safety, or property
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you have given us explicit permission
                </li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#009B94" }}>5. Data Retention</h2>
              <p className="text-body leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it. {/* USER_INPUT: RETENTION_PERIOD */}
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#005FA3" }}>6. Cookies and Tracking Technologies</h2>
              <p className="text-body leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect and track information about your activity on our Services. These technologies help us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body mb-4">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our Services</li>
                <li>Provide personalized content and advertisements</li>
                <li>Analyze traffic and usage patterns</li>
              </ul>
              <p className="text-body leading-relaxed">
                You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our Services.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#6B44A0" }}>7. Your Privacy Rights</h2>
              <p className="text-body leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body mb-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications — manage preferences <Link href="/email-preferences" className="underline hover:text-foreground transition-colors">here</Link></li>
                <li><strong>Restriction:</strong> Request that we limit how we use your information</li>
              </ul>
              <p className="text-body leading-relaxed">
                To exercise these rights, please contact us at {/* USER_INPUT: PRIVACY_EMAIL */}<span className="font-semibold" style={{ color: "#009B94" }}>[YOUR PRIVACY EMAIL]</span>.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#D93025" }}>8. Security</h2>
              <p className="text-body leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F07B1F" }}>9. Third-Party Links</h2>
              <p className="text-body leading-relaxed">
                Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F5C400" }}>10. Children&apos;s Privacy</h2>
              <p className="text-body leading-relaxed">
                Our Services are not intended for individuals under the age of {/* USER_INPUT: MINIMUM_AGE */}18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#2D9E2A" }}>11. International Data Transfers</h2>
              <p className="text-body leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Services, you consent to the transfer of your information to {/* USER_INPUT: DATA_LOCATION */}the United States and other countries where we operate.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#009B94" }}>12. Changes to This Policy</h2>
              <p className="text-body leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our Services after such changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#005FA3" }}>13. Contact Us</h2>
              <p className="text-body leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="glass-card rounded-xl p-6 space-y-2">
                <p className="text-foreground font-semibold">SoloSuccess Solutions</p>
                {/* USER_INPUT: COMPANY_ADDRESS */}
                <p className="text-body">[YOUR BUSINESS ADDRESS]</p>
                {/* USER_INPUT: CONTACT_EMAIL */}
                <p className="text-body">Email: <span style={{ color: "#009B94" }}>[YOUR EMAIL ADDRESS]</span></p>
                {/* USER_INPUT: CONTACT_PHONE */}
                <p className="text-body">Phone: <span style={{ color: "#009B94" }}>[YOUR PHONE NUMBER]</span></p>
              </div>
            </section>
          </div>

          {/* Version History */}
          <aside className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-lg font-bold mb-6 text-foreground">Policy Version History</h2>
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
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded" style={{ background: "#2D9E2A33", color: "#2D9E2A" }}>
                      Current
                    </span>
                  </div>
                  <p className="text-sm text-body mt-2">{entry.changes}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-body-dim mt-6">
              All historical versions are archived and available upon request. Significant changes will be highlighted in the changelog.
            </p>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  )
}
