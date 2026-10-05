import Typography from "@/components/atoms/typography"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { signinSchema, type SignInSchemaType } from "./signin-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth-service"
import { Loader } from "@/components/atoms/loader"
import { Alert } from "@/components/molecules/alert"


export const SignInForm: React.FC = () => {
    const { t } = useTranslation(["auth", "common", "errors"])
    const form = useForm<SignInSchemaType>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const signIn = useMutation({
        mutationKey: ['auth', 'signin'],
        mutationFn: authService.signIn
    })

    const handleSubmit = async (data: SignInSchemaType) => signIn.mutate(data)

    return (
        <Loader
            isLoading={signIn.isPending}
        >
            <Card className="w-sm">
                <CardHeader>
                    <CardTitle>
                        <Typography.H1>
                            {t("titles.signIn")}
                        </Typography.H1>
                    </CardTitle>
                    <CardDescription>
                        {t("signIn.subtitle")}
                    </CardDescription>
                    <CardAction>
                        <Button type="button" variant="link"><Link to="/signup">{t("titles.signUp")}</Link></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {
                        signIn.error && ( 
                        <Alert
                            variant="error"
                            title={t("signIn.error.title")}
                            message={t(`errors:${signIn.error.code}`, { defaultValue: t("errors:UNKNOWN_ERROR") })}
                        />)
                    }
                    <form id='login-form' className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>{t("data.username")}</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="myown.username"
                                        autoComplete="off"
                                    />
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
                                        placeholder="******************"
                                        type="password"
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />

                        <Button type="submit" >{t("common:actions.submit")}</Button>
                    </form>

                </CardContent>
                {
                    (signIn.error && signIn.error.code === "USER_UNVERIFYED_ERROR") && (
                        <div className="p-2">
                            <Typography><Link to="/resend-confirmation">{t("resend-confirmation.subtitle")}</Link></Typography>
                        </div>
                    )
                }
            </Card>
        </Loader>
    )
}