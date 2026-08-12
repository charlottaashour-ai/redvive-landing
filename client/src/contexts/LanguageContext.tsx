import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fi";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

function detectInitialLanguage(): Language {
  // URL takes priority on first load
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/fi")) return "fi";
  // Then localStorage
  try {
    const stored = localStorage.getItem("redvive_lang");
    if (stored === "fi" || stored === "en") return stored;
  } catch {}
  // Then browser language
  if (typeof navigator !== "undefined" && navigator.language?.startsWith("fi")) return "fi";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("redvive_lang", language);
    } catch {}
  }, [language]);

  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
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
