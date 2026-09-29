import { UpdateUserUseCase } from "@data/use-cases/index.js";
import { BcryptAdapter } from "@infra/cryptography/index.js";
import { TypeOrmFindUsrByIdRepository, TypeOrmUpdateUserRepository } from "@infra/db/repositories/index.js";
import { UpdateuserController } from "@presentation/controllers/index.js";

export const updateUserControllerFactory = () => {

    const updateUserRepository = new TypeOrmUpdateUserRepository();
    const findUserByIdRepository = new TypeOrmFindUsrByIdRepository();
    const hasher = new BcryptAdapter(2);
    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        findUserByIdRepository,
        hasher
    );
    return new UpdateuserController(updateUserUseCase);
};