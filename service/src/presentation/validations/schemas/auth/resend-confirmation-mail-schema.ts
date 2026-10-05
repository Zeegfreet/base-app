import z from "zod";

export const resendConfirmationMailSchema = z.object({
    username: z.string(),
    email: z.email()
});