/*
 * REDVIVE Footer
 * Style: Dark #0A0303 background, minimal, brand-compliant
 * Logo: White PNG wordmark (CDN) — works perfectly on dark bg
 * i18n: useTranslation() for all copy; privacy link path is language-aware
 */

import { Link } from "wouter";
import { useTranslation } from "@/lib/translations";

const LOGO_WHITE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-logo-white_320ba7bd.png";

export default function Footer() {
  const t = useTranslation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/science", label: t("nav.science") },
    { href: "/experience", label: t("nav.experience") },
    { href: "/faq", label: t("nav.faq") },
  ];

  const taglineLines = t("footer.tagline").split("\n");
  const footerCtaLines = t("nav.footer_tagline").split("\n");

  return (
    <footer style={{ backgroundColor: "#0A0303", borderTop: "1px solid rgba(255,249,249,0.06)" }}>
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/">
              <span className="block mb-4 cursor-pointer">
                <img
                  src={LOGO_WHITE}
                  alt="Redvive"
                  className="h-6 w-auto"
                />
              </span>
            </Link>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,249,249,0.35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {taglineLines.map((line, i) => (
                <span key={i}>{line}{i < taglineLines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("nav.navigate")}
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
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
              style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("nav.opening")}
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
            >
              {footerCtaLines.map((line, i) => (
                <span key={i}>{line}{i < footerCtaLines.length - 1 && <br />}</span>
              ))}
            </p>
            <a href="/#waitlist">
              <button className="btn-primary text-xs">
                {t("nav.reserve")}
              </button>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,249,249,0.06)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,249,249,0.2)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6 flex-wrap">
            <Link href={t("footer.privacy_path")}>
              <span
                className="text-xs cursor-pointer transition-colors hover:text-white/50"
                style={{ color: "rgba(255,249,249,0.2)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("footer.privacy")}
              </span>
            </Link>
            <a
              href="https://www.instagram.com/redlighthelsinki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white/50"
              style={{ color: "rgba(255,249,249,0.2)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@redlighthelsinki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white/50"
              style={{ color: "rgba(255,249,249,0.2)", fontFamily: "'DM Sans', sans-serif" }}
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
