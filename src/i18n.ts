import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { NODE_ENV } from './Constants';

const isDevelopment = process.env.NODE_ENV === NODE_ENV.DEVELOPMENT;

i18n
  // load translation using http
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: isDevelopment && false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
