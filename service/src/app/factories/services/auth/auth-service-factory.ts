import { joseAccessFactory, joseRefreshFactory } from "@app/factories/cryptography/jose-factory.js";
import { AuthServiceLogin } from "@data/services/index.js";
import { RedisAllowedSessionsRepository } from "@infra/cache/repositories/index.js";
import { CryptoGetRandomUUID } from "@infra/cryptography/index.js";
import { TypeOrmFindUsrByIdRepository } from "@infra/db/repositories/index.js";

export const authServiceFactory = () => {
    const findUserByIdRepository = new TypeOrmFindUsrByIdRepository();
    const getRandomUUID = new CryptoGetRandomUUID();
    const accessEncrypter = joseAccessFactory();
    const refreshEncrypter = joseRefreshFactory();
    const saveAllowedSessoinRepository = new RedisAllowedSessionsRepository();
    
    return new AuthServiceLogin(
        findUserByIdRepository,
        getRandomUUID,
        accessEncrypter,
        refreshEncrypter,
        saveAllowedSessoinRepository,
        (60 * 60 * 2)
    );
};