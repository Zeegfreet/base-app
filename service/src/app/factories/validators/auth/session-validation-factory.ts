import { joseAccessFactory } from "@app/factories/cryptography/index.js";
import { ValidateSessionUseCase } from "@data/use-cases/index.js";
import { RedisAllowedSessionsRepository } from "@infra/cache/repositories/index.js";
import { authSessionSchema, ZodPayloadDecrypterDecorator } from "@infra/cryptography/index.js";
import { SessionValidationMiddleware } from "@presentation/middlewares/index.js";

export const sessionValidatorFactory = () => {
    const decrypter = new ZodPayloadDecrypterDecorator(
        joseAccessFactory(),
        authSessionSchema
    );
    const allowedSessionRepository = new RedisAllowedSessionsRepository();
    const validateSessionUseCase = new ValidateSessionUseCase(
        decrypter,
        allowedSessionRepository
    );
    return new SessionValidationMiddleware(
        validateSessionUseCase
    );
};