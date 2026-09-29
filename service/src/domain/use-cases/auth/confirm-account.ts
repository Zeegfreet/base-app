import { AuthService } from "@domain/services/index.js";

export interface ConfirmAccount {
    confirm(token: ConfirmAccount.Token): Promise<ConfirmAccount.Result>
}

export namespace ConfirmAccount {
    export type Token = string
    export type Result = AuthService.Result
}