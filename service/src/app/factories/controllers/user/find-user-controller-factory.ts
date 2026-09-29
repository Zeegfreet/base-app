import { FindUserByIdUseCase } from "@data/use-cases/index.js";
import { TypeOrmFindUsrByIdRepository } from "@infra/db/repositories/index.js";
import { FindUserController } from "@presentation/controllers/index.js";

export const findUserControllerFactory = () => {
    
    const findUserRepository = new TypeOrmFindUsrByIdRepository();
    const findUserUseCase = new FindUserByIdUseCase(findUserRepository);
    return new FindUserController(findUserUseCase);
};