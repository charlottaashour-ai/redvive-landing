/**
 * REDVIVE FinalCTA
 * Full-bleed oxblood section with hero image background
 * Cinematic, emotionally rich closing CTA
 */

import { useState } from "react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-v2-CZBfdZSjaRxfDa3JDk5Gzk.webp";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,2,2,0.55) 0%, rgba(126,3,6,0.82) 100%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="section-label mb-6 reveal"
            style={{ color: "rgba(252,175,103,0.8)" }}
          >
            Begin Your Ritual
          </p>

          <h2
            className="font-display mb-6 reveal"
            style={{
              color: "#FFDECD",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1.05,
              fontStyle: "italic",
              fontWeight: 700,
              transitionDelay: "0.1s",
            }}
          >
            The most intimate<br />act of self-care<br />starts here.
          </h2>

          <p
            className="font-body mb-12 reveal"
            style={{
              color: "rgba(255,222,205,0.75)",
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              transitionDelay: "0.2s",
            }}
          >
            Join thousands of women who have chosen to return to themselves.<br />
            First access. Limited availability.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="reveal flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              style={{ transitionDelay: "0.3s" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 font-body"
                style={{
                  backgroundColor: "rgba(255,222,205,0.1)",
                  border: "1px solid rgba(255,222,205,0.3)",
                  color: "#FFDECD",
                  padding: "1rem 1.5rem",
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  outline: "none",
                  letterSpacing: "0.04em",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,222,205,0.7)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,222,205,0.3)";
                }}
              />
              <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
                Join Waitlist
              </button>
            </form>
          ) : (
            <div
              className="reveal text-center"
              style={{ transitionDelay: "0.1s" }}
            >
              <div
                className="font-display"
                style={{
                  color: "#D53E0F",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  marginBottom: "0.75rem",
                }}
              >
                You're on the list.
              </div>
              <p
                className="font-body"
                style={{
                  color: "rgba(255,222,205,0.65)",
                  fontSize: "0.88rem",
                  fontWeight: 300,
                }}
              >
                We'll be in touch when Redvive is ready for you.
              </p>
            </div>
          )}

          {/* Or shop now */}
          <div className="mt-8 reveal" style={{ transitionDelay: "0.4s" }}>
            <a
              href="#"
              className="font-body"
              style={{
                color: "rgba(255,222,205,0.5)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: "rgba(255,222,205,0.25)",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.5)";
              }}
            >
              Shop the Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
