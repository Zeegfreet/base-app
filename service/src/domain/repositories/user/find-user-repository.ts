import { User } from "@domain/entities/user.js";

export interface FindUserByUsernameAndEmailRepository {
    findByParams(params: FindUserByUsernameAndEmailRepository.Params): Promise<FindUserByUsernameAndEmailRepository.Result | null>
}

export namespace FindUserByUsernameAndEmailRepository {
    export type Params = {
        username: string,
        email: string
    }
    export type Result = User
}