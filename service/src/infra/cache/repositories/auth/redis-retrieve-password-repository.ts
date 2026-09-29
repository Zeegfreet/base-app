
import { ConsumeRetrievePasswordTokenRepository, GetRetrievePasswordTokenRepository, SaveRetrievePasswordTokenRepository } from "@domain/repositories/index.js";
import { RedisConnection } from "@infra/cache/config/redis-connection.js";
import { cacheKeys } from "@infra/cache/keys/cache-keys.js";

export class RedisRetrievePasswordRepository implements 
    SaveRetrievePasswordTokenRepository, 
    ConsumeRetrievePasswordTokenRepository,
    GetRetrievePasswordTokenRepository
{
    
    private get client(){
        return RedisConnection
            .getInstance()
            .getClient();
    }
    async save(
        userId: SaveRetrievePasswordTokenRepository.UserId,
        token: SaveRetrievePasswordTokenRepository.Token,
        ttl: SaveRetrievePasswordTokenRepository.Ttl
    ): Promise<void> {
        const userKey = cacheKeys.retrievePasswordByUser(userId);
        const tokenKey = cacheKeys.retrievePasswordByToken(token);
        const previousTokenHash = await this.client.get(userKey);
        
        const transaction = this.client.multi();
        if(previousTokenHash){
            transaction.del(cacheKeys.retrievePasswordByToken(previousTokenHash));
        }

        transaction.set(tokenKey, userId, "EX", ttl);
        transaction.set(userKey, token, "EX", ttl);
        await transaction.exec();
        
    }

    async consume(
        token: ConsumeRetrievePasswordTokenRepository.Token
    ): Promise<ConsumeRetrievePasswordTokenRepository.UserId | null> 
    {
        const tokenKey = cacheKeys.retrievePasswordByToken(token);
        const userId = await this.client.getdel(tokenKey);
        if(userId){
            const userKey = cacheKeys.retrievePasswordByUser(userId);
            await this.client.del(userKey);
        }
        return Number(userId) || null;
    }

    async get(token: GetRetrievePasswordTokenRepository.Token): Promise<GetRetrievePasswordTokenRepository.UserId | null> {
        const tokenKey = cacheKeys.retrievePasswordByToken(token);
        const userId = await this.client.get(tokenKey);

        return Number(userId) || null;
    }
}