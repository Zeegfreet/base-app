import "i18next";
import { defaultNS } from "@/i18n";
import { resources } from "@/i18n/resources"

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: (typeof resources)["pt-BR"];
    }
}