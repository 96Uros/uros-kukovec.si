import CountryFlag from "react-country-flag";
import { useI18n } from "../i18n/I18nProvider";

const flagStyle = { width: "1.6em", height: "1.6em", borderRadius: "2px" };

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="lang-switcher">
      <button
        type="button"
        className={`lang-switcher__btn${locale === "sl" ? " lang-switcher__btn--active" : ""}`}
        onClick={() => setLocale("sl")}
        aria-label="Slovenščina"
        aria-pressed={locale === "sl"}
      >
        <CountryFlag countryCode="SI" svg style={flagStyle} />
      </button>
      <button
        type="button"
        className={`lang-switcher__btn${locale === "en" ? " lang-switcher__btn--active" : ""}`}
        onClick={() => setLocale("en")}
        aria-label="English"
        aria-pressed={locale === "en"}
      >
        <CountryFlag countryCode="GB" svg style={flagStyle} />
      </button>
    </div>
  );
}
