/**
 * REDVIVE TestimonialsSection
 * Oxblood dark background — emotionally resonant testimonials
 * Horizontal scroll on mobile, 3-column on desktop
 */

const testimonials = [
  {
    quote:
      "I didn't expect to feel different this quickly. Something shifted — quietly, deeply — and I haven't looked back.",
    name: "Camille R.",
    detail: "34, Paris",
  },
  {
    quote:
      "Redvive gave me back something I didn't even know I'd lost. It's not dramatic. It's just... me again.",
    name: "Sofia M.",
    detail: "41, Stockholm",
  },
  {
    quote:
      "The ritual itself is what I love most. It's the one thing in my day that's entirely mine.",
    name: "Isabelle T.",
    detail: "29, London",
  },
  {
    quote:
      "I've tried everything. This is the first thing that actually felt like it was made for a woman — not a clinical trial.",
    name: "Nadia K.",
    detail: "38, Helsinki",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      style={{ backgroundColor: "#7E0306", padding: "clamp(5rem, 10vw, 9rem) 0", overflow: "hidden" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6 reveal">
          <div>
            <p className="section-label mb-4" style={{ color: "rgba(252,175,103,0.7)" }}>
              Women on Redvive
            </p>
            <h2
              className="font-display"
              style={{
                color: "#FFDECD",
                fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
                lineHeight: 1.1,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Quietly<br />transformative.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L8.545 5.09H13L9.545 7.545L10.91 12L7 9.455L3.09 12L4.455 7.545L1 5.09H5.455L7 1Z"
                  fill="#D53E0F"
                />
              </svg>
            ))}
            <span
              className="font-body ml-2"
              style={{ color: "rgba(255,222,205,0.55)", fontSize: "0.75rem", fontWeight: 300 }}
            >
              4.9 / 5 · 2,400+ reviews
            </span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,222,205,0.08)" }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card reveal group"
              style={{
                backgroundColor: "rgba(126,3,6,0.01)",
                transitionDelay: `${i * 0.1}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Hover warm glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, rgba(213,62,15,0.08) 0%, transparent 70%)" }}
              />

              {/* Large open quote */}
              <div
                className="font-display mb-4"
                style={{
                  color: "#D53E0F",
                  fontSize: "4rem",
                  lineHeight: 0.8,
                  opacity: 0.3,
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                "
              </div>

              <p
                className="font-body mb-8"
                style={{
                  color: "rgba(255,222,205,0.88)",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  fontStyle: "italic",
                }}
              >
                {t.quote}
              </p>

              <div className="mt-auto">
                <div className="rule-warm mb-4" style={{ maxWidth: "40px" }} />
                <p
                  className="font-body"
                  style={{
                    color: "#FFDECD",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                  }}
                >
                  {t.name}
                </p>
                <p
                  className="font-body"
                  style={{
                    color: "rgba(255,222,205,0.45)",
                    fontSize: "0.72rem",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                  }}
                >
                  {t.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
