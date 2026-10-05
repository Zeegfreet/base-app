import i18next from "i18next";
import z from "zod";


export const signUpSchema = z.object({
    name: z.string().min(5).max(100),
    username: z.string().min(5).max(20),
    email: z.email(),
    password: z.string()
        .min(8, { error: () => i18next.t("auth:validation.password.min", { min: 8 }) })
        .max(16, { error: () => i18next.t("auth:validation.password.max", { max: 16 }) })
        .regex(/[A-Z]/, { error: () => i18next.t("auth:validation.password.uppercase") })
        .regex(/[a-z]/, { error: () => i18next.t("auth:validation.password.lowercase") })
        .regex(/[0-9]/, { error: () => i18next.t("auth:validation.password.number") })
        .regex(/[^A-Za-z0-9]/, { error: () => i18next.t("auth:validation.password.special") }),
    confirmPassword: z.string()
})
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        path: ["confirmPassword"],
        error: () => i18next.t("auth:validation.password.confirmMismatch")
    })

export type SignUpSchemaType = z.infer<typeof signUpSchema>
