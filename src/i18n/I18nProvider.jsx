import { createContext, useContext, useEffect, useState } from "react";
import sl from "../../locales/sl.json";
import en from "../../locales/en.json";

const locales = { sl, en };
const STORAGE_KEY = "locale";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "sl" ? saved : "sl";
  });

  const t = locales[locale];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.title = t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.meta.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", t.meta.ogDescription);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", locale === "sl" ? "sl_SI" : "en_GB");

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", t.meta.title);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute("content", t.meta.ogDescription);
  }, [locale, t]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
