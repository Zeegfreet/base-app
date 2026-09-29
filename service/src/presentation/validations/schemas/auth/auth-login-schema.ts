import z from "zod/v3";

export const authLoginSchema = z.object({
    username: z.string(),
    password: z.string()
});