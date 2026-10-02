import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { signUpSchema, type SignUpSchemaType } from "./sign-up-schema"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"


export const SignUpForm: React.FC = () => {
    const { t } = useTranslation()
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
                <CardTitle>{t("welcome")}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-3 flex-col">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Name</FieldLabel>
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
                                <FieldLabel>Username</FieldLabel>
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
                                <FieldLabel>E-mail</FieldLabel>
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
                                <FieldLabel>Password</FieldLabel>
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
                                <FieldLabel>Password Confirm</FieldLabel>
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
                                <FieldLabel>Document</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    type="text"
                                />
                                <FieldDescription>CNPJ da sua empresa sem máscara</FieldDescription>
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="button" onClick={() => form.reset()}>Limpar</Button>
            </CardFooter>
        </Card>
    )
}