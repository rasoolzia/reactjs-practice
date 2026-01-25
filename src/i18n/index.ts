import { LANGUAGES } from '@/constants';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enAbout from './locales/en/about.json';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enDemo from './locales/en/demo.json';
import enHome from './locales/en/home.json';
import enPanel from './locales/en/panel.json';
import faAbout from './locales/fa/about.json';
import faAuth from './locales/fa/auth.json';
import faCommon from './locales/fa/common.json';
import faDemo from './locales/fa/demo.json';
import faHome from './locales/fa/home.json';
import faPanel from './locales/fa/panel.json';

const detectionOptions = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};
const directionsMap: Record<keyof typeof LANGUAGES, string> = {
  [LANGUAGES.fa]: 'rtl',
  [LANGUAGES.en]: 'ltr',
};

const applyDirection = (lng?: string) => {
  const dir = directionsMap[(lng as keyof typeof LANGUAGES) ?? LANGUAGES.en];
  document.documentElement.dir = dir;
  if (lng) {
    document.documentElement.lang = lng;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LANGUAGES.en,
    debug: false,
    detection: detectionOptions,

    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        panel: enPanel,
        home: enHome,
        about: enAbout,
        demo: enDemo,
      },
      fa: {
        common: faCommon,
        auth: faAuth,
        panel: faPanel,
        home: faHome,
        about: faAbout,
        demo: faDemo,
      },
    },

    ns: ['common', 'auth', 'panel', 'home', 'about', 'demo'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },

    initImmediate: false,
  });

i18n.on('languageChanged', (lng) => applyDirection(lng));
applyDirection(i18n.resolvedLanguage);

export default i18n;
