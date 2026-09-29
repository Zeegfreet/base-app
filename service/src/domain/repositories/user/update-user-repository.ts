import { User } from "@domain/entities/index.js";

export interface UpdateUserRepository {
    update(id: UpdateUserRepository.Id, data: UpdateUserRepository.UserData): Promise<UpdateUserRepository.Result>
}

export namespace UpdateUserRepository {
    export type UserData = Partial<User>
    export type Id = number
    export type Result = Omit<User, "password" | "deletedAt">
}