import { ValidationCompositeMiddleware } from "@presentation/middlewares/index.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { authLoginSchema } from "@presentation/validations/schemas/index.js";

export const loginValidatorFactory = () => {

    const loginDataBodyValidator = new BodyValidation(authLoginSchema);
    return new ValidationCompositeMiddleware([loginDataBodyValidator]);
};