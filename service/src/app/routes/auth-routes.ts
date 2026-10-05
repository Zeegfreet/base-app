import { expressControllerAdapter, expressMiddlewareAdapter } from "@app/adapters/index.js";
import { authLoginControllerFactory, confirmAccountControllerFactory, refreshSessionControllerFactory, resendAccountConfirmationControllerFactory, resetPasswordControllerFactory, retrievePasswordControllerFactory, userRegisterControllerFactory, validateRetrievePasswordTokenControllerFactory } from "@app/factories/controllers/index.js";
import { confirmAccountValidationFactory, loginValidatorFactory, refreshSessionValidationFactory, resendConfirmationMailValidationFactory, resetPasswordValidationFactory, retrievePasswordValidationFactory, userRegisterValidatorFactory, validateRetrievePasswordTokenValidationFactory } from "@app/factories/validators/index.js";
import { Router } from "express";

export const createAuthRoutes = (): Router => {

    const router = Router();
    
    router
        .post("/register",expressMiddlewareAdapter(userRegisterValidatorFactory()),  expressControllerAdapter(userRegisterControllerFactory()))
        .post("/signin", expressMiddlewareAdapter(loginValidatorFactory()), expressControllerAdapter(authLoginControllerFactory()))
        .post("/confirm/resend", expressMiddlewareAdapter(resendConfirmationMailValidationFactory()), expressControllerAdapter(resendAccountConfirmationControllerFactory()))
        .post("/confirm", expressMiddlewareAdapter(confirmAccountValidationFactory()), expressControllerAdapter(confirmAccountControllerFactory()))
        .post("/refresh", expressMiddlewareAdapter(refreshSessionValidationFactory()), expressControllerAdapter(refreshSessionControllerFactory()))
        .post("/retrieve-password/validate", expressMiddlewareAdapter(validateRetrievePasswordTokenValidationFactory()), expressControllerAdapter(validateRetrievePasswordTokenControllerFactory()))
        .post("/retrieve-password/reset", expressMiddlewareAdapter(resetPasswordValidationFactory()), expressControllerAdapter(resetPasswordControllerFactory()))
        .post("/retrieve-password", expressMiddlewareAdapter(retrievePasswordValidationFactory()), expressControllerAdapter(retrievePasswordControllerFactory()));
    
    return router;
};