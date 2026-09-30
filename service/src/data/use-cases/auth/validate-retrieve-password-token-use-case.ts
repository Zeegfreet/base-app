import { Hasher } from "@domain/cryptography/index.js";
import { GetRetrievePasswordTokenRepository } from "@domain/repositories/index.js";
import { ValidateRetrievePasswordToken } from "@domain/use-cases/index.js";

export class ValidateRetrievePasswordTokenUseCase implements ValidateRetrievePasswordToken{
    constructor(
        private readonly getRetrievePasswordTokenRepository: GetRetrievePasswordTokenRepository,
        private readonly simpleHasher: Hasher
    ){}
    async validate(token: ValidateRetrievePasswordToken.Token): Promise<boolean> {
        const hashedToken = await this.simpleHasher.hash(token);
        const userId = await this.getRetrievePasswordTokenRepository.get(hashedToken);
        return !!userId;
    }

}
