import { queueSendMailFactory } from "@app/factories/mailer/queue-send-mail-factory.js";
import { RetrievePasswordUseCase } from "@data/use-cases/index.js";
import { RedisRetrievePasswordRepository } from "@infra/cache/repositories/index.js";
import { CryptoHasherAdapter, CryptoTokenGeneratorAdapter } from "@infra/cryptography/index.js";
import { TypeOrmFindUserByUsernameRepository } from "@infra/db/repositories/index.js";
import { RetrievePasswordMailerService } from "@infra/services/index.js";
import { RetrievePasswordController } from "@presentation/controllers/index.js";

export const retrievePasswordControllerFactory = () => {
    const findUserByUsernameRepository = new TypeOrmFindUserByUsernameRepository();
    const tokenGenerator = new CryptoTokenGeneratorAdapter();
    const saveRetrievePasswordTokenRepository = new RedisRetrievePasswordRepository();
    const simpleHasher = new CryptoHasherAdapter();
    const mailer = queueSendMailFactory();
    const mailerSendRetrievePassword = new RetrievePasswordMailerService(mailer,
        process.env.DNS || "http://localhost:8090"
    );
    const retrievePasswordUseCase = new RetrievePasswordUseCase(
        findUserByUsernameRepository,
        tokenGenerator,
        saveRetrievePasswordTokenRepository,
        simpleHasher,
        mailerSendRetrievePassword,
        (60*60)
    );
    return new RetrievePasswordController(retrievePasswordUseCase);
};