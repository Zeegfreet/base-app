import { ListUsersRepository } from "@domain/repositories/index.js";
import { ListUsers } from "@domain/use-cases/index.js";

export class ListUsersUseCase implements ListUsers {
    constructor(
        private readonly listUsersRepository: ListUsersRepository
    ){}
    async list(): Promise<ListUsers.Result[]> {
        const users = this.listUsersRepository.list();
        
        return users;
    }

}