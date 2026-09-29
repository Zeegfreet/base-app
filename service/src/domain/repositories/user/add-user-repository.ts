import { User } from "@domain/entities/index.js";

export interface AddUserRepository {
    add(user: AddUserRepository.Params): Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
    export type Params = Pick<User, "name" | "email" | "username" | "password">

    export type Result = Omit<User, "password" | "deletedAt">
}