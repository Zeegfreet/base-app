import { Loader } from "@/components/atoms/loader"
import Typography from "@/components/atoms/typography"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { resendConfirmationSchema, type ResendConfirmationSchemaType } from "./schema"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth-service"
import { Link } from "@tanstack/react-router"
import { Success } from "@/components/atoms/success"


export const ResendConfirmationForm: React.FC = () => {
    const { t } = useTranslation(["auth", "common", "errors"])
    const form = useForm<ResendConfirmationSchemaType>({
        resolver: zodResolver(resendConfirmationSchema),
        defaultValues: {
            username: '',
            email: ''
        }
    })

    const resendMail = useMutation({
        mutationKey: ['auth', 'confirmation'],
        mutationFn: authService.resendConfirmation
    })

    const handleSubmit = (data: ResendConfirmationSchemaType) => resendMail.mutate(data)

    return (
        <Loader isLoading={resendMail.isPending}>
            {
                !resendMail.isSuccess ?
                <Card className="w-sm">
                    <CardHeader>
                        <CardTitle>
                            <Typography.H1>{t("titles.resend-confirmation")}</Typography.H1>
                        </CardTitle>
                        <CardAction>
                            <Button variant="link"><Link to="/">{t("titles.signIn")}</Link></Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form 
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="flex flex-col gap-3"
                        >
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
                            <Button type="submit">{t("common:actions.submit")}</Button>
                        </form>
                    </CardContent>
                </Card>
                : <Success 
                        title={t("resend-confirmation.success.title")}
                        message={t("resend-confirmation.success.message")}
                        className=" w-sm"
                    />
            }
            
        </Loader>
    )
}