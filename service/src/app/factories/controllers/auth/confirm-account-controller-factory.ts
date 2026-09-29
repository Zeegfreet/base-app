import { authServiceFactory } from "@app/factories/services/index.js";
import { ConfirmAccountUseCase } from "@data/use-cases/index.js";
import { RedisConfirmationTokenRepository } from "@infra/cache/repositories/index.js";
import { CryptoHasherAdapter } from "@infra/cryptography/index.js";
import { TypeOrmUpdateUserRepository } from "@infra/db/repositories/index.js";
import { ConfirmAccountController } from "@presentation/controllers/index.js";

export const confirmAccountControllerFactory = () => {
    const authService = authServiceFactory();
    const consumeConfirmationTokenRepository = new RedisConfirmationTokenRepository();
    const simpleHasher = new CryptoHasherAdapter();
    const updateUserRepository = new TypeOrmUpdateUserRepository();
    const confirmAccountUseCase = new ConfirmAccountUseCase(consumeConfirmationTokenRepository,authService, updateUserRepository, simpleHasher);
    return new ConfirmAccountController(confirmAccountUseCase);
};