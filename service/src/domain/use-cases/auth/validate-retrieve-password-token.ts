
export interface ValidateRetrievePasswordToken {
    validate(token: ValidateRetrievePasswordToken.Token): Promise<boolean>
}

export namespace ValidateRetrievePasswordToken {
    export type Token = string
}