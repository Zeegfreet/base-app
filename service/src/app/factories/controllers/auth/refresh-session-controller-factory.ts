import { joseRefreshFactory } from "@app/factories/cryptography/jose-factory.js";
import { authServiceFactory } from "@app/factories/services/index.js";
import { RefreshSessionUseCase } from "@data/use-cases/index.js";
import { RedisAllowedSessionsRepository, RedisRevokedTokenRepository } from "@infra/cache/repositories/index.js";
import { authRefreshSchema } from "@infra/cryptography/schemas/auth-refresh-schema.js";
import { ZodPayloadDecrypterDecorator } from "@infra/cryptography/zod-payload-decrypter-decorator.js";
import { RefreshSessionController } from "@presentation/controllers/index.js";

export const refreshSessionControllerFactory = () => {
    const decrypter = new ZodPayloadDecrypterDecorator(
        joseRefreshFactory(),
        authRefreshSchema
    );
    const getAllowedSession = new RedisAllowedSessionsRepository();
    const revokedToken = new RedisRevokedTokenRepository();
    const authService = authServiceFactory();
    const refreshSession = new RefreshSessionUseCase(
        decrypter,
        getAllowedSession,
        revokedToken,
        authService
    );
    return new RefreshSessionController(
        refreshSession
    );
};