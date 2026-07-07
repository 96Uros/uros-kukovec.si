import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Starfield } from "./components/Starfield";
import { useI18n } from "./i18n/I18nProvider";

export function App() {
  const { t } = useI18n();

  return (
    <>
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/assets/videos/bg1.mp4" type="video/mp4" />
      </video>
      <div className="overlay" />
      <Starfield />
      <LanguageSwitcher />

      <div className="container">
        <div className="content">
          <h1 className="name">{t.name}</h1>
          <br />
          <p className="subtitle">{t.subtitle}</p>
          <p className="contact">
            <a href="mailto:uros-kukovec@outlook.com">uros-kukovec@outlook.com</a>
            <span className="contact-separator"> | </span>
            <a href="tel:+38640325711">+386 40 325 711</a>
          </p>
        </div>
      </div>

      <p className="service-line bottom-service-line">{t.serviceLine}</p>
    </>
  );
}
