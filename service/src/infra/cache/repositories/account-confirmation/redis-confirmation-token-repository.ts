import { ConsumeConfirmationTokenRepository, SaveConfirmationTokenRepository } from "@domain/repositories/index.js";
import { RedisConnection } from "@infra/cache/config/redis-connection.js";
import { cacheKeys } from "@infra/cache/keys/cache-keys.js";

export class RedisConfirmationTokenRepository implements SaveConfirmationTokenRepository, ConsumeConfirmationTokenRepository{
    private get client(){
        return RedisConnection
            .getInstance()
            .getClient();
    }
    async save(
        userId: SaveConfirmationTokenRepository.UserId,
        token: SaveConfirmationTokenRepository.Token,
        ttl: SaveConfirmationTokenRepository.Ttl
    ): Promise<void> {
        const userKey = cacheKeys.emailConfirmationByUser(userId);
        const tokenKey = cacheKeys.emailConfirmationByToken(token);
        const previousTokenHash = await this.client.get(userKey);
        
        const transaction = this.client.multi();
        if(previousTokenHash){
            transaction.del(cacheKeys.emailConfirmationByToken(previousTokenHash));
        }

        transaction.set(tokenKey, userId, "EX", ttl);
        transaction.set(userKey, token, "EX", ttl);
        await transaction.exec();
        
    }

    async consume(
        token: ConsumeConfirmationTokenRepository.Token
    ): Promise<ConsumeConfirmationTokenRepository.UserId | null> 
    {
        const tokenKey = cacheKeys.emailConfirmationByToken(token);
        const userId = await this.client.getdel(tokenKey);
        if(userId){
            const userKey = cacheKeys.emailConfirmationByUser(userId);
            await this.client.del(userKey);
        }
        return Number(userId) || null;
    }

}