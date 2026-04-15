/**
 * REDVIVE TrustBar
 * Scrolling marquee of trust signals between hero and brand promise
 * Deep oxblood background, warm text
 */

const items = [
  "Clinically Studied Formula",
  "·",
  "97% Reported Renewed Confidence",
  "·",
  "Vegan & Cruelty-Free",
  "·",
  "Third-Party Tested",
  "·",
  "Free Shipping on First Order",
  "·",
  "30-Day Ritual Guarantee",
  "·",
  "Clinically Studied Formula",
  "·",
  "97% Reported Renewed Confidence",
  "·",
  "Vegan & Cruelty-Free",
  "·",
  "Third-Party Tested",
  "·",
  "Free Shipping on First Order",
  "·",
  "30-Day Ritual Guarantee",
  "·",
];

export default function TrustBar() {
  return (
    <div
      style={{
        backgroundColor: "#D53E0F",
        overflow: "hidden",
        padding: "0.75rem 0",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #D53E0F, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #D53E0F, transparent)" }}
      />

      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-body"
            style={{
              color: item === "·" ? "rgba(255,222,205,0.4)" : "#FFDECD",
              fontSize: "0.68rem",
              fontWeight: item === "·" ? 300 : 400,
              letterSpacing: item === "·" ? "0" : "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
