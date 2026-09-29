import { User } from "@domain/entities/index.js";

export interface ListUsersRepository {
    list(): Promise<ListUsersRepository.Result[]>
}

export namespace ListUsersRepository {
    export type Result = Omit<User, "password" | "deletedAt">
}