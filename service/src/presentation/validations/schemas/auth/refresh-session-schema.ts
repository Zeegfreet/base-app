import z from "zod/v3";

export const refreshSessionSchema = z.object({
    token: z.string()
});