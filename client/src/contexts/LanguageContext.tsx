import React, { createContext, useContext } from "react";

type Language = "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => {} }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
