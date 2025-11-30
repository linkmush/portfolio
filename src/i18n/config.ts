import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import svTranslation from './locales/sv/translation.json';
import thTranslation from './locales/th/translation.json';

export const supportedLngs: {
  [key: string]: { name: string; locale: string };
} = {
  en: { name: 'English', locale: 'en-US' },
  sv: { name: 'Svenska', locale: 'sv-SE' },
  th: { name: 'ไทย', locale: 'th-TH' },
};

const fallbackLng = 'sv';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    sv: { translation: svTranslation },
    th: { translation: thTranslation },
  },
  lng: 'sv',
  fallbackLng,
  supportedLngs: Object.keys(supportedLngs),
  debug: import.meta.env?.DEV ?? false,
  interpolation: { escapeValue: false },
});

export default i18next;
