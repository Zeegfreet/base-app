import { userSchema } from "./add-user-schema.js";

export const updateUserSchema = userSchema
    .partial()
    .refine((data) => {
        if(data.password){
            return data.password === data.confirmPassword;
        }
        return true;
    }, {
        message: "Passwords don't matches.",
        path: ["confirmPassword"]
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "Empty body for this request"
    })
    .transform(({ confirmPassword: _, ...other }) => other);