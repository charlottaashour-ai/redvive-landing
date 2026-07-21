// Privacy Policy — Redvive (/privacy)
// Design: warm cream #FAF6F4 background, charcoal #1A0A08 text
// Max-width 720px centred, Outfit body, generous spacing
// Quiet, neutral, trustworthy — not the red gradient

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

/* ── Shared sub-components ── */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-bold mt-12 mb-4"
      style={{ fontFamily: "'Outfit', sans-serif", color: "#1A0A08", letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-base font-semibold mt-6 mb-2"
      style={{ fontFamily: "'Outfit', sans-serif", color: "#1A0A08" }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base leading-relaxed mb-3"
      style={{ fontFamily: "'Outfit', sans-serif", color: "#3D1A14", lineHeight: 1.7 }}
    >
      {children}
    </p>
  );
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-4" style={{ paddingLeft: "1.25rem" }}>
      {items.map((item, i) => (
        <li
          key={i}
          className="text-base"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "#3D1A14",
            lineHeight: 1.7,
            marginBottom: "8px",
            listStyleType: "disc",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        backgroundColor: "#EDE8E5",
        color: "#1A0A08",
        borderRadius: "3px",
        padding: "1px 5px",
        fontFamily: "monospace",
        fontSize: "0.9em",
      }}
    >
      {children}
    </code>
  );
}

function MailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      style={{ color: "#D53E0F" }}
      className="hover:opacity-75 transition-opacity"
    >
      {email}
    </a>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#D53E0F" }}
      className="hover:opacity-75 transition-opacity"
    >
      {label}
    </a>
  );
}

function HR() {
  return <hr style={{ border: "none", borderTop: "1px solid #E5DDD5", margin: "2rem 0" }} />;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.875rem",
          color: "#3D1A14",
        }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  fontWeight: 600,
                  backgroundColor: "#EDE8E5",
                  border: "1px solid #E5DDD5",
                  color: "#1A0A08",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FAF6F4" : "#F5EDEB" }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "10px 14px",
                    border: "1px solid #E5DDD5",
                    lineHeight: 1.6,
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ── */

export default function Privacy() {
  return (
    <div style={{ backgroundColor: "#FAF6F4", minHeight: "100vh" }}>
      <Navbar />

      <div className="px-6 pt-40 pb-24">
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* Header */}
          <p
            className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#D53E0F", fontFamily: "'Outfit', sans-serif" }}
          >
            Legal
          </p>
          <h1
            className="font-bold mb-2"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "#1A0A08",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "#7A4A42", fontFamily: "'Outfit', sans-serif" }}
          >
            Last updated: 27 May 2026
          </p>

          <P>
            Redvive Oy ("Redvive", "we", "us") is committed to protecting your privacy and complying
            with the EU General Data Protection Regulation (GDPR) and the Finnish Data Protection Act
            (1050/2018).
          </P>
          <P>
            This policy explains what personal data we collect, why, how we use it, who we share it
            with, and what your rights are.
          </P>
          <P>
            If you have any questions, contact us at <MailLink email="privacy@redvivestudios.com" />.
          </P>

          <HR />

          {/* 1 */}
          <H2>1. Data controller</H2>
          <P>
            Redvive Oy<br />
            Business ID (Y-tunnus): 3573167-1<br />
            Registered address: Katajanokanlaituri 2B, 00160 Helsinki, Finland
          </P>
          <P>
            Email: <MailLink email="privacy@redvivestudios.com" />
          </P>

          <HR />

          {/* 2 */}
          <H2>2. Personal data we collect</H2>

          <H3>2.1 Waitlist signups</H3>
          <P>When you join our pre-launch waitlist, we collect:</P>
          <UL items={[
            "Email address",
            "First name (optional)",
            "Language preference (optional)",
            "Timestamp of signup",
            "IP address (for fraud prevention)",
            "Marketing consent status",
          ]} />

          <H3>2.2 Website usage</H3>
          <P>
            When you visit <Code>redvivestudios.com</Code>, we may collect (subject to your consent):
          </P>
          <UL items={[
            "Device type, browser, operating system",
            "Pages visited, time on site, navigation paths",
            "Referrer URL",
            "Approximate location (country/city level)",
            "Cookie identifiers",
          ]} />

          <H3>2.3 Communications</H3>
          <P>
            If you email us or contact us via the website, we retain the contents of those
            communications.
          </P>
          <P>
            We do <strong>not</strong> collect health, biometric, or special-category data on this
            website.
          </P>

          <HR />

          {/* 3 */}
          <H2>3. Legal basis for processing</H2>
          <P>
            We process your personal data on the following legal bases under GDPR Article 6:
          </P>
          <Table
            headers={["Purpose", "Legal basis"]}
            rows={[
              ["Sending waitlist + welcome emails", "Your explicit consent (Article 6(1)(a))"],
              ["Marketing emails after waitlist", "Your explicit consent (Article 6(1)(a))"],
              ["Website analytics + advertising pixels", "Your consent via cookie banner (Article 6(1)(a))"],
              ["Responding to inquiries", "Legitimate interest in customer service (Article 6(1)(f))"],
              ["Fraud prevention + security", "Legitimate interest (Article 6(1)(f))"],
              ["Compliance with legal obligations", "Legal obligation (Article 6(1)(c))"],
            ]}
          />
          <P>
            You can withdraw consent at any time. Withdrawing consent does not affect the lawfulness
            of processing before the withdrawal.
          </P>

          <HR />

          {/* 4 */}
          <H2>4. How we use your data</H2>
          <P>We use your personal data to:</P>
          <UL items={[
            "Confirm your spot on the waitlist",
            "Send you the 5-email welcome series before launch",
            "Inform you when our studios open and when booking opens",
            "Send occasional brand updates (you can unsubscribe at any time)",
            "Improve our website performance and user experience",
            "Comply with legal obligations",
          ]} />
          <P>We do <strong>not</strong>:</P>
          <UL items={[
            "Sell your data to third parties",
            "Use your data for automated decision-making with significant effects",
            "Process your data outside the EU/EEA without appropriate safeguards",
          ]} />

          <HR />

          {/* 5 */}
          <H2>5. Who we share data with</H2>
          <P>
            We share data only with service providers ("data processors") who help us run our
            business. Each is bound by GDPR-compliant Data Processing Agreements (DPAs).
          </P>
          <Table
            headers={["Service provider", "Purpose", "Location"]}
            rows={[
              ["Flodesk Inc.", "Email marketing", "USA — covered under EU-US Data Privacy Framework"],
              ["Vercel Inc.", "Website hosting", "USA — covered under EU-US Data Privacy Framework"],
              ["Google LLC (Workspace + Analytics)", "Email infrastructure + analytics", "USA — Standard Contractual Clauses"],
              ["Meta Platforms Ireland Ltd.", "Conversion tracking (only with consent)", "EU/USA — Standard Contractual Clauses"],
              ["Cookiebot / Iubenda", "Consent management", "EU"],
            ]}
          />
          <P>We may share data with authorities if required by Finnish or EU law.</P>

          <HR />

          {/* 6 */}
          <H2>6. International transfers</H2>
          <P>
            Some of our service providers are based outside the EU. We rely on:
          </P>
          <UL items={[
            "The EU-US Data Privacy Framework (for US-based processors that have certified)",
            "Standard Contractual Clauses (for other transfers)",
            "Supplementary safeguards where appropriate",
          ]} />

          <HR />

          {/* 7 */}
          <H2>7. How long we keep your data</H2>
          <Table
            headers={["Data type", "Retention period"]}
            rows={[
              ["Waitlist email + consent", "Until you unsubscribe + 12 months audit log"],
              ["Marketing subscriber data", "Until you unsubscribe + 6 months"],
              ["Customer support inquiries", "24 months"],
              ["Website analytics (anonymised)", "26 months"],
              ["Cookie consent records", "12 months"],
            ]}
          />
          <P>After these periods, data is deleted or fully anonymised.</P>

          <HR />

          {/* 8 */}
          <H2>8. Your rights under GDPR</H2>
          <P>You have the right to:</P>
          <UL items={[
            <><strong>Access</strong> your personal data</>,
            <><strong>Rectify</strong> inaccurate or incomplete data</>,
            <><strong>Erase</strong> your data ("right to be forgotten")</>,
            <><strong>Restrict</strong> processing</>,
            <><strong>Object</strong> to processing based on legitimate interest</>,
            <><strong>Data portability</strong> — receive your data in a machine-readable format</>,
            <><strong>Withdraw consent</strong> at any time</>,
            <>
              <strong>Lodge a complaint</strong> with the Finnish Data Protection Ombudsman
              (Tietosuojavaltuutettu) — <ExternalLink href="https://www.tietosuoja.fi" label="tietosuoja.fi" />
            </>,
          ]} />
          <P>
            To exercise any right, email <MailLink email="privacy@redvivestudios.com" />. We respond
            within 30 days.
          </P>

          <HR />

          {/* 9 */}
          <H2>9. Cookies</H2>
          <P>
            Our website uses cookies. You can review and change your preferences via the cookie
            banner at any time.
          </P>
          <P>Categories:</P>
          <UL items={[
            <><strong>Necessary</strong> — site function (always on, no consent required)</>,
            <><strong>Analytics</strong> — Google Analytics, anonymised IP (consent required)</>,
            <><strong>Marketing</strong> — Meta Pixel, conversion tracking (consent required)</>,
          ]} />
          <P>Without consent, only necessary cookies are loaded.</P>

          <HR />

          {/* 10 */}
          <H2>10. Children's privacy</H2>
          <P>
            Our services are not directed to anyone under 16. We do not knowingly collect data from
            minors. If you believe we have collected data from a minor, contact{" "}
            <MailLink email="privacy@redvivestudios.com" /> and we will delete it.
          </P>

          <HR />

          {/* 11 */}
          <H2>11. Security</H2>
          <P>
            We use reasonable technical and organisational measures to protect your data, including
            HTTPS encryption, encrypted databases at our processors, access controls, and 2FA on
            administrative accounts. No method of transmission over the internet is 100% secure.
          </P>

          <HR />

          {/* 12 */}
          <H2>12. Changes to this policy</H2>
          <P>
            We may update this policy. The "Last updated" date at the top reflects the most recent
            change. Material changes will be communicated by email to active subscribers.
          </P>

          <HR />

          {/* 13 */}
          <H2>13. Contact</H2>
          <P>
            Redvive Oy<br />
            <MailLink email="privacy@redvivestudios.com" /><br />
            Helsinki, Finland
          </P>
          <P>
            Finnish Data Protection Ombudsman:{" "}
            <ExternalLink href="https://www.tietosuoja.fi" label="tietosuoja.fi" />
          </P>

          <HR />

          {/* Language link */}
          <div className="mt-8 flex items-center gap-4">
            <Link href="/tietosuoja">
              <span
                className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity"
                style={{ color: "#7A4A42", fontFamily: "'Outfit', sans-serif" }}
              >
                Lue suomeksi →
              </span>
            </Link>
            <span style={{ color: "#E5DDD5" }}>|</span>
            <Link href="/">
              <span
                className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity"
                style={{ color: "#7A4A42", fontFamily: "'Outfit', sans-serif" }}
              >
                ← Back to home
              </span>
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
