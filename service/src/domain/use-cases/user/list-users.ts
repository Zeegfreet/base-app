import { User } from "@domain/entities/index.js";

export interface ListUsers {
    list(): Promise<ListUsers.Result[]>
}

export namespace ListUsers {
    export type Result = Pick<User, "id" | "name" | "username" | "email" | "isActive" | "createdAt" | "updatedAt">
}