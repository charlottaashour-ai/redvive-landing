import { useLocation } from "wouter";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const [location] = useLocation();
  const isFinnish = location.startsWith("/fi");

  const handleSwitch = () => {
    if (isFinnish) {
      window.location.href = "/";
    } else {
      window.location.href = "/fi/";
    }
  };

  return (
    <button
      onClick={handleSwitch}
      className={className}
      aria-label={isFinnish ? "Switch to English" : "Vaihda suomeksi"}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: "0.65rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.45)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 0",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
      }}
    >
      {isFinnish ? "EN" : "FI"}
    </button>
  );
}
export default LanguageToggle;
