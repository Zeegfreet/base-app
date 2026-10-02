import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTranslation } from "react-i18next"

export const LangSelect: React.FC = () => {
    const { t, i18n } = useTranslation()
    const items = [
        { label: t("language.pt-BR"), value: "pt-BR" },
        { label: t("language.en"), value: "en" },
    ]

    return (
        <Select
            items={items}
            value={i18n.resolvedLanguage}
            onValueChange={(value) => i18n.changeLanguage(value as string)}
        >
            <SelectTrigger className={"w-30"} >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t("language.language")}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}