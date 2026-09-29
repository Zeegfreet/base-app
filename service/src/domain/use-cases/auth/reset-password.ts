import { AuthService } from "@domain/services/index.js";

export interface ResetPassword {
    reset(params: ResetPassword.Params): Promise<ResetPassword.Result>
}

export namespace ResetPassword {
    export type Params = {
        token: string,
        password: string
    }

    export type Result = AuthService.Result
}