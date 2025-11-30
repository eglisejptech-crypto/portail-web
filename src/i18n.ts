import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && ['en', 'fr'].includes(storedLanguage)) {
        return storedLanguage;
    }
    const browserLanguage = navigator.language.split('-')[0];
    return ['en', 'fr'].includes(browserLanguage) ? browserLanguage : 'en';
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation
            },
            fr: {
                translation: frTranslation
            }
        },
        lng: getInitialLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;
