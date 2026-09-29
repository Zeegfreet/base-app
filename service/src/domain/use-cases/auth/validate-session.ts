import { AuthSession } from "@domain/entities/index.js";

export interface ValidateSession {
    validate(token: ValidateSession.Token): Promise<ValidateSession.Result>
}

export namespace ValidateSession {
    export type Token = string
    export type Result = AuthSession
}