import { NotFoundError } from "@domain/errors/index.js";
import { DeleteUserRepository, FindUserByIdRepository } from "@domain/repositories/index.js";
import { DeleteUser } from "@domain/use-cases/index.js";

export class DeleteUserUseCase implements DeleteUser {
    constructor(
        private readonly deleteUserRepository: DeleteUserRepository,
        private readonly findUserByIdRepository: FindUserByIdRepository
    ){}
    async delete(id: DeleteUser.Id): Promise<void> {
        const existsUser = await this.findUserByIdRepository.findById(id);
        if(!existsUser){
            throw new NotFoundError(`User not found with id ${id}.`);
        }
        await this.deleteUserRepository.delete(id);
    }

}