import { AddUserUseCase } from "@data/use-cases/index.js";
import { BcryptAdapter } from "@infra/cryptography/bcrypt-adapter.js";
import { TypeOrmAddUserRepository, TypeOrmFindUserByUsernameRepository } from "@infra/db/repositories/index.js";
import { AddUserController } from "@presentation/controllers/index.js";

export const addUserControllerFactory  = () => {
    const addUserRepository = new TypeOrmAddUserRepository();
    const findUserByUsernameRepository = new TypeOrmFindUserByUsernameRepository();
    const hasher = new BcryptAdapter(2);
    const addUserUseCase = new AddUserUseCase(addUserRepository, findUserByUsernameRepository, hasher);
    return new AddUserController(addUserUseCase);
};