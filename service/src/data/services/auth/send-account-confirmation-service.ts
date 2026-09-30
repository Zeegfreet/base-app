import { Hasher, TokenGenerator } from "@domain/cryptography/index.js";
import { AppLogger } from "@domain/protocols/index.js";
import { SaveConfirmationTokenRepository } from "@domain/repositories/index.js";
import { MailerSendAccountConfirmation, SendAccountConfirmation } from "@domain/services/index.js";

export class SendAccountConfirmationService implements SendAccountConfirmation{
    constructor(
        private readonly tokenGenerator: TokenGenerator,
        private readonly saveConfirmationTokenRepository: SaveConfirmationTokenRepository,
        private readonly simpleHasher: Hasher,
        private readonly mailerSendAccountConfirmation: MailerSendAccountConfirmation,
        private readonly logger: AppLogger
    ){}
    
    async send(params: SendAccountConfirmation.Params): Promise<void> {
        try {
            const token = await this.tokenGenerator.generate();

            const hashedToken = await this.simpleHasher.hash(token);

            await this.saveConfirmationTokenRepository.save(params.to.userId, hashedToken, 24 * 60 * 60);

            await this.mailerSendAccountConfirmation.send({to: { 
                name: params.to.name,
                email: params.to.email
            },
            token
            });
        } catch (error) {
            this.logger.error(`Send mail failed: ${error}`);
        }

    }

}