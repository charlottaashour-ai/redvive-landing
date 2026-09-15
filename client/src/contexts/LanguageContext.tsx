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
  // Public URLs define the language; stored browser state must never override a URL.
  if (typeof window !== "undefined") return window.location.pathname.startsWith("/fi") ? "fi" : "en";
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
