import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector"
import * as z from "zod"
import { resources } from './resources';

export const defaultNS = 'common';

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        defaultNS,
        fallbackLng: "pt-BR",
        interpolation: { escapeValue: false }
    })


type AppLanguage = keyof typeof resources;

const zodLocales = {
    'pt-BR': z.locales.ptBR,
    en: z.locales.en,
} satisfies Record<AppLanguage, typeof z.locales.en>;

function syncZodLocale() {
    const fallbackLng = 'pt-BR'
    const lng = (i18next.resolvedLanguage ?? fallbackLng) as AppLanguage;
    z.config(zodLocales[lng]());
}

i18next.on('languageChanged', syncZodLocale)
syncZodLocale()
export default i18next