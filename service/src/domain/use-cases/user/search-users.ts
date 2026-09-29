import { User } from "@domain/entities/index.js";
import { SearchParams, SearchResult } from "@domain/protocols/index.js";

export interface SearchUsers {
    search(params: SearchUsers.Params): Promise<SearchUsers.Result>
}

export namespace SearchUsers {
    export type Model = Omit<User, "password" | "deletedAt">
    export type Params = SearchParams<Model>
    export type Result = SearchResult<Model>
}