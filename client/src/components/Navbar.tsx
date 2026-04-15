/*
 * REDVIVE Navbar
 * Style: Fixed top, transparent on hero → solid rose-white on scroll
 * Logo: "redvive" lowercase, DM Sans bold
 * Links: small caps, DM Sans
 * CTA: crimson button only
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHeroPage = location === "/";
  const isTransparent = !scrolled && !menuOpen && isHeroPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen || !isHeroPage
          ? "bg-[#FFF9F9] border-b border-[#E8D8D4]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <span
              className={`font-bold text-xl transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-[#1A1008]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
            >
              redvive
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
                  className={`text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
                    location === href
                      ? "text-[#C01A07]"
                      : isTransparent
                      ? "text-white/75 hover:text-white"
                      : "text-[#3D1A14]/70 hover:text-[#C01A07]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="/#waitlist">
              <button className="btn-primary text-xs">
                Join the Waitlist
              </button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
              isTransparent ? "text-white" : "text-[#1A1008]"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-200 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-200 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#E8D8D4] py-6 flex flex-col gap-4">
            {[
              { href: "/science", label: "The Science" },
              { href: "/experience", label: "The Experience" },
              { href: "/faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <span className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#3D1A14] py-1.5">
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
