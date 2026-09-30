import { Decrypter } from "@domain/cryptography/decrypter.js";
import { AuthSession } from "@domain/entities/index.js";
import { BadTokenError, SessionExpiredError } from "@domain/errors/index.js";
import { GetAllowedSessionRepository } from "@domain/repositories/index.js";
import { ValidateSession } from "@domain/use-cases/index.js";

export class ValidateSessionUseCase implements ValidateSession {
    constructor(
        private readonly decrypter: Decrypter<AuthSession>,
        private readonly getAllowedSessionRepository: GetAllowedSessionRepository
    ){}
    async validate(token: ValidateSession.Token): Promise<ValidateSession.Result> {
        const result = await this.decrypter.decrypt(token);

        if(!result.success){
            if(result.reason === "EXPIRED"){
                throw new SessionExpiredError();
            } else {
                throw new BadTokenError();
            }
        }

        const { payload } = result;

        const allowedSession = await this.getAllowedSessionRepository.get(payload.sessionId);
        
        if(!allowedSession){
            throw new BadTokenError();
        }

        return payload;

    }

}
