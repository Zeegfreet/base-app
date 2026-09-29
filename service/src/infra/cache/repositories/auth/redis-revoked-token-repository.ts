import { GetRevokedTokenRepository, SaveRevokedTokenRepository } from "@domain/repositories/index.js";
import { RedisConnection } from "@infra/cache/config/redis-connection.js";
import { cacheKeys } from "@infra/cache/keys/cache-keys.js";

export class RedisRevokedTokenRepository implements SaveRevokedTokenRepository, GetRevokedTokenRepository {
    
    private get client(){
        return RedisConnection
            .getInstance()
            .getClient();
    }

    async save(params: SaveRevokedTokenRepository.Params): Promise<boolean> {
        const key = cacheKeys.revokedToken(params.jti);
        const result = await this.client.set(key, params.userId, "EX", params.ttl, "NX");
        return result === "OK";
    }

    async get(jti: GetRevokedTokenRepository.Jti): Promise<GetRevokedTokenRepository.UserId | null> {
        const key = cacheKeys.revokedToken(jti);
        const userId = await this.client.get(key);
        return Number(userId) || null;
    }

}