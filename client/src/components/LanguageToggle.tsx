import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";

const pairedRoutes: Record<string, { en: string; fi: string }> = {
  "/": { en: "/", fi: "/fi/" },
  "/fi": { en: "/", fi: "/fi/" },
  "/fi/": { en: "/", fi: "/fi/" },
  "/science": { en: "/science", fi: "/fi/tiede" },
  "/fi/tiede": { en: "/science", fi: "/fi/tiede" },
  "/experience": { en: "/experience", fi: "/fi/experience" },
  "/fi/experience": { en: "/experience", fi: "/fi/experience" },
  "/faq": { en: "/faq", fi: "/fi/faq" },
  "/fi/faq": { en: "/faq", fi: "/fi/faq" },
  "/privacy": { en: "/privacy", fi: "/tietosuoja" },
  "/tietosuoja": { en: "/privacy", fi: "/tietosuoja" },
};

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [location, navigate] = useLocation();

  const switchLanguage = (target: "en" | "fi") => {
    const pair = pairedRoutes[location] ?? pairedRoutes["/"];
    setLanguage(target);
    navigate(pair[target]);
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="radiogroup"
      aria-label="Change language / Vaihda kieli"
    >
      <button
        onClick={() => switchLanguage("en")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); switchLanguage("en"); } }}
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
        onClick={() => switchLanguage("fi")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); switchLanguage("fi"); } }}
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
