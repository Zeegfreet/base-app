import { authServiceFactory } from "@app/factories/services/index.js";
import { AuthLoginUseCase } from "@data/use-cases/index.js";
import { BcryptAdapter } from "@infra/cryptography/bcrypt-adapter.js";
import { TypeOrmFindUserByUsernameRepository } from "@infra/db/repositories/index.js";
import { AuthLoginController } from "@presentation/controllers/index.js";

export const authLoginControllerFactory = () => {
    const findUserByUsernameRepository = new TypeOrmFindUserByUsernameRepository();
    const hashComparer = new BcryptAdapter(2);
    const authService = authServiceFactory();
    const authLoginUseCase = new AuthLoginUseCase(
        findUserByUsernameRepository,
        hashComparer,
        authService
    );
    return new AuthLoginController(authLoginUseCase);
};