import z from "zod";

export const validateRetrievePasswordTokenSchema = z.object({
    token: z.string().regex(/^[a-f0-9]{64}$/)
});
