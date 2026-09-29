import { RedisOptions } from "ioredis";

export const redisConfig = (): RedisOptions => {
    const isTest = process.env.NODE_ENV === "test";
    // const isProd = process.env.NODE_ENV === "production";

    if(isTest){
        return {
            host: process.env.REDIS_TEST_HOST || "localhost",
            port: Number(process.env.REDIS_TEST_PORT) || 6379,
            username: process.env.REDIS_TEST_USERNAME || undefined,
            password: process.env.REDIS_TEST_PASSWORD || undefined,
            db: Number(process.env.REDIS_TEST_DB) || 1
        };
    }

    return {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        username: process.env.REDIS_USERNAME || undefined,
        password: process.env.REDIS_PASSWORD || undefined,
        db: Number(process.env.REDIS_DB) || 0
    };
};