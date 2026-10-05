import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { signUpSchema, type SignUpSchemaType } from "./sign-up-schema"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Success } from "@/components/atoms/success"
import { Link } from "@tanstack/react-router"
import Typography from "@/components/atoms/typography"

export const SignUpForm: React.FC = () => {
    const { t } = useTranslation(["auth", "common", "errors"])
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const signUp = useMutation({
        mutationKey: ["auth", "register"],
        mutationFn: authService.signUp,
    })

    const handleSubmit = (data: SignUpSchemaType) => signUp.mutate(data)

    return (
        <Card className="min-w-sm">
            <CardHeader>
                <CardTitle>
                    <Typography.H1>{t("titles.signUp")}</Typography.H1>
                </CardTitle>
                <CardAction >
                    <Button type="button" variant="link"><Link to="/">{t("auth:titles.signIn")}</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {signUp.error && (
                    <Alert variant="destructive">
                        <AlertCircle/>
                        <AlertTitle>{t("errors.title")}</AlertTitle>
                        <AlertDescription>
                            {t(`errors:${signUp.error.code}`, { defaultValue: t("errors:UNKNOWN_ERROR") })}
                        </AlertDescription>
                    </Alert>
                )}
                {!signUp.isSuccess ? 
                 <form 
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <fieldset
                        disabled={signUp.isPending}
                        className="flex gap-3 flex-col"
                    >
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
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>{t("data.password-confirm")}</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="password"
                                    />
                                    <FieldError>{fieldState.error?.message}</FieldError>
                                </Field>
                            )}
                        />
                        <Button type="submit">{t("common:actions.submit")}</Button>
                    </fieldset>
                </form> :
                <Success 
                  title={t("signUp.success.title")}
                  message={t("signUp.success.message", signUp.data )}
                />
                }
               
            </CardContent>
        </Card>
    )
}