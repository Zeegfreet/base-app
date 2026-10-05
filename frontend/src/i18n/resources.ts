import ptCommon from "./pt-BR/common.json"
import enCommon from "./en-US/common.json"
import ptValidation from "./pt-BR/validation.json"
import enValidation from "./en-US/validation.json"
import ptAuth from "./pt-BR/auth.json"
import enAuth from "./en-US/auth.json"
import ptErrors from "./pt-BR/errors.json"
import enErrors from "./en-US/errors.json"


export const resources = {
    "pt-BR": {
        common: ptCommon,
        validation: ptValidation,
        auth: ptAuth,
        errors: ptErrors
    },
    en: {
        common: enCommon,
        validation: enValidation,
        auth: enAuth,
        errors: enErrors
    },
} as const
