import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const [, navigate] = useLocation();

  const switchTo = (lang: "en" | "fi") => {
    if (lang === language) return;
    if (lang === "fi") {
      navigate("/fi/");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="radiogroup"
      aria-label="Change language / Vaihda kieli"
    >
      <button
        onClick={() => switchTo("en")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); switchTo("en"); } }}
        aria-checked={language === "en"}
        role="radio"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: language === "en" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 6px",
          transition: "color 0.2s ease",
          textDecoration: language === "en" ? "underline" : "none",
          textUnderlineOffset: "3px",
        }}
      >
        EN
      </button>
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>·</span>
      <button
        onClick={() => switchTo("fi")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); switchTo("fi"); } }}
        aria-checked={language === "fi"}
        role="radio"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: language === "fi" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 6px",
          transition: "color 0.2s ease",
          textDecoration: language === "fi" ? "underline" : "none",
          textUnderlineOffset: "3px",
        }}
      >
        FI
      </button>
    </div>
  );
}

export default LanguageToggle;
