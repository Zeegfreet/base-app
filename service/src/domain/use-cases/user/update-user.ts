import { User } from "@domain/entities/index.js";

export interface UpdateUser {
    update(id: UpdateUser.Id, data: UpdateUser.UserData): Promise<UpdateUser.Result>
}

export namespace UpdateUser {
    export type UserData = Partial<User>
    export type Id = number
    export type Result = Omit<User, "password">
}