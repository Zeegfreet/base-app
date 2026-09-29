import { AuthUser } from "@domain/entities/index.js";

export interface AuthLogin {
    login(data: AuthLogin.LoginData): Promise<AuthLogin.Result>
}

export namespace AuthLogin {
    export type LoginData = {
        username: string
        password: string
    }

    export type Result = {
        user: AuthUser,
        accessToken: string,
        refreshToken: string
    }
}