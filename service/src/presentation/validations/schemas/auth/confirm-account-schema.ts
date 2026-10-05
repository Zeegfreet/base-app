import z from "zod";

export const confirmAccountSchema = z.object({
    token: z.string()
});