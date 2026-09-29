import { DeleteUserUseCase } from "@data/use-cases/index.js";
import { TypeOrmDeleteUserRepository, TypeOrmFindUsrByIdRepository } from "@infra/db/repositories/index.js";
import { DeleteUserController } from "@presentation/controllers/index.js";

export const deleteUserControllerFactory = () => {
    const deleteUserRepository = new TypeOrmDeleteUserRepository();
    const findUserByIdrepository = new TypeOrmFindUsrByIdRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository, findUserByIdrepository);
    return new DeleteUserController(deleteUserUseCase);
};