
export interface ResendAccountConfirmation {
    resend(email: ResendAccountConfirmation.Email): Promise<void>
}

export namespace ResendAccountConfirmation {
    export type Email = string
}