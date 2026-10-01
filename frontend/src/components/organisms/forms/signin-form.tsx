import Typography from "@/components/atoms/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { signinSchema, type SignInType } from "./signin-schema"
import { zodResolver } from "@hookform/resolvers/zod"


export const SignInForm: React.FC = () => {
    const form = useForm<SignInType>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const handleSubmit = (data: SignInType) => {
        console.log(data)
    }
    return (
        <Card className="max-w-lg">
            <CardHeader>
                <CardTitle><Typography.H1>Welcome back</Typography.H1></CardTitle>
                <CardDescription>
                    Already have an account? Signin now!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id='login-form' className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Username</FieldLabel>
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
                                <FieldLabel>Password</FieldLabel>
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

                    <Button type="submit" >Submit</Button>
                </form>

            </CardContent>
            <CardFooter className="gap-2">
                <CardDescription>New toward here? join-us!</CardDescription>
            </CardFooter>
        </Card>
    )
}