import z from "zod/v3";

export const resendConfirmationMailSchema = z.object({
    email: z.string().email()
});