import ptCommon from "./pt-BR/common.json"
import enCommon from "./en-US/common.json"
import ptValidation from "./pt-BR/validation.json"
import enValidation from "./en-US/validation.json"
import ptAuth from "./pt-BR/auth.json"
import enAuth from "./en-US/auth.json"


export const resources = {
    "pt-BR": {
        common: ptCommon,
        validation: ptValidation,
        auth: ptAuth
    },
    en: {
        common: enCommon,
        validation: enValidation,
        auth: enAuth
    },
} as const
