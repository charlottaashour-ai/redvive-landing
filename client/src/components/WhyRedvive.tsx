/**
 * REDVIVE WhyRedvive
 * Light tuft-bush background — brand differentiation
 * Asymmetric editorial layout with brand image
 */

const BRAND_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-brand-oMMocN2yFt6Jk8d9jX7HmQ.webp";

const differentiators = [
  {
    title: "Made for women, by women",
    body: "Redvive was built from lived experience — not a lab hypothesis. Every decision reflects what women actually need.",
  },
  {
    title: "Beauty as a standard, not a bonus",
    body: "We believe your wellness ritual should be as beautiful as you are. Redvive is designed to belong on your vanity, not hidden in a cabinet.",
  },
  {
    title: "Ritual over routine",
    body: "We don't sell a habit. We offer a ceremony — a daily act of choosing yourself, your pleasure, and your power.",
  },
  {
    title: "Discreet. Confident. Yours.",
    body: "Intimate wellness deserves the same elegance as any luxury beauty product. No shame. No noise. Just you.",
  },
];

export default function WhyRedvive() {
  return (
    <section
      id="why"
      style={{ backgroundColor: "#FFDECD", padding: "clamp(5rem, 10vw, 9rem) 0" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="mb-16 reveal">
          <p className="section-label mb-4">Why Redvive</p>
          <h2
            className="font-display"
            style={{
              color: "#7E0306",
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              lineHeight: 1.1,
              fontStyle: "italic",
              fontWeight: 500,
              maxWidth: "600px",
            }}
          >
            Not like anything<br />you've tried before.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left: differentiators */}
          <div className="lg:w-[55%]">
            <div className="flex flex-col gap-0">
              {differentiators.map((d, i) => (
                <div
                  key={d.title}
                  className="reveal group"
                  style={{
                    borderTop: "1px solid rgba(126,3,6,0.12)",
                    padding: "2rem 0",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="flex gap-6 items-start">
                    <span
                      className="font-display flex-shrink-0"
                      style={{
                        color: "#FA8743",
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        fontWeight: 700,
                        marginTop: "0.3rem",
                        opacity: 0.6,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className="font-display mb-3"
                        style={{
                          color: "#7E0306",
                          fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                          fontWeight: 500,
                          fontStyle: "italic",
                          lineHeight: 1.3,
                        }}
                      >
                        {d.title}
                      </h3>
                      <p
                        className="font-body"
                        style={{
                          color: "rgba(126,3,6,0.65)",
                          fontSize: "0.9rem",
                          fontWeight: 300,
                          lineHeight: 1.8,
                        }}
                      >
                        {d.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(126,3,6,0.12)" }} />
            </div>
          </div>

          {/* Right: brand image — sticky on desktop */}
          <div
            className="lg:w-[45%] reveal"
            style={{ transitionDelay: "0.2s", position: "sticky", top: "6rem", alignSelf: "flex-start" }}
          >
            <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
              <img
                src={BRAND_IMAGE}
                alt="Redvive brand — flowing silk in oxblood and cream"
                className="w-full h-auto"
                style={{
                  display: "block",
                  maxHeight: "560px",
                  objectFit: "cover",
                }}
              />
              {/* Brand quote overlay */}
              <div
                className="absolute inset-0 flex items-end"
                style={{
                  background: "linear-gradient(to top, rgba(126,3,6,0.7) 0%, transparent 50%)",
                  padding: "2.5rem",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    color: "#FFDECD",
                    fontSize: "clamp(1rem, 2vw, 1.35rem)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  "A luxury ritual brand for<br />feminine vitality — cinematic,<br />sensual, and beautifully designed."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
