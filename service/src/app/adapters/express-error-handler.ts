import { errorHandler } from "@presentation/http/index.js";
import { Express, NextFunction, Request, Response } from "express";

export const expressErrorHandler = (app: Express) => {

    const handler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
        req.log.error(err);
        const { statusCode, body } = errorHandler(err);
        return res.status(statusCode).json(body);

    };

    app.use(handler);
    
};