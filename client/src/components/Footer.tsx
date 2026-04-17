/*
 * REDVIVE Footer
 * Style: Dark #0A0303 background, minimal, brand-compliant
 */

import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A0303", borderTop: "1px solid rgba(255,249,249,0.06)" }}>
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/">
              <span
                className="font-bold text-xl text-white mb-3 block cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
              >
                redvive
              </span>
            </Link>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,249,249,0.35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              light is the medicine.<br />
              Born in Finland. Built on science.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
            >
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/science", label: "The Science" },
                { href: "/experience", label: "The Experience" },
                { href: "/faq", label: "FAQ" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <span
                    className="text-sm transition-colors duration-200 hover:text-white cursor-pointer"
                    style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <p
              className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
            >
              Opening 2026
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
            >
              Helsinki, opening 2026.<br />
              Join the waitlist for priority access.
            </p>
            <a href="/#waitlist">
              <button className="btn-primary text-xs">
                Join the Waitlist
              </button>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,249,249,0.06)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,249,249,0.2)", fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2026 Redvive. Born in Finland.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Instagram", "TikTok"].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer transition-colors hover:text-white/50"
                style={{ color: "rgba(255,249,249,0.2)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
