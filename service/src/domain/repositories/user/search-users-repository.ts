import { User } from "@domain/entities/index.js";
import { SearchParams, SearchResult } from "@domain/protocols/index.js";

export interface SearchUsersRepository {
    search(params: SearchUsersRepository.Params): Promise<SearchUsersRepository.Result>
}

export namespace SearchUsersRepository {
    export type Model = Omit<User, "password" | "deletedAt">
    export type Params = SearchParams<Model>
    export type Result = SearchResult<Model>
}