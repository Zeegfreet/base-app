import { Decrypter } from "@domain/cryptography/index.js";
import { RefreshData } from "@domain/entities/index.js";
import { BadTokenError, RevokedTokenError, SessionExpiredError } from "@domain/errors/index.js";
import { GetAllowedSessionRepository, SaveRevokedTokenRepository } from "@domain/repositories/index.js";
import { AuthService } from "@domain/services/index.js";
import { RefreshSession } from "@domain/use-cases/index.js";

export class RefreshSessionUseCase implements RefreshSession {
    constructor(
        private readonly decrypter: Decrypter<RefreshData>,
        private readonly getAllowedSessionRepository: GetAllowedSessionRepository,
        private readonly saveRevokedTokenRepository: SaveRevokedTokenRepository,
        private readonly authService: AuthService,
    ){}
    async refresh(params: RefreshSession.Params): Promise<RefreshSession.Result> {
        // pega o token
        const result = await this.decrypter.decrypt(params.token);
        // decifra o token
        if (!result.success){
            if(result.reason === "EXPIRED"){
                throw new SessionExpiredError();
            }
            throw new BadTokenError();
        }

        const { payload } = result;

        const userId = await this.getAllowedSessionRepository.get(payload.sid);

        if(!userId){
            throw new BadTokenError();
        }

        // segundos restantes até a expiração do token (mínimo 1, exigido pelo EX do redis)
        const ttl = Math.ceil((payload.expiresAt.getTime() - Date.now()) / 1000);

        // revoga antes de autorizar: se já estava revogado, o token foi reutilizado
        const revoked = await this.saveRevokedTokenRepository.save({
            jti: payload.jti,
            userId,
            ttl: Math.max(ttl, 1)
        });

        if(!revoked){
            throw new RevokedTokenError();
        }

        return this.authService.authorize(userId, payload.sid);
    }

}
