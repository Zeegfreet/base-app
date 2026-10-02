import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from "./en-US/common.json"
import ptCommon from "./pt-BR/common.json"
import LanguageDetector from "i18next-browser-languagedetector"

export const defaultNS = 'common';
export const resources = {
    en: {
        common: enCommon
    },
    "pt-BR": {
        common: ptCommon
    }
}

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        defaultNS,
        fallbackLng: "pt-BR",
        interpolation: { escapeValue: false }
    })

export default i18next