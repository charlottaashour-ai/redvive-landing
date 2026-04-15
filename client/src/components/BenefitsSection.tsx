/**
 * REDVIVE BenefitsSection
 * Light tuft-bush background — editorial benefit pillars
 * Not a generic icon grid — each card is a composed editorial panel
 */

const benefits = [
  {
    number: "01",
    title: "Desire, Rekindled",
    body:
      "Redvive works with your body's natural rhythms to restore the vitality and desire that stress, time, and life quietly take away.",
    accent: "#D53E0F",
  },
  {
    number: "02",
    title: "Confidence, Embodied",
    body:
      "Feel at home in your own skin again. Redvive supports the hormonal and emotional balance that makes you feel fully, powerfully yourself.",
    accent: "#FA8743",
  },
  {
    number: "03",
    title: "Sensory Vitality",
    body:
      "Heightened awareness. Deeper presence. A renewed connection to pleasure, sensation, and the richness of being alive.",
    accent: "#D53E0F",
  },
  {
    number: "04",
    title: "Intimate Wellbeing",
    body:
      "Formulated to support feminine health from within — gently, beautifully, and without compromise on elegance or efficacy.",
    accent: "#FA8743",
  },
  {
    number: "05",
    title: "The Daily Ritual",
    body:
      "A moment that belongs entirely to you. Redvive transforms your wellness routine into an act of self-devotion.",
    accent: "#D53E0F",
  },
];

export default function BenefitsSection() {
  return (
    <section
      style={{ backgroundColor: "#FFDECD", padding: "clamp(5rem, 10vw, 9rem) 0" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 reveal">
          <div>
            <p className="section-label mb-4">What Redvive Does</p>
            <h2
              className="font-display"
              style={{
                color: "#7E0306",
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                lineHeight: 1.1,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Five pillars of<br />feminine vitality.
            </h2>
          </div>
          <p
            className="font-body md:max-w-xs"
            style={{
              color: "rgba(126,3,6,0.6)",
              fontSize: "0.9rem",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Each benefit is designed to work in harmony — not in isolation — 
            because true wellness is never just one thing.
          </p>
        </div>

        {/* Benefits grid — 3 columns, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(126,3,6,0.1)" }}>
          {benefits.map((b, i) => (
            <div
              key={b.number}
              className="reveal group"
              style={{
                backgroundColor: "#FFDECD",
                padding: "clamp(2rem, 4vw, 3rem)",
                transitionDelay: `${i * 0.08}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Hover warm fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(250,135,67,0.06) 0%, transparent 60%)" }}
              />

              <span
                className="font-display block mb-6"
                style={{
                  color: b.accent,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  opacity: 0.22,
                  lineHeight: 1,
                  fontStyle: "italic",
                }}
              >
                {b.number}
              </span>

              <h3
                className="font-display mb-4"
                style={{
                  color: "#7E0306",
                  fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  lineHeight: 1.3,
                }}
              >
                {b.title}
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
                {b.body}
              </p>
            </div>
          ))}

          {/* 6th cell — brand quote, decorative */}
          <div
            className="reveal"
            style={{
              backgroundColor: "#7E0306",
              padding: "clamp(2rem, 4vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              transitionDelay: "0.4s",
              position: "relative",
              overflow: "hidden",
              minHeight: "200px",
            }}
          >
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{
                width: "70%",
                height: "70%",
                background: "radial-gradient(ellipse at top right, rgba(250,135,67,0.15) 0%, transparent 70%)",
              }}
            />
            <p
              className="font-display"
              style={{
                color: "#FFDECD",
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.6,
                position: "relative",
              }}
            >
              "Feeling fully alive<br />is not a luxury —<br />it is a necessity."
            </p>
            <div className="rule-warm mt-5" style={{ maxWidth: "60px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
