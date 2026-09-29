import { SearchUsersUseCase } from "@data/use-cases/index.js";
import { TypeOrmSearchUsersRepository } from "@infra/db/repositories/index.js";
import { SearchUsersController } from "@presentation/controllers/index.js";

export const searchUsersControllerFactory = () => {

    const searchUsersRepository = new TypeOrmSearchUsersRepository();
    const searchUsersUseCase = new SearchUsersUseCase(searchUsersRepository);
    return new SearchUsersController(searchUsersUseCase);
};