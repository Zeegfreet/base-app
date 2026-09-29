import { AuthUser } from "@domain/entities/index.js";

export interface AuthService {
    authorize(userId: AuthService.UserId, sessionId?: AuthService.SessionId): Promise<AuthService.Result>
}

export namespace AuthService {
    export type UserId = number
    export type SessionId = string
    export type Result = {
        user: AuthUser,
        accessToken: string,
        refreshToken: string
    }
}