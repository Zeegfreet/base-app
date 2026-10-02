import z from "zod";


export const signUpSchema = z.object({
    name: z.string().min(3).max(100),
    username: z.string().min(5).max(50),
    email: z.email(),
    password: z.string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .max(50, { message: "A senha deve ter no máximo 50 caracteres." })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial (ex: @, #, $, etc.)." }),
    passwordConfirm: z.string(),
    document: z.string()
})
.refine(({ password, passwordConfirm }) => password === passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Senha e confirmação devem ser iguais"
})
.refine(({ document }) => document.length == 14 || document.length == 9, {
    path: ['document'],
    message: "Documento deve ser um CNPJ válido de até 14 dígitos"
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>