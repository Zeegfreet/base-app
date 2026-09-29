import { Controller } from "@app/protocols/index.js";
import type { NextFunction,Request, Response } from "express";

export const expressControllerAdapter = (controller: Controller) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: Controller.Request = {
            body: req.body,
            headers: req.headers,
            params: req.params,
            query: req.query,
            cookies: req.cookies
        };

        try {
            const { statusCode, ...response } = await controller.handle(httpRequest);

            return res.status(statusCode).json(response.body);
            
        } catch (error: unknown) {
            return next(error);
        }
        
    };