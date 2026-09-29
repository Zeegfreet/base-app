import { User } from "@domain/entities/index.js";

export interface UserRegister {
    register(data: UserRegister.Params): Promise<UserRegister.Result>
}

export namespace UserRegister {
    export type Params = {
        name: string
        username: string
        email: string
        password: string
    }
    export type Result = Pick<User, "id" | "name" | "email" | "username" | "createdAt" | "updatedAt"> & { status: string }
}