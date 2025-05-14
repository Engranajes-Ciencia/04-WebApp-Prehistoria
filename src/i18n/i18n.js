import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importa tus archivos de traducción
import esGeneral from "../locales/es/general.json";
import esPages from "../locales/es/pages.json";
import enGeneral from "../locales/en/general.json";
import enPages from "../locales/en/pages.json";

i18n
  .use(LanguageDetector) // Detecta automáticamente el idioma del navegador
  .use(initReactI18next) // Conecta con React
  .init({
    resources: {
      es: {
        general: esGeneral,
        pages: esPages,
      },
      en: {
        general: enGeneral,
        pages: enPages,
      },
    },
    fallbackLng: "es", // Idioma por defecto si el detectado falla
    ns: ["general", "pages"], // Espacios de nombres disponibles
    defaultNS: "general",     // Espacio de nombres por defecto

    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

