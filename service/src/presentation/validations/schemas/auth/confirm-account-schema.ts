import z from "zod/v3";

export const confirmAccountSchema = z.object({
    token: z.string()
});