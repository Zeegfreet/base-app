import z from "zod/v3";

export const validateRetrievePasswordTokenSchema = z.object({
    token: z.string().regex(/^[a-f0-9]{64}$/)
});
