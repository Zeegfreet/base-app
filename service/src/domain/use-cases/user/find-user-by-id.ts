import { User } from "@domain/entities/index.js";

export interface FindUserById {
    findById(id: FindUserById.Id): Promise<FindUserById.Result>
}

export namespace FindUserById {
    export type Id = number
    export type Result = Omit<User, "password" | "deletedAt">
}