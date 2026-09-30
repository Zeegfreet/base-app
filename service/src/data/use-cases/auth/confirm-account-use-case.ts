import { Hasher } from "@domain/cryptography/index.js";
import { ConfirmationTokenInvalid } from "@domain/errors/index.js";
import { ConsumeConfirmationTokenRepository, UpdateUserRepository } from "@domain/repositories/index.js";
import { AuthService } from "@domain/services/index.js";
import { ConfirmAccount } from "@domain/use-cases/index.js";

export class ConfirmAccountUseCase implements ConfirmAccount{
    constructor(
        private readonly consumeConfirmationTokenRepository: ConsumeConfirmationTokenRepository,
        private readonly authService: AuthService,
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly simpleHasher: Hasher
    ){}
    async confirm(token: ConfirmAccount.Token): Promise<ConfirmAccount.Result> {
        const hashedToken = await this.simpleHasher.hash(token);
        const userId = await this.consumeConfirmationTokenRepository.consume(hashedToken);
        if(!userId){
            throw new ConfirmationTokenInvalid();
        }
        const updatedUser = await this.updateUserRepository.update(userId, { verifiedAt: new Date() });
        const session = await this.authService.authorize(updatedUser.id);
        return session;
    }

}