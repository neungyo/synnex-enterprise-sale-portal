"use client";

import { createContext, useContext, useState } from "react";

export type Language = "th" | "en";
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: "th", setLanguage: () => undefined });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("th");
  const selectLanguage = (next: Language) => setLanguage(next);
  return <LanguageContext.Provider value={{ language, setLanguage: selectLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
