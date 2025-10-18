import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import svTranslation from './locales/sv/translation.json';
import viTranslation from './locales/vi/translation.json';

export const supportedLngs: {
  [key: string]: { name: string; locale: string };
} = {
  en: { name: 'English', locale: 'en-US' },
  sv: { name: 'Svenska', locale: 'sv-SE' },
  vi: { name: 'Tiếng Việt', locale: 'vi-VN' },
};

const fallbackLng = 'sv';

// function detectInitialLng(): string {
//   try {
//     const stored = localStorage.getItem('i18nextLng');
//     const browser =
//       typeof navigator !== 'undefined'
//         ? navigator.language?.split('-')[0]
//         : undefined;
//     const candidate = (stored || browser || fallbackLng).toLowerCase();
//     return Object.keys(supportedLngs).includes(candidate)
//       ? candidate
//       : fallbackLng;
//   } catch {
//     return fallbackLng;
//   }
// }

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    sv: { translation: svTranslation },
    vi: { translation: viTranslation },
  },
  lng: 'sv',
  fallbackLng,
  supportedLngs: Object.keys(supportedLngs),
  debug: import.meta.env?.DEV ?? false,
  interpolation: { escapeValue: false },
});

export default i18next;
