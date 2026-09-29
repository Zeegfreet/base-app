import { GetAllowedSessionRepository, RevokeAllSessionsByUserRepository, SaveAllowedSessionRepository } from "@domain/repositories/index.js";
import { RedisConnection } from "@infra/cache/config/redis-connection.js";
import { cacheKeys } from "@infra/cache/keys/cache-keys.js";

export class RedisAllowedSessionsRepository implements SaveAllowedSessionRepository, GetAllowedSessionRepository, RevokeAllSessionsByUserRepository {

    private get client(){
        return RedisConnection
            .getInstance()
            .getClient();
    }

    async save(params: SaveAllowedSessionRepository.Params): Promise<void> {
        const sessionKey = cacheKeys.allowedSessionsBySession(params.sessionId);
        const userKey = cacheKeys.allowedSessionsByUser(params.userId);

        await this.client
            .multi()
            .set(sessionKey, params.userId, "EX", params.ttl)
            .sadd(userKey, params.sessionId)
            .expire(userKey, params.ttl)
            .exec();
    }

    async get(sessionId: GetAllowedSessionRepository.SessionId): Promise<GetAllowedSessionRepository.UserId | null> {
        const key = cacheKeys.allowedSessionsBySession(sessionId);
        const userId = await this.client.get(key);
        return Number(userId) || null;
    }

    async revoke(userId: RevokeAllSessionsByUserRepository.UserId): Promise<void> {
        const userKey = cacheKeys.allowedSessionsByUser(userId);
        const sessionIds = await this.client.smembers(userKey);

        const transaction = this.client.multi();
        for(const sessionId of sessionIds){
            transaction.del(cacheKeys.allowedSessionsBySession(sessionId));
        }
        transaction.del(userKey);
        await transaction.exec();
    }

}
