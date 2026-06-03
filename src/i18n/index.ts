import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ur from "./locales/ur.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ur", label: "اردو", dir: "rtl" as const },
  // Future-ready localization targets (translations to be added):
  // { code: "ar", label: "العربية", dir: "rtl" },
  // { code: "zh", label: "中文", dir: "ltr" },
  // { code: "tr", label: "Türkçe", dir: "ltr" },
];

export const RTL_LANGUAGES = ["ur", "ar"];

const stored =
  typeof window !== "undefined" ? localStorage.getItem("bss-lang") : null;

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
  },
  lng: stored || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function applyDirection(lang: string) {
  const dir = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

applyDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("bss-lang", lng);
  applyDirection(lng);
});

export default i18n;
