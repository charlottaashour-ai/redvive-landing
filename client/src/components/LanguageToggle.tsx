import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`flex items-center gap-0 ${className}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <button
        onClick={() => setLanguage("en")}
        className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase transition-opacity duration-200"
        style={{
          color: language === "en" ? "#FFFFFF" : "rgba(255,255,255,0.35)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px 6px",
        }}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>|</span>
      <button
        onClick={() => setLanguage("fi")}
        className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase transition-opacity duration-200"
        style={{
          color: language === "fi" ? "#FFFFFF" : "rgba(255,255,255,0.35)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px 6px",
        }}
        aria-label="Vaihda suomeksi"
      >
        FI
      </button>
    </div>
  );
}

export default LanguageToggle;
