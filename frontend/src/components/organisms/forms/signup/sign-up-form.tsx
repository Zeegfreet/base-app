import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { signUpSchema, type SignUpSchemaType } from "./sign-up-schema"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export const SignUpForm: React.FC = () => {
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
    })

    const handleSubmit = (data: SignUpSchemaType) => {
        console.log(data)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome</CardTitle>
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
                                    type="password"
                                />
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </CardContent>
        </Card>
    )
}