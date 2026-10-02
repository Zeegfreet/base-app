import type { Express } from "express";
import express from "express";
import cors from "cors"
import { expressErrorHandler } from "./adapters/express-error-handler.js";
import { joseInit } from "./factories/cryptography/jose-factory.js";
import { setupLogger } from "./logger/index.js";
import { appRouter } from "./routes/index.js";

export const createApp = async (): Promise<Express> => {
    const app = express();
    app.use(cors("*"))
    await joseInit();

    app.set("query parser", "extended");
    app.use(express.json());

    setupLogger(app);
    appRouter(app);

    // The error handler must be the last initialized
    expressErrorHandler(app);

    return app;
};