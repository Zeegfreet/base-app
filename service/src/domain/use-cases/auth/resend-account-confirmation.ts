
export interface ResendAccountConfirmation {
    resend(params: ResendAccountConfirmation.Params): Promise<void>
}

export namespace ResendAccountConfirmation {
    export type Params = {
        email: string
        username: string
    }
}