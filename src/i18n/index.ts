import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ar, tr, ur } from './translations';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en,
      ar,
      tr,
      ur
    },
    lng: localStorage.getItem('@lang') || 'ar',
    fallbackLng: 'ar',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n;
