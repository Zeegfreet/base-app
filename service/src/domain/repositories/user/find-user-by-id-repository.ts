import { User } from "@domain/entities/index.js";

export interface FindUserByIdRepository {
    findById(id: FindUserByIdRepository.Id): Promise<FindUserByIdRepository.Result | null>
}

export namespace FindUserByIdRepository {
    export type Id = number
    export type Result = User
}