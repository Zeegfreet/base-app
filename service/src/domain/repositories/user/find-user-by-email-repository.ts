import { User } from "@domain/entities/index.js";

export interface FindUserByEmailRepository {
    findByEmail(email: FindUserByEmailRepository.Email): Promise<FindUserByEmailRepository.Result | null>
}

export namespace FindUserByEmailRepository {
    export type Email = string

    export type Result = Omit<User, "password" | "deletedAt">
}