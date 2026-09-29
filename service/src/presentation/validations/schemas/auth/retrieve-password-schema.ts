import z from "zod/v3";

export const retrievePasswordSchema = z.object({
    username: z.string(),
    email: z.string().email()
});