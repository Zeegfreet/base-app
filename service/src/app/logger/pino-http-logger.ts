import { logger } from "@infra/logger/index.js";
import { Express } from "express";
import { pinoHttp } from "pino-http";

const loggerHttp = pinoHttp({
    logger
});

export const setupLogger = (app: Express) => {
    
    app.use(
        loggerHttp
    );
};