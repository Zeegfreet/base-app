import { AuthService } from "@domain/services/index.js";

export interface RefreshSession {
    refresh(params: RefreshSession.Params): Promise<RefreshSession.Result>
}

export namespace RefreshSession {
    export type Params = {
        token: string
    }
    export type Result = AuthService.Result
}