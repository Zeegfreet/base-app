import { z } from "zod"
export const signinSchema = z.object({
    username: z.string().min(5),
    password: z.string()
})

export type SignInType = z.infer<typeof signinSchema>