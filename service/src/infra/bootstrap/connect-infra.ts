import { redisConfig } from "@infra/cache/config/redis-config.js";
import { RedisConnection } from "@infra/cache/config/redis-connection.js";
import { dbConfig } from "@infra/db/config/db-config.js";
import { DbConnection } from "@infra/db/config/db-connection.js";

export const connectInfra = async () => {
    await RedisConnection
        .getInstance()
        .connect(redisConfig())
        .then(() => {
            console.warn("[SERVER]: Redis connectado");
        })
        .catch((err) => {
            console.error("[SERVER]: Failed to connect to redis server.");
            console.error(err);
            process.exit(1);
        });
    
    await DbConnection
        .getInstance()
        .connect(dbConfig())
        .then(() => {
            console.warn("[SERVER]: Banco de dados conectado com sucesso.");
           
        })
        .catch((err) => {
            console.error("[SERVER]: Failed to connect to db,");
            console.error(err);
            process.exit(1);
        });
};