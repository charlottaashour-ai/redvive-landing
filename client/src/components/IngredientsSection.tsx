/**
 * REDVIVE IngredientsSection
 * Light tuft-bush background — formulation credibility
 * Asymmetric: copy left, image right with ingredient pills
 */

const INGREDIENTS_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-ingredients-aVFyfpFBhQ9CBbUrJiJAda.webp";

const ingredients = [
  { name: "Saffron Extract", benefit: "Mood & desire" },
  { name: "Ashwagandha KSM-66", benefit: "Stress & vitality" },
  { name: "Maca Root", benefit: "Hormonal balance" },
  { name: "Damiana Leaf", benefit: "Sensory warmth" },
  { name: "Tribulus Terrestris", benefit: "Feminine energy" },
  { name: "Rose Hip Complex", benefit: "Cellular radiance" },
];

export default function IngredientsSection() {
  return (
    <section
      id="ingredients"
      style={{ backgroundColor: "#FFDECD", padding: "clamp(5rem, 10vw, 9rem) 0" }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left: copy */}
          <div className="lg:w-[45%] reveal">
            <p className="section-label mb-5">The Formula</p>
            <h2
              className="font-display mb-8"
              style={{
                color: "#7E0306",
                fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
                lineHeight: 1.1,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Six botanicals.<br />One precise<br />intention.
            </h2>

            <p
              className="font-body mb-8"
              style={{
                color: "rgba(126,3,6,0.7)",
                fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.85,
              }}
            >
              Every ingredient in Redvive was chosen for its centuries of use in 
              feminine wellness traditions — then validated by modern science. 
              Nothing is here by accident. Everything is here with purpose.
            </p>

            {/* Ingredient pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {ingredients.map((ing) => (
                <div key={ing.name} className="ingredient-pill">
                  <span style={{ color: "#7E0306", fontWeight: 500 }}>{ing.name}</span>
                  <span
                    style={{
                      color: "#FA8743",
                      marginLeft: "0.5rem",
                      fontSize: "0.65rem",
                      fontWeight: 300,
                    }}
                  >
                    — {ing.benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {["Clinically Studied", "No Fillers", "Vegan Formula", "Third-Party Tested"].map(
                (badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#FA8743",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="font-body"
                      style={{
                        color: "rgba(126,3,6,0.65)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 400,
                      }}
                    >
                      {badge}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right: image */}
          <div className="lg:w-[55%] reveal" style={{ transitionDelay: "0.15s" }}>
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              <img
                src={INGREDIENTS_IMAGE}
                alt="Redvive botanical ingredients"
                className="w-full h-auto"
                style={{
                  display: "block",
                  maxHeight: "520px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              {/* Warm overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(255,222,205,0.3) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
