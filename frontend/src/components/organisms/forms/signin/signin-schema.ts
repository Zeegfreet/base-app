import { z } from "zod"
export const signinSchema = z.object({
    username: z.string().min(5),
    password: z.string()
})

export type SignInSchemaType = z.infer<typeof signinSchema>