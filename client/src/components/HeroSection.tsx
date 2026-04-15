/**
 * REDVIVE HeroSection
 * Full-bleed cinematic hero inspired by Delphi reference:
 * - Full-viewport image background
 * - Bold left-aligned headline
 * - Minimal UI overlay
 * - Bottom-anchored supporting text + CTA on right
 */

import { useEffect, useRef } from "react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-v2-CZBfdZSjaRxfDa3JDk5Gzk.webp";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Staggered headline entrance
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    const timer = setTimeout(() => {
      el.style.transition = "opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Subtle dark vignette overlay — bottom and sides */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,2,2,0.72) 0%, rgba(10,2,2,0.18) 40%, transparent 70%), linear-gradient(to right, rgba(10,2,2,0.35) 0%, transparent 50%)",
        }}
      />

      {/* Top-left: brand label */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between"
        style={{ padding: "2rem 2.5rem", paddingTop: "5rem" }}
      >
        {/* Intentionally empty — nav handles top bar */}
      </div>

      {/* Main headline — bottom-left, large, bold */}
      <div
        className="absolute"
        style={{ bottom: "clamp(5rem, 12vh, 9rem)", left: "clamp(1.5rem, 4vw, 5rem)", maxWidth: "680px" }}
      >
        <p
          className="section-label mb-5"
          style={{ color: "rgba(252, 175, 103, 0.85)", opacity: 0, animation: "fadeUp 0.8s 0.1s ease forwards" }}
        >
          Intimate Wellness Ritual
        </p>
        <h1
          ref={headlineRef}
          className="font-display"
          style={{
            color: "#FFDECD",
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            lineHeight: 1.0,
            fontWeight: 700,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          Return to<br />yourself.
        </h1>
      </div>

      {/* Bottom-right: subheadline + CTA (Delphi-style) */}
      <div
        className="absolute"
        style={{
          bottom: "clamp(5rem, 12vh, 9rem)",
          right: "clamp(1.5rem, 4vw, 5rem)",
          maxWidth: "360px",
          textAlign: "right",
        }}
      >
        <p
          className="font-body mb-6"
          style={{
            color: "rgba(255,222,205,0.82)",
            fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
            fontWeight: 300,
            lineHeight: 1.7,
            opacity: 0,
            animation: "fadeUp 0.9s 0.45s ease forwards",
          }}
        >
          A new ritual for women who want<br />
          to feel more alive, more confident,<br />
          and more deeply themselves.
        </p>
        <div
          className="flex flex-col gap-3 items-end"
          style={{ opacity: 0, animation: "fadeUp 0.9s 0.65s ease forwards" }}
        >
          <a href="#cta" className="btn-primary" style={{ minWidth: "220px", textAlign: "center" }}>
            Begin Your Ritual
          </a>
          <a href="#brand-promise" className="btn-outline" style={{ minWidth: "220px", textAlign: "center" }}>
            Discover Redvive
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "2rem",
          opacity: 0,
          animation: "fadeUp 1s 1.2s ease forwards",
        }}
      >
        <a
          href="#brand-promise"
          className="flex flex-col items-center gap-2"
          style={{ color: "rgba(255,222,205,0.5)" }}
        >
          <span className="nav-link" style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}>
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(255,222,205,0.5), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </a>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.9; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
