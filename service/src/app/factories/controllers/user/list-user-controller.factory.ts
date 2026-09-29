import { ListUsersUseCase } from "@data/use-cases/index.js";
import { TypeOrmListUserRepository } from "@infra/db/repositories/index.js";
import { ListUsersController } from "@presentation/controllers/index.js";

export const listUserControllerFactory = () => {
    const listUsersRepository = new TypeOrmListUserRepository();
    const listUsersUseCase = new ListUsersUseCase(listUsersRepository);
    return new ListUsersController(
        listUsersUseCase
    );
};