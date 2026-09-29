import { sendMailFactory } from "@app/factories/mailer/send-mail-factory.js";
import { SendAccountConfirmationService } from "@data/services/index.js";
import { RedisConfirmationTokenRepository } from "@infra/cache/repositories/index.js";
import { CryptoHasherAdapter, CryptoTokenGeneratorAdapter } from "@infra/cryptography/index.js";
import { PinoLoggerAdapter } from "@infra/logger/index.js";
import { AccountConfirmationMailerService } from "@infra/services/index.js";

export const sendAccountConfirmationServiceFactory = () => {
    const tokenGenerator = new CryptoTokenGeneratorAdapter();
    const saveConfirmationTokenRepository = new RedisConfirmationTokenRepository();
    const simpleHasher = new CryptoHasherAdapter();
    const sendMail = sendMailFactory();
    const mailer = new AccountConfirmationMailerService(
        sendMail,
        process.env.DNS || "http://localhost:8090"
    );
    const logger = new PinoLoggerAdapter();
    return new SendAccountConfirmationService(
        tokenGenerator,
        saveConfirmationTokenRepository,
        simpleHasher,
        mailer,
        logger
    );
};