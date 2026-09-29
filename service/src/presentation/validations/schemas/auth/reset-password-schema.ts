import z from "zod/v3";

export const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(5).max(16),
    confirmPassword: z.string()
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't matches.",
    path: ["confirmPassword"]
}).transform(({ confirmPassword: _, ...other }) => other);