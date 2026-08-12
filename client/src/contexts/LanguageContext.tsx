import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

type Language = "en" | "fi";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

function detectInitialLanguage(pathname: string): Language {
  // URL takes priority
  if (pathname.startsWith("/fi")) return "fi";
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
  const [location] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage(location));

  // Sync language from URL changes
  useEffect(() => {
    const urlLang: Language = location.startsWith("/fi") ? "fi" : "en";
    if (urlLang !== language) {
      setLanguageState(urlLang);
    }
  }, [location]);

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
