import { expressControllerAdapter } from "@app/adapters/index.js";
import { healthCheckControllerFactory } from "@app/factories/controllers/index.js";
import { Router } from "express";

export const createHealthCheckroutes = () => {

    const router = Router();
    
    router
        .get("/", expressControllerAdapter(healthCheckControllerFactory()));
    
    return router;
};