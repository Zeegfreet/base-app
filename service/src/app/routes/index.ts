import { expressMiddlewareAdapter } from "@app/adapters/index.js";
import { sessionValidatorFactory } from "@app/factories/validators/index.js";
import type { Express } from "express";

import { createAuthRoutes } from "./auth-routes.js";
import { createHealthCheckroutes } from "./health-check.js";
import { createUserRoutes } from "./user-routes.js";

export const appRouter = (app: Express) => {
    app.use("/pub",
        createHealthCheckroutes(),
        createAuthRoutes()
    );
    app.use("/priv",
        expressMiddlewareAdapter(sessionValidatorFactory()),
        createUserRoutes()
    );
};