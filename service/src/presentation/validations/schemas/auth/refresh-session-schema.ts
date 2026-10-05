import z from "zod";

export const refreshSessionSchema = z.object({
    token: z.string()
});