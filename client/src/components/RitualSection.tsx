/**
 * REDVIVE RitualSection
 * Oxblood dark section with ritual product image
 * Asymmetric split: image left (60%), copy right (40%)
 */

const RITUAL_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-ritual-NW7723vZLAwjkiBrBGC3mG.webp";

const steps = [
  {
    step: "I",
    title: "Morning",
    desc: "Two capsules with warm water. A moment of intention before the day begins.",
  },
  {
    step: "II",
    title: "Evening",
    desc: "Let the ritual close your day. A quiet act of care that belongs only to you.",
  },
  {
    step: "III",
    title: "30 Days",
    desc: "The shift is subtle at first — then unmistakable. You will feel it before you name it.",
  },
];

export default function RitualSection() {
  return (
    <section
      id="ritual"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#7E0306" }}
    >
      <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-0">
        {/* Left: product image — 55% */}
        <div
          className="relative lg:w-[55%] reveal"
          style={{ minHeight: "clamp(340px, 55vw, 680px)" }}
        >
          <img
            src={RITUAL_IMAGE}
            alt="Redvive ritual product"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
          />
          {/* Warm overlay on right edge to blend into dark section */}
          <div
            className="absolute inset-y-0 right-0 w-32 pointer-events-none hidden lg:block"
            style={{
              background: "linear-gradient(to right, transparent, #7E0306)",
            }}
          />
        </div>

        {/* Right: copy */}
        <div
          className="lg:w-[45%] flex flex-col justify-center reveal"
          style={{
            padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
            transitionDelay: "0.15s",
          }}
        >
          <p className="section-label mb-6" style={{ color: "rgba(252,175,103,0.7)" }}>
            The Ritual
          </p>

          <h2
            className="font-display mb-8"
            style={{
              color: "#FFDECD",
              fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
              lineHeight: 1.1,
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Beautiful by<br />design. Effortless<br />by nature.
          </h2>

          <p
            className="font-body mb-12"
            style={{
              color: "rgba(255,222,205,0.7)",
              fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              fontWeight: 300,
              lineHeight: 1.85,
              maxWidth: "380px",
            }}
          >
            Redvive is designed to integrate seamlessly into the life you already live — 
            not to add complexity, but to add depth.
          </p>

          {/* Ritual steps */}
          <div className="flex flex-col gap-8">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="flex gap-5 items-start reveal"
                style={{ transitionDelay: `${0.25 + i * 0.1}s` }}
              >
                <span
                  className="font-display flex-shrink-0"
                  style={{
                    color: "#D53E0F",
                    fontSize: "0.8rem",
                    fontStyle: "italic",
                    fontWeight: 700,
                    marginTop: "0.25rem",
                    minWidth: "1.5rem",
                  }}
                >
                  {s.step}
                </span>
                <div>
                  <p
                    className="font-body mb-1"
                    style={{
                      color: "#FFDECD",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      color: "rgba(255,222,205,0.6)",
                      fontSize: "0.88rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href="#cta" className="btn-primary">
              Begin Your Ritual
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
