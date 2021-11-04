//See https://react.i18next.com/ 
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import lang from './locales';
import { Http } from "../Http";

export enum Languages {
  ES = "es",
  EN = "en",
  default = "en"
}

let resources: any = {};

for (let name in lang) {
  if (lang.hasOwnProperty(name)) {
    resources[name] = { translation: Reflect.get(lang, name) };
  }
}

export const availableLanguages = Object.keys(resources);
export const languageFromStorage = localStorage.getItem('i18nextLng');

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: languageFromStorage || Languages.default,
    fallbackLng: Languages.default, // use en if detected lng is not available
    //keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });


Http.setDefaultHeader('Content-Language', languageFromStorage || Languages.default);
// Retrieve current language
export const currentLanguage = () => i18n.language;
// Change language
export const changeLanguage = (lng: Languages) => {
  i18n.changeLanguage(lng);
  window.location.reload();
};
// Retrieve key value according to current language
export const t = (key: string, options?: any) => i18n.t(key, options);

export default i18n;