/**
 * REDVIVE Footer
 * Deep oxblood background — clean, minimal, premium
 */

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a0102", borderTop: "1px solid rgba(255,222,205,0.08)" }}>
      <div className="container" style={{ padding: "4rem 0 3rem" }}>
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="md:max-w-xs">
            <a
              href="#"
              className="font-display block mb-4"
              style={{
                color: "#FFDECD",
                fontSize: "1.5rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              Redvive
            </a>
            <p
              className="font-body"
              style={{
                color: "rgba(255,222,205,0.45)",
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              A premium intimate wellness ritual for women who want to feel more alive, 
              more confident, and more deeply themselves.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-12">
            <div>
              <p
                className="font-body mb-5"
                style={{
                  color: "rgba(255,222,205,0.35)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                Product
              </p>
              <div className="flex flex-col gap-3">
                {["The Formula", "The Ritual", "Ingredients", "FAQ"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-body"
                    style={{
                      color: "rgba(255,222,205,0.55)",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FFDECD";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.55)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p
                className="font-body mb-5"
                style={{
                  color: "rgba(255,222,205,0.35)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                Brand
              </p>
              <div className="flex flex-col gap-3">
                {["Our Story", "Press", "Stockists", "Careers"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-body"
                    style={{
                      color: "rgba(255,222,205,0.55)",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FFDECD";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.55)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p
                className="font-body mb-5"
                style={{
                  color: "rgba(255,222,205,0.35)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                Support
              </p>
              <div className="flex flex-col gap-3">
                {["Contact", "Shipping", "Returns", "Privacy"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-body"
                    style={{
                      color: "rgba(255,222,205,0.55)",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FFDECD";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.55)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thin rule */}
        <div className="rule-warm mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-body"
            style={{
              color: "rgba(255,222,205,0.3)",
              fontSize: "0.72rem",
              fontWeight: 300,
              letterSpacing: "0.06em",
            }}
          >
            © 2025 Redvive. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Terms", "Privacy", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-body"
                style={{
                  color: "rgba(255,222,205,0.3)",
                  fontSize: "0.72rem",
                  fontWeight: 300,
                  letterSpacing: "0.06em",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.65)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.3)";
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {["Instagram", "TikTok"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body"
                style={{
                  color: "rgba(255,222,205,0.35)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#FA8743";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,222,205,0.35)";
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
