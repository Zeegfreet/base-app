import z from "zod";

export const retrievePasswordSchema = z.object({
    username: z.string(),
    email: z.email()
});