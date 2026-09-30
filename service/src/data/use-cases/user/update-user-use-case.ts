import { Hasher } from "@domain/cryptography/index.js";
import { NotFoundError } from "@domain/errors/index.js";
import { FindUserByIdRepository, UpdateUserRepository } from "@domain/repositories/index.js";
import { UpdateUser } from "@domain/use-cases/index.js";

export class UpdateUserUseCase implements UpdateUser{
    constructor(
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly findUserByIdRepository: FindUserByIdRepository,
        private readonly hasher: Hasher
    ){}
    async update(id: UpdateUser.Id, data: UpdateUser.UserData): Promise<UpdateUser.Result> {
        const existsUser = await this.findUserByIdRepository.findById(id);
        if(!existsUser){
            throw new NotFoundError(`User not found with id ${id}.`);
        }
        if(data.password){
            data.password = await this.hasher.hash(data.password);
        }
        const updatedUser = await this.updateUserRepository.update(id, data);
        return updatedUser;
    }

}