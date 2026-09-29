import { expressControllerAdapter, expressMiddlewareAdapter } from "@app/adapters/index.js";
import { addUserControllerFactory, deleteUserControllerFactory, findUserControllerFactory, searchUsersControllerFactory, updateUserControllerFactory } from "@app/factories/controllers/index.js";
import { addUserValidatorFactory, searchUserValidatorFactory, updateUserValidatorFactory } from "@app/factories/validators/index.js";
import { Router } from "express";

export const createUserRoutes = () => {
    const router = Router();
    
    router
        .post("/user", expressMiddlewareAdapter(addUserValidatorFactory()), expressControllerAdapter(addUserControllerFactory()))
        .get("/user",expressMiddlewareAdapter(searchUserValidatorFactory()),  expressControllerAdapter(searchUsersControllerFactory()))
        .get("/user/:id", expressControllerAdapter(findUserControllerFactory()))
        .patch("/user/:id", expressMiddlewareAdapter(updateUserValidatorFactory()), expressControllerAdapter(updateUserControllerFactory()))
        .delete("/user/:id", expressControllerAdapter(deleteUserControllerFactory()));
    
    return router;
};