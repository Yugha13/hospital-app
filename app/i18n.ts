import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import taTranslations from './translations/ta.json';

i18n
  .use(initReactI18next)
  .init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: enTranslations },
    ta: { translation: taTranslations }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: true }
});

export default i18n;