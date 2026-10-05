import type { SignUpSchemaType } from "@/components/organisms/forms/signup/sign-up-schema"
import { http } from "./http"
import type { SignInSchemaType } from "@/components/organisms/forms/signin/signin-schema"
import type { ResendConfirmationSchemaType } from "@/components/organisms/forms/resend-confirmation-form/schema"


export const authService =  {
    signUp: async (data: SignUpSchemaType) => {
        const response = await http.post('/pub/register', data)

        return response.data
    },
    signIn: async(data: SignInSchemaType) => {
        const response = await http.post('/pub/signin', data)
        return response.data
    },
    resendConfirmation: async (data: ResendConfirmationSchemaType) => {
        const response = await http.post('/pub/confirm/resend', data)
        return response.data
    }
}