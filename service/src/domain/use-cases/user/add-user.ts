import { User } from "@domain/entities/index.js";

export interface AddUser {
    add(user: AddUser.Params): Promise<AddUser.Result>
}

export namespace AddUser {
    export type Params = Required<Pick<User, "name" | "email" | "password" | "username">>
    export type Result = Omit<User, "password">

}