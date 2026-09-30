import { Hasher } from "@domain/cryptography/index.js";
import { UsernameAlreadyExists } from "@domain/errors/username-already-exists-error.js";
import { AddUserRepository, FindUserByUsernameRepository } from "@domain/repositories/index.js";
import { AddUser } from "@domain/use-cases/index.js";

export class AddUserUseCase implements AddUser {
    constructor(
        private readonly addUserRepository: AddUserRepository,
        private readonly findUserByUsernameRepository: FindUserByUsernameRepository,
        private readonly hasher: Hasher
    ){}
    async add(user: AddUser.Params): Promise<AddUser.Result> {
        const existsUser = await this.findUserByUsernameRepository.findByUsername(user.username);

        if(existsUser) {
            throw new UsernameAlreadyExists();
        }

        user.password = await this.hasher.hash(user.password);

        const createdUser = await this.addUserRepository.add(user);

        return createdUser;
    }

}