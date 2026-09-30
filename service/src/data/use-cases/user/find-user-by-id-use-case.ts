import { NotFoundError } from "@domain/errors/not-found-error.js";
import { FindUserByIdRepository } from "@domain/repositories/index.js";
import { FindUserById } from "@domain/use-cases/index.js";

export class FindUserByIdUseCase implements FindUserById {
    constructor(
        private readonly findUserByIdRepository: FindUserByIdRepository
    ){}
    async findById(id: FindUserById.Id): Promise<FindUserById.Result> {
        const findedUser = await this.findUserByIdRepository.findById(id);
        if (!findedUser){
            throw new NotFoundError("User not found with provided id");
        }

        return findedUser;
    }
}