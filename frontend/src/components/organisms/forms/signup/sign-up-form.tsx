import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { signUpSchema, type SignUpSchemaType } from "./sign-up-schema"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const SignUpForm: React.FC = () => {
    const { t } = useTranslation(["auth", "common"])
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            document: ''
        }
    })

    const handleSubmit = (data: SignUpSchemaType) => {
        console.log(data)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("titles.SignUp")}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-3 flex-col">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>{t("data.name")}</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>{t("data.username")}</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>{t("data.email")}</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>{t("data.password")}</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    type="password"
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Controller
                        name="passwordConfirm"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>{t("data.pssword-confirm")}</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    type="password"
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Controller
                        name="document"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>
                                    {t("data.document")}
                                    <Tooltip>
                                        <TooltipTrigger><HelpCircle size={15} /></TooltipTrigger>
                                        <TooltipContent>{t("help.document")}</TooltipContent>
                                    </Tooltip>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    type="text"
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Button type="submit">{t("common:actions.submit")}</Button>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="button" onClick={() => form.reset()}>{t("common:actions.clear")}</Button>
            </CardFooter>
        </Card>
    )
}