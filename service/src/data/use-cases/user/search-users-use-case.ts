import { SearchUsersRepository } from "@domain/repositories/index.js";
import { SearchUsers } from "@domain/use-cases/index.js";

export class SearchUsersUseCase implements SearchUsers{
    constructor(
        private readonly searchUserRepository: SearchUsersRepository
    ){}
    async search(params: SearchUsers.Params): Promise<SearchUsers.Result> {
        return await this.searchUserRepository.search(params);
    }

}