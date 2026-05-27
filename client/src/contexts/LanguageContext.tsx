import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "fi";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Persisted choice
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem("redvive-language") : null;
    if (stored === "fi" || stored === "en") return stored;
    // 2. Browser locale fallback
    if (typeof navigator !== "undefined" && navigator.language?.startsWith("fi")) return "fi";
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("redvive-language", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
