import z from "zod";


export const resendConfirmationSchema = z.object({
    username: z.string(),
    email: z.email()
})

export type ResendConfirmationSchemaType = z.infer<typeof resendConfirmationSchema>