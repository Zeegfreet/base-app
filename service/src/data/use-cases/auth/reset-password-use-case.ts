import { Hasher } from "@domain/cryptography/hasher.js";
import { BadTokenError, UserBlockedError, UserDisabledError } from "@domain/errors/index.js";
import { ConsumeRetrievePasswordTokenRepository, FindUserByIdRepository, RevokeAllSessionsByUserRepository, UpdateUserRepository } from "@domain/repositories/index.js";
import { AuthService } from "@domain/services/index.js";
import { ResetPassword } from "@domain/use-cases/index.js";

export class ResetPasswordUseCase implements ResetPassword{
    constructor(
        private readonly hasher: Hasher,
        private readonly simpleHasher: Hasher,
        private readonly consumeRetrievePasswordTokenRepository: ConsumeRetrievePasswordTokenRepository,
        private readonly findUserByIdRepository: FindUserByIdRepository,
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly revokeAllSessionsByUserRepository: RevokeAllSessionsByUserRepository,
        private readonly authService: AuthService
    ){}
    async reset(params: ResetPassword.Params): Promise<ResetPassword.Result> {
        const { token, password } = params;

        const hashedToken = await this.simpleHasher.hash(token);
        const userId = await this.consumeRetrievePasswordTokenRepository.consume(hashedToken);
        
        if(!userId){
            throw new BadTokenError();
        }

        const hashedPassword = await this.hasher.hash(password);
        const user = await this.findUserByIdRepository.findById(userId);

        if(!user){
            throw new BadTokenError();
        }
        if(!user.isActive){
            throw new UserDisabledError();
        }
        if(user.isBlocked){
            throw new UserBlockedError();
        }

        const payload: UpdateUserRepository.UserData = { password: hashedPassword };

        if(!user.verifiedAt){
            payload.verifiedAt = new Date();
        }

        await this.updateUserRepository.update(user.id, payload);
        await this.revokeAllSessionsByUserRepository.revoke(user.id);

        return this.authService.authorize(user.id);
    }

}