/**
 * REDVIVE BrandPromise
 * Oxblood dark section — emotional brand introduction
 * Asymmetric layout: large italic serif left, body copy right
 */

export default function BrandPromise() {
  return (
    <section
      id="brand-promise"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#7E0306", padding: "clamp(5rem, 10vw, 9rem) 0" }}
    >
      {/* Subtle warm glow top-right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "50%",
          height: "60%",
          background: "radial-gradient(ellipse at top right, rgba(250,135,67,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
          {/* Left: large italic serif statement */}
          <div className="lg:w-1/2 reveal">
            <p className="section-label mb-6" style={{ color: "rgba(252,175,103,0.7)" }}>
              Our Promise
            </p>
            <h2
              className="font-display"
              style={{
                color: "#FFDECD",
                fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                lineHeight: 1.1,
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Wellness that<br />
              begins where<br />
              you truly live.
            </h2>

            {/* Thin warm rule */}
            <div className="rule-warm mt-10" style={{ maxWidth: "200px" }} />
          </div>

          {/* Right: body copy */}
          <div className="lg:w-1/2 reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="lg:pt-16">
              <p
                className="font-body mb-6"
                style={{
                  color: "rgba(255,222,205,0.85)",
                  fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                Redvive is not a supplement. It is not a treatment. It is a ritual — 
                a daily act of returning to your body, your desire, and your own quiet power.
              </p>
              <p
                className="font-body mb-10"
                style={{
                  color: "rgba(255,222,205,0.65)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                We created Redvive for women who know that feeling fully alive is not a luxury — 
                it is a necessity. Women who want their wellness to feel as beautiful as they are.
              </p>

              {/* Stats row */}
              <div className="flex gap-10 flex-wrap">
                {[
                  { num: "97%", label: "Reported renewed confidence" },
                  { num: "30", label: "Days to feel the shift" },
                  { num: "6", label: "Botanicals, one ritual" },
                ].map((stat) => (
                  <div key={stat.num}>
                    <p
                      className="font-display"
                      style={{
                        color: "#FA8743",
                        fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                        fontWeight: 700,
                        lineHeight: 1,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {stat.num}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        color: "rgba(255,222,205,0.55)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 400,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
