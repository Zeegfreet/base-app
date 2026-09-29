import path from "node:path";

import type { DataSourceOptions } from "typeorm";

const __dirname = import.meta.dirname;

export const dbConfig = (): DataSourceOptions => {
    const isTest = process.env.NODE_ENV === "test";
    const isProd = process.env.NODE_ENV === "production";

    if (isTest) {
        return {
            type: "postgres",
            host: process.env.DB_TEST_HOST || "localhost",
            port: Number(process.env.DB_TEST_PORT) || 5432,
            username: process.env.DB_TEST_USERNAME || "admin",
            password: process.env.DB_TEST_PASSWORD || "dbpassword",
            database: process.env.DB_TEST_NAME || "appdb_test",
            logging: true,
            synchronize: true,
            dropSchema: true,
            entities: [path.join(__dirname, "..", "entities", "**", "*{.entity.js,.entity.ts}")],
            subscribers: [path.join(__dirname, "..", "subscribers", "**", "*{.js,.ts}")],
            migrations: [path.join(__dirname, "..", "migrations", "**", "*{.js,.ts}")],
        };
    }

    return {
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || "admin",
        password: process.env.DB_PASSWORD || "dbpassword",
        database: process.env.DB_NAME || "appdb_test",
        logging: false,
        synchronize: !isProd,
        entities: [path.join(__dirname, "..", "entities", "**", "*{.entity.js,.entity.ts}")],
        subscribers: [path.join(__dirname, "..", "subscribers", "**", "*{.js,.ts}")],
        migrations: [path.join(__dirname, "..", "migrations", "**", "*{.js,.ts}")],
    };
};