import { User } from "@domain/entities/index.js";

export interface FindUserByUsernameRepository {
    findByUsername(username: FindUserByUsernameRepository.Username): Promise<FindUserByUsernameRepository.Result | null>
}

export namespace FindUserByUsernameRepository {
    export type Username = string

    export type Result = User
}