import { ValidateRetrievePasswordTokenUseCase } from "@data/use-cases/index.js";
import { RedisRetrievePasswordRepository } from "@infra/cache/repositories/index.js";
import { CryptoHasherAdapter } from "@infra/cryptography/index.js";
import { ValidateRetrievePasswordTokenController } from "@presentation/controllers/index.js";

export const validateRetrievePasswordTokenControllerFactory = () => {
    const getRetrievePasswordTokenRepository = new RedisRetrievePasswordRepository();
    const simpleHasher = new CryptoHasherAdapter();
    const validateRetrievePasswordTokenUseCase = new ValidateRetrievePasswordTokenUseCase(
        getRetrievePasswordTokenRepository,
        simpleHasher
    );
    return new ValidateRetrievePasswordTokenController(
        validateRetrievePasswordTokenUseCase
    );
};
