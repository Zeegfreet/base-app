import { passwordHasherFactory } from "@app/factories/cryptography/index.js";
import { authServiceFactory } from "@app/factories/services/index.js";
import { ResetPasswordUseCase } from "@data/use-cases/index.js";
import { RedisAllowedSessionsRepository, RedisRetrievePasswordRepository } from "@infra/cache/repositories/index.js";
import { CryptoHasherAdapter } from "@infra/cryptography/crypto-hasher-adapter.js";
import { TypeOrmFindUsrByIdRepository, TypeOrmUpdateUserRepository } from "@infra/db/repositories/index.js";
import { ResetPasswordController } from "@presentation/controllers/index.js";

export const resetPasswordControllerFactory = () => {
    const hasher = passwordHasherFactory();
    const simpleHasher = new CryptoHasherAdapter();
    const consumeRetrievePasswordTokenRepository = new RedisRetrievePasswordRepository();
    const findUserByIdRepository = new TypeOrmFindUsrByIdRepository();
    const updateUserRepository = new TypeOrmUpdateUserRepository();
    const revokeAllSessionsByUserRepository = new RedisAllowedSessionsRepository();
    const authService = authServiceFactory();
    const resetPassword = new ResetPasswordUseCase(
        hasher,
        simpleHasher,
        consumeRetrievePasswordTokenRepository,
        findUserByIdRepository,
        updateUserRepository,
        revokeAllSessionsByUserRepository,
        authService
    );
    return new ResetPasswordController(
        resetPassword
    );
};