/*
 * REDVIVE Navbar
 * Style: Fixed top, fully transparent over hero → dark frosted bar on scroll
 * At page top (hero pages): bg transparent, logo white, links at 50% white opacity
 * On scroll (>60px): smooth 0.35s ease to #0A0303 with backdrop-blur, links full white
 * Non-hero pages: always dark frosted bar
 * Logo: White PNG wordmark — always white (dark bg in both states)
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const LOGO_WHITE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-logo-white_320ba7bd.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    // Set initial state in case page loads mid-scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHeroPage = location === "/";
  // Transparent only when: hero page, not scrolled, menu closed
  const isTransparent = isHeroPage && !scrolled && !menuOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isTransparent ? "transparent" : "rgba(10,3,3,0.88)",
        backdropFilter: isTransparent ? "none" : "blur(12px)",
        WebkitBackdropFilter: isTransparent ? "none" : "blur(12px)",
        borderBottom: isTransparent ? "none" : "1px solid rgba(255,255,255,0.06)",
        transition: "background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo — always white */}
          <Link href="/">
            <span className="block cursor-pointer">
              <img
                src={LOGO_WHITE}
                alt="Redvive"
                className="h-6 w-auto"
                style={{
                  opacity: isTransparent ? 0.9 : 1,
                  transition: "opacity 0.35s ease",
                }}
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/science", label: "The Science" },
              { href: "/experience", label: "The Experience" },
              { href: "/faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <span
                  className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color:
                      location === href
                        ? "#D53E0F"
                        : isTransparent
                        ? "rgba(255,255,255,0.50)"
                        : "rgba(255,255,255,0.80)",
                    transition: "color 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (location !== href) {
                      (e.currentTarget as HTMLElement).style.color = "#D53E0F";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location !== href) {
                      (e.currentTarget as HTMLElement).style.color = isTransparent
                        ? "rgba(255,255,255,0.50)"
                        : "rgba(255,255,255,0.80)";
                    }
                  }}
                >
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden md:block">
            <a href="/#waitlist">
              <button className="btn-primary text-xs">
                Join the Waitlist
              </button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            style={{ color: "rgba(255,255,255,0.90)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 bg-current transition-all duration-200 origin-center"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <span
              className="block w-6 h-0.5 bg-current transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-current transition-all duration-200 origin-center"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
            />
          </button>
        </div>

        {/* Mobile menu — always dark */}
        {menuOpen && (
          <div
            className="md:hidden py-6 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
          >
            {[
              { href: "/science", label: "The Science" },
              { href: "/experience", label: "The Experience" },
              { href: "/faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <span
                  className="block text-xs font-semibold tracking-[0.14em] uppercase py-1.5"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: location === href ? "#D53E0F" : "rgba(255,255,255,0.80)",
                  }}
                >
                  {label}
                </span>
              </Link>
            ))}
            <a href="/#waitlist">
              <button className="btn-primary w-full mt-2 justify-center">
                Join the Waitlist
              </button>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
