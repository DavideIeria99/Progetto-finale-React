import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    backend: {
      loadPath: `./locales/{{lng}}.json`,
    },
  });

export default i18next;
