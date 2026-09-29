import { HttpRequest } from "@app/protocols/index.js";
import { Middleware } from "@app/protocols/middleware.js";
import { NextFunction, Request, Response } from "express";

export const expressMiddlewareAdapter = (middleware: Middleware) =>
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const httpRequest: HttpRequest = {
                body: req.body,
                headers: req.headers,
                params: req.params,
                query: req.query,
                cookies: req.cookies
            };

            const result = await middleware.handle(httpRequest);

            if (!result.isSuccess) {
                return next(result.error);
            }

            if (result.data) {
                // Express 5 exposes req.query as a getter-only property, so Object.assign fails
                for (const [key, value] of Object.entries(result.data)) {
                    Object.defineProperty(req, key, { value, writable: true, enumerable: true, configurable: true });
                }
            }

            return next();
        } catch (error) {
            next(error);
        }
        
    };
