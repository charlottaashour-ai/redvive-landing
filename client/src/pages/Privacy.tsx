// Privacy Policy page — Redvive
// Design: dark warm background (#0A0303), rose-white text, DM Sans body, Lora accent
// Minimal, editorial layout — matches the restrained Finnish aesthetic of the rest of the site

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div style={{ backgroundColor: "#0A0303", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero label */}
      <div className="pt-32 pb-16 px-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: "rgba(255,249,249,0.4)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Legal
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#FFF9F9", letterSpacing: "-0.03em" }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-sm"
            style={{ color: "rgba(255,249,249,0.35)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Last updated: April 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto space-y-12">

          {/* Section */}
          <Section title="Who we are">
            <p>
              Redvive is a private red light therapy studio opening in Helsinki, Finland in Fall 2026.
              For the purposes of this policy, "Redvive", "we", "us" and "our" refers to the data
              controller responsible for your personal data.
            </p>
            <p className="mt-3">
              <strong>Data controller contact:</strong>{" "}
              <a
                href="mailto:hello@redvivewell.com"
                style={{ color: "#D53E0F" }}
                className="hover:opacity-80 transition-opacity"
              >
                hello@redvivewell.com
              </a>
            </p>
          </Section>

          <Divider />

          <Section title="What data we collect and why">
            <p>When you join our waitlist, we collect:</p>
            <ul className="mt-3 space-y-2 list-none">
              <ListItem>
                <strong>Email address</strong> — to send you launch updates, founding member
                information and early access details.
              </ListItem>
              <ListItem>
                <strong>Stated interest</strong> (optional) — the reason you selected for joining
                (e.g. Skin &amp; Glow, Recovery &amp; Performance) — used only to personalise the
                communications we send you.
              </ListItem>
            </ul>
            <p className="mt-4">
              We do not collect any other personal data. We do not use tracking pixels, advertising
              cookies, or behavioural analytics tools.
            </p>
          </Section>

          <Divider />

          <Section title="Lawful basis for processing">
            <p>
              We process your personal data on the basis of your{" "}
              <strong>freely given, specific and informed consent</strong> (Article 6(1)(a) of the
              GDPR). You provide this consent by ticking the checkbox on our waitlist form.
            </p>
            <p className="mt-3">
              You may withdraw your consent at any time by emailing{" "}
              <a
                href="mailto:hello@redvivewell.com"
                style={{ color: "#D53E0F" }}
                className="hover:opacity-80 transition-opacity"
              >
                hello@redvivewell.com
              </a>
              . Withdrawal does not affect the lawfulness of any processing carried out before you
              withdrew consent.
            </p>
          </Section>

          <Divider />

          <Section title="How long we keep your data">
            <p>We retain your data until one of the following occurs:</p>
            <ul className="mt-3 space-y-2 list-none">
              <ListItem>You withdraw your consent and request deletion.</ListItem>
              <ListItem>
                Redvive opens and the waitlist period ends — at which point we will contact you with
                options to continue receiving communications or to be removed.
              </ListItem>
              <ListItem>
                In any case, no longer than 24 months from the date you joined the waitlist.
              </ListItem>
            </ul>
          </Section>

          <Divider />

          <Section title="Who we share your data with">
            <p>
              We do not sell or share your personal data with third parties for marketing purposes.
            </p>
            <p className="mt-3">
              If we use an email service provider (such as Brevo or Mailchimp) to send waitlist
              communications, your email address will be stored on their servers. Any such provider
              is bound by a data processing agreement and GDPR-compliant terms. We will update this
              policy if and when such a provider is engaged.
            </p>
          </Section>

          <Divider />

          <Section title="Cookies and tracking">
            <p>
              This website does not use advertising or tracking cookies. We load fonts from Google
              Fonts CDN, which may result in a connection to Google's servers. No personal data is
              transmitted in this process beyond standard server log data (IP address, browser type)
              which Google may retain per their own privacy policy.
            </p>
            <p className="mt-3">
              We do not use Google Analytics or any other analytics platform at this time.
            </p>
          </Section>

          <Divider />

          <Section title="Your rights under GDPR">
            <p className="mb-5">
              As a data subject in the EU/EEA, you have the following rights:
            </p>
            <div className="space-y-3">
              {[
                { right: "Access", desc: "Request a copy of the personal data we hold about you." },
                { right: "Rectification", desc: "Ask us to correct inaccurate data." },
                { right: "Erasure", desc: "Ask us to delete your data (\"right to be forgotten\")." },
                { right: "Restriction", desc: "Ask us to limit how we use your data." },
                { right: "Portability", desc: "Receive your data in a structured, machine-readable format." },
                { right: "Objection", desc: "Object to processing based on legitimate interests." },
                { right: "Withdraw consent", desc: "Withdraw consent at any time without penalty." },
              ].map(({ right, desc }) => (
                <div
                  key={right}
                  className="flex gap-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span
                    className="text-xs font-semibold tracking-wide uppercase flex-shrink-0 w-36"
                    style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif", paddingTop: "1px" }}
                  >
                    {right}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,249,249,0.6)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {desc}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:hello@redvivewell.com"
                style={{ color: "#D53E0F" }}
                className="hover:opacity-80 transition-opacity"
              >
                hello@redvivewell.com
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Divider />

          <Section title="Right to lodge a complaint">
            <p>
              If you believe we have not handled your data in accordance with GDPR, you have the
              right to lodge a complaint with the Finnish Data Protection Ombudsman:
            </p>
            <div
              className="mt-4 p-5"
              style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,249,249,0.02)" }}
            >
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: "#FFF9F9", fontFamily: "'DM Sans', sans-serif" }}
              >
                Tietosuojavaltuutetun toimisto
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Office of the Data Protection Ombudsman<br />
                PO Box 800, FI-00531 Helsinki<br />
                <a
                  href="mailto:tietosuoja@om.fi"
                  style={{ color: "#D53E0F" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  tietosuoja@om.fi
                </a>
                {" · "}
                <a
                  href="https://www.tietosuoja.fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#D53E0F" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  www.tietosuoja.fi
                </a>
              </p>
            </div>
          </Section>

          <Divider />

          <Section title="Changes to this policy">
            <p>
              We may update this policy as our services develop. Any material changes will be
              communicated to waitlist members by email. The "last updated" date at the top of this
              page will always reflect the most recent version.
            </p>
          </Section>

          {/* Back link */}
          <div className="pt-8">
            <Link href="/">
              <span
                className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity"
                style={{ color: "rgba(255,249,249,0.35)", fontFamily: "'DM Sans', sans-serif" }}
              >
                ← Back to home
              </span>
            </Link>
          </div>

        </div>
      </div>

      <div style={{ height: "2px", backgroundColor: "#1A1008" }} />
      <Footer />
    </div>
  );
}

/* ── Sub-components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="text-lg font-bold mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "#FFF9F9", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <div
        className="text-sm leading-relaxed"
        style={{ color: "rgba(255,249,249,0.55)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span style={{ color: "#D53E0F", marginTop: "2px", flexShrink: 0 }}>—</span>
      <span>{children}</span>
    </li>
  );
}
