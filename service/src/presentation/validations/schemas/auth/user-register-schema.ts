import z from "zod";

export const userRegisterSchema = z.object({
    name: z.string().min(5).max(100),
    username: z.string().min(5).max(20),
    email: z.email(),
    password: z.string().min(5).max(16),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't matches.",
        path: ["confirmPassword"]
    })
    .transform(({ confirmPassword: _, ...other }) => other);