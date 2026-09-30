import { Hasher, TokenGenerator } from "@domain/cryptography/index.js";
import { FindUserByUsernameRepository, SaveRetrievePasswordTokenRepository } from "@domain/repositories/index.js";
import { MailerSendRetrievePassword } from "@domain/services/index.js";
import { RetrievePassword } from "@domain/use-cases/index.js";

export class RetrievePasswordUseCase implements RetrievePassword{
    constructor(
        private readonly findUserByUserNameRepository: FindUserByUsernameRepository,
        private readonly tokenGenerator: TokenGenerator,
        private readonly saveRetrievePasswordTokenRepository: SaveRetrievePasswordTokenRepository,
        private readonly simpleHasher: Hasher,
        private readonly mailerSendRetrievePassword: MailerSendRetrievePassword,
        private readonly ttl: number
    ){}
    async retrieve(params: RetrievePassword.Params): Promise<void> {
        const user = await this.findUserByUserNameRepository.findByUsername(params.username);

        if(!user){
            return;
        }

        if(user.email !== params.email){
            return;
        }

        const token = await this.tokenGenerator.generate();

        const hashedToken = await this.simpleHasher.hash(token);

        await this.saveRetrievePasswordTokenRepository.save(user.id, hashedToken, this.ttl);
        
        this.mailerSendRetrievePassword.send({
            to: {
                name: user.name,
                email: user.email
            },
            token
        }).catch((err) => console.error(err));
    }

}