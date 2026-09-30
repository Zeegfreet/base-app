import { Encrypter, GetRandomUUID } from "@domain/cryptography/index.js";
import { AuthSession, RefreshData } from "@domain/entities/index.js";
import { NotFoundError, UserBlockedError, UserDisabledError, UserUnverifyedError } from "@domain/errors/index.js";
import { FindUserByIdRepository, SaveAllowedSessionRepository } from "@domain/repositories/index.js";
import { AuthService } from "@domain/services/index.js";

export class AuthServiceLogin implements AuthService{
    constructor(
        private readonly findUserById: FindUserByIdRepository,
        private readonly getRandomUUID: GetRandomUUID,
        private readonly accessEncrypter: Encrypter<Pick<AuthSession, "user" | "sessionId">>,
        private readonly refreshEncrypter: Encrypter<Pick<RefreshData, "user" | "sid">>,
        private readonly saveAllowedSessionRepository: SaveAllowedSessionRepository,
        private readonly sessionTtl: number
    ){}

    async authorize(userId: AuthService.UserId, sessionId?: AuthService.SessionId): Promise<AuthService.Result> {
        const user = await this.findUserById.findById(userId);
        if(!user){
            throw new NotFoundError("User not found");
        }

        if(!user.isActive){
            throw new UserDisabledError();
        }

        if(user.isBlocked){
            throw new UserBlockedError();
        }

        if(!user.verifiedAt){
            throw new UserUnverifyedError();
        }

        if (!sessionId){
            sessionId = await this.getRandomUUID.get();
        }

        const accessToken = await this.accessEncrypter.encrypt({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            sessionId
        });

        const refreshToken = await this.refreshEncrypter.encrypt({
            user: { id: user.id },
            sid: sessionId
        });

        await this.saveAllowedSessionRepository.save({
            userId: user.id,
            sessionId,
            ttl: this.sessionTtl
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        };
    }

}