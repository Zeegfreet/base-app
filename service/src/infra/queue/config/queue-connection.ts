import { redisConfig } from "@infra/cache/config/redis-config.js";
import { ConnectionOptions } from "bullmq";

export const queueConnection = (): ConnectionOptions => {
    const { host, port, username, password, db } = redisConfig();

    return {
        host,
        port,
        username,
        password,
        db,
        maxRetriesPerRequest: null
    };
};