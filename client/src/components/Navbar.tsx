/**
 * REDVIVE Navbar
 * Sticky, transparent-to-solid on scroll
 * Dark version (on hero) → light version (on content)
 */

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(126, 3, 6, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,222,205,0.12)" : "none",
        padding: scrolled ? "0.85rem 0" : "1.5rem 0",
      }}
    >
      <div className="container flex items-center justify-between">
        {/* Left nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#ritual" className="nav-link" style={{ color: "rgba(255,222,205,0.75)" }}>
            Ritual
          </a>
          <a href="#ingredients" className="nav-link" style={{ color: "rgba(255,222,205,0.75)" }}>
            Formula
          </a>
        </div>

        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl tracking-[0.18em] uppercase"
          style={{ color: "#FFDECD", letterSpacing: "0.22em", fontWeight: 500 }}
        >
          Redvive
        </a>

        {/* Right nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#why" className="nav-link" style={{ color: "rgba(255,222,205,0.75)" }}>
            Our Story
          </a>
          <a
            href="#cta"
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.65rem" }}
          >
            Begin Ritual
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: "#FFDECD",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-4 h-px transition-all duration-300"
            style={{
              backgroundColor: "#FFDECD",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: "#FFDECD",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: "rgba(126, 3, 6, 0.98)",
            borderTop: "1px solid rgba(255,222,205,0.12)",
            padding: "1.5rem",
          }}
        >
          <div className="flex flex-col gap-5">
            {["Ritual", "Formula", "Our Story"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="nav-link"
                style={{ color: "rgba(255,222,205,0.8)", fontSize: "0.8rem" }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="#cta" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
              Begin Ritual
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
